import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { query } = await req.json()
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Search across multiple tables
    const [knowledgeResult, chaptersResult] = await Promise.all([
      supabase.rpc('search_nelson', { query }),
      supabase
        .from('chapters')
        .select(`
          id,
          title,
          summary,
          sections (
            id,
            title,
            content
          )
        `)
        .textSearch('title', query)
        .limit(5)
    ])

    if (knowledgeResult.error) throw knowledgeResult.error
    if (chaptersResult.error) throw chaptersResult.error

    return new Response(
      JSON.stringify({
        knowledge: knowledgeResult.data,
        chapters: chaptersResult.data
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})