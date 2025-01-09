import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')
const GROK_API_KEY = Deno.env.get('GROK_API_KEY')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch content from nelson_content table
    const { data: nelsonContent, error: contentError } = await supabase
      .from('nelson_content')
      .select('*')
      .limit(10) // Process in batches
    
    if (contentError) {
      throw new Error(`Error fetching content: ${contentError.message}`)
    }

    console.log(`Processing ${nelsonContent?.length} content items`)

    // Process each content item with both AIs
    const processedResults = await Promise.all(nelsonContent?.map(async (content) => {
      // Process with Anthropic
      const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY!,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-opus-20240229',
          messages: [{
            role: 'user',
            content: `Analyze this medical content and extract key clinical conditions, symptoms, and treatments: ${content.content}`
          }]
        })
      })

      const anthropicData = await anthropicResponse.json()
      
      // Process with Grok
      const grokResponse = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'grok-1',
          messages: [{
            role: 'system',
            content: 'You are a medical knowledge extraction system.'
          }, {
            role: 'user',
            content: `Extract and structure medical knowledge from this content: ${content.content}`
          }]
        })
      })

      const grokData = await grokResponse.json()

      // Combine insights from both AIs
      const combinedAnalysis = {
        content_id: content.id,
        anthropic_analysis: anthropicData.content,
        grok_analysis: grokData.choices[0].message.content,
        created_at: new Date().toISOString()
      }

      // Store the combined analysis
      const { error: insertError } = await supabase
        .from('content_enhancements')
        .insert({
          content_id: content.id,
          content_type: 'chapter',
          original_content: content.content,
          enhanced_content: JSON.stringify(combinedAnalysis),
          status: 'completed'
        })

      if (insertError) {
        console.error('Error inserting analysis:', insertError)
        return { success: false, error: insertError.message }
      }

      return { success: true, contentId: content.id }
    })) || []

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: processedResults.length,
        results: processedResults 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in knowledge extraction:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})