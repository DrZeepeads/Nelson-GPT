import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { PDFDocument } from 'https://cdn.skypack.dev/pdf-lib'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const CHUNK_SIZE = 1000; // characters per chunk

// Text cleaning utilities
const cleanText = (text: string): string => {
  return text
    .replace(/\s+/g, ' ')                    // Replace multiple spaces with single space
    .replace(/[\r\n]+/g, '\n')               // Normalize line breaks
    .replace(/[^\x20-\x7E\n]/g, '')          // Remove non-printable characters
    .replace(/\b(?:[A-Z]\.){2,}/g, match => match.replace(/\./g, '. ')) // Fix abbreviations
    .trim();
}

// Detect if text might be a table
const detectTable = (text: string): boolean => {
  const lines = text.split('\n');
  if (lines.length < 2) return false;

  // Check for consistent delimiters or spacing patterns
  const delimiterPattern = /[\t|,]/;
  const consistentDelimiters = lines.every(line => 
    line.split(delimiterPattern).length === lines[0].split(delimiterPattern).length
  );

  // Check for aligned columns using spaces
  const consistentSpacing = lines.every(line => 
    line.split(/\s{2,}/).length === lines[0].split(/\s{2,}/).length
  );

  return consistentDelimiters || consistentSpacing;
}

// Detect if text might be a figure caption
const detectFigureCaption = (text: string): boolean => {
  return /^(figure|fig\.)\s+\d+/i.test(text) || 
         /^(table)\s+\d+/i.test(text);
}

// Extract metadata from text
const extractMetadata = (text: string) => {
  const metadata: Record<string, string | null> = {
    title: null,
    authors: null,
    references: null,
    keywords: null
  };

  // Try to find title (usually first line or after specific markers)
  const titleMatch = text.match(/^([^\n]+)/);
  if (titleMatch) metadata.title = titleMatch[1].trim();

  // Look for authors (common patterns in medical texts)
  const authorMatch = text.match(/(?:authors?|by)[:;\s]+([^\n]+)/i);
  if (authorMatch) metadata.authors = authorMatch[1].trim();

  // Extract references
  const refMatch = text.match(/references?[:;\s]+((?:[^\n]+\n?)+)/i);
  if (refMatch) metadata.references = refMatch[1].trim();

  // Look for keywords
  const keywordMatch = text.match(/keywords?[:;\s]+((?:[^\n]+\n?)+)/i);
  if (keywordMatch) metadata.keywords = keywordMatch[1].trim();

  return metadata;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      throw new Error('No file uploaded')
    }

    if (!file.type.includes('pdf')) {
      throw new Error('Uploaded file must be a PDF')
    }

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Read the PDF file
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    const pages = pdfDoc.getPages()

    const processedContent = []
    const tables = []
    const figures = []
    let documentMetadata = null
    
    // Process each page
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i]
      const rawText = await page.getText()
      const cleanedText = cleanText(rawText)
      
      // Extract metadata from first page only
      if (i === 0) {
        documentMetadata = extractMetadata(cleanedText)
      }
      
      // Split content into chunks
      let currentPosition = 0
      while (currentPosition < cleanedText.length) {
        // Find the next sentence end after chunk size
        let endPosition = currentPosition + CHUNK_SIZE
        const nextPeriod = cleanedText.indexOf('.', endPosition)
        
        // If no more periods found, take the rest of the text
        endPosition = nextPeriod > -1 ? nextPeriod + 1 : cleanedText.length
        
        const chunk = cleanedText.slice(currentPosition, endPosition).trim()
        
        if (chunk) {
          // Detect if chunk is a table or figure caption
          if (detectTable(chunk)) {
            tables.push({
              content: chunk,
              page_number: i + 1,
              chapter: file.name.split('.')[0]
            })
          } else if (detectFigureCaption(chunk)) {
            figures.push({
              caption: chunk,
              page_number: i + 1,
              chapter: file.name.split('.')[0]
            })
          } else {
            processedContent.push({
              content: chunk,
              page_number: i + 1,
              chunk_index: Math.floor(currentPosition / CHUNK_SIZE),
              metadata: i === 0 ? documentMetadata : null // Only include metadata for first page
            })
          }
        }
        
        currentPosition = endPosition
      }
    }

    // Store processed content in the database
    const { error: contentError } = await supabase
      .from('nelson_content')
      .insert(processedContent.map(chunk => ({
        content: chunk.content,
        page_number: chunk.page_number,
        chapter: file.name.split('.')[0],
        metadata: chunk.metadata
      })))

    if (contentError) {
      console.error('Error inserting content chunks:', contentError)
      throw new Error('Failed to store processed content')
    }

    // Store detected tables
    if (tables.length > 0) {
      const { error: tablesError } = await supabase
        .from('tables')
        .insert(tables)

      if (tablesError) {
        console.error('Error inserting tables:', tablesError)
      }
    }

    // Store detected figures
    if (figures.length > 0) {
      const { error: figuresError } = await supabase
        .from('images')
        .insert(figures.map(fig => ({
          caption: fig.caption,
          page_number: fig.page_number,
          chapter: file.name.split('.')[0]
        })))

      if (figuresError) {
        console.error('Error inserting figures:', figuresError)
      }
    }

    return new Response(
      JSON.stringify({
        message: 'PDF processed successfully',
        totalChunks: processedContent.length,
        totalTables: tables.length,
        totalFigures: figures.length,
        metadata: documentMetadata,
        totalPages: pages.length
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )

  } catch (error) {
    console.error('PDF processing error:', error)
    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to process PDF',
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 400
      }
    )
  }
})