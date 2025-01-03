import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { PDFDocument } from 'https://cdn.skypack.dev/pdf-lib'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const CHUNK_SIZE = 1000; // characters per chunk

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
    
    // Process each page
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i]
      const text = await page.getText()
      
      // Split content into chunks
      let currentPosition = 0
      while (currentPosition < text.length) {
        // Find the next sentence end after chunk size
        let endPosition = currentPosition + CHUNK_SIZE
        const nextPeriod = text.indexOf('.', endPosition)
        
        // If no more periods found, take the rest of the text
        endPosition = nextPeriod > -1 ? nextPeriod + 1 : text.length
        
        const chunk = text.slice(currentPosition, endPosition).trim()
        
        if (chunk) {
          processedContent.push({
            content: chunk,
            page_number: i + 1,
            chunk_index: Math.floor(currentPosition / CHUNK_SIZE)
          })
        }
        
        currentPosition = endPosition
      }
    }

    // Store processed content in the database
    const { error: insertError } = await supabase
      .from('nelson_content')
      .insert(processedContent.map(chunk => ({
        content: chunk.content,
        page_number: chunk.page_number,
        chapter: file.name.split('.')[0] // Use filename as chapter name
      })))

    if (insertError) {
      console.error('Error inserting chunks:', insertError)
      throw new Error('Failed to store processed content')
    }

    return new Response(
      JSON.stringify({
        message: 'PDF processed successfully',
        totalChunks: processedContent.length,
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