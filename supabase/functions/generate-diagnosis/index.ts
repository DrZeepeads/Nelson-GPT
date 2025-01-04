import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from '@supabase/supabase-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { age, gender, symptoms, history } = await req.json()

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Search for relevant content in the Nelson knowledge base
    const { data: matchingContent, error: searchError } = await supabase.rpc(
      'search_nelson',
      { query: symptoms }
    )

    if (searchError) throw searchError

    // Process the content and generate diagnoses
    // This is a simplified example - you'd want to enhance this with more sophisticated matching
    const diagnoses = matchingContent.slice(0, 3).map(content => ({
      condition: content.topic,
      keyFeatures: ['Based on Nelson Textbook content'],
      nextSteps: ['Consult with specialist', 'Order relevant tests'],
      explanation: content.content.substring(0, 200) + '...',
      isRedFlag: content.content.toLowerCase().includes('emergency')
    }))

    return new Response(
      JSON.stringify({ diagnoses }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
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