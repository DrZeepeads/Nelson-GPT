import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { PDFDocument } from 'https://cdn.skypack.dev/pdf-lib'
import { processPageContent } from './utils/contentProcessor.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
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

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    const pages = pdfDoc.getPages()

    const allContent = [];
    const allTables = [];
    const allFigures = [];
    let documentMetadata = null;
    
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i]
      const rawText = await page.getText()
      
      const { processedContent, tables, figures } = await processPageContent(
        supabase,
        rawText,
        i + 1,
        file.name.split('.')[0],
        i === 0
      );
      
      if (i === 0 && processedContent[0]?.metadata) {
        documentMetadata = processedContent[0].metadata;
      }
      
      allContent.push(...processedContent);
      allTables.push(...tables);
      allFigures.push(...figures);
    }

    const results = await Promise.all([
      supabase.from('nelson_content').insert(allContent.map(chunk => ({
        content: chunk.content,
        page_number: chunk.page_number,
        chapter: file.name.split('.')[0],
        metadata: chunk.metadata
      }))),
      
      allTables.length > 0 ? supabase.from('tables').insert(allTables) : null,
      
      allFigures.length > 0 ? supabase.from('images').insert(allFigures.map(fig => ({
        caption: fig.caption,
        page_number: fig.page_number,
        chapter: file.name.split('.')[0]
      }))) : null
    ]);

    return new Response(
      JSON.stringify({
        message: 'PDF processed successfully',
        totalChunks: allContent.length,
        totalTables: allTables.length,
        totalFigures: allFigures.length,
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