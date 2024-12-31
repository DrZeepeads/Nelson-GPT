import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.6.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const hf = new HfInference(Deno.env.get('HUGGINGFACE_API_KEY'))
const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const supabase = createClient(supabaseUrl!, supabaseServiceKey!)
const mistralApiKey = Deno.env.get('MISTRAL_API_KEY')

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    console.log('Received message:', message)

    // Get embeddings for the query
    const embedding = await hf.featureExtraction({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      inputs: message,
    })
    console.log('Generated embedding')

    // Search for relevant knowledge using both semantic and text search
    const [semanticResults, textResults] = await Promise.all([
      supabase.rpc('match_nelson_knowledge', {
        query_embedding: embedding,
        match_threshold: 0.5,
        match_count: 5,
      }),
      supabase.rpc('search_nelson', { query: message }),
    ])
    console.log('Retrieved search results')

    // Combine and deduplicate results
    const allResults = [...(semanticResults.data || []), ...(textResults.data || [])]
    const uniqueResults = Array.from(new Set(allResults.map(r => r.id)))
      .map(id => allResults.find(r => r.id === id))
      .filter(Boolean)
      .slice(0, 5)

    // Create context from the results
    const context = uniqueResults
      .map(r => `Topic: ${r.topic}\nContent: ${r.content}`)
      .join('\n\n')

    // Call Mistral API with the enhanced context
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mistralApiKey}`,
      },
      body: JSON.stringify({
        model: 'mistral-tiny',
        messages: [
          {
            role: 'system',
            content: 'You are a pediatric knowledge assistant powered by Nelson Textbook of Pediatrics. Use the following context to provide evidence-based answers about pediatric conditions, treatments, and guidelines. Only use the information provided in the context, and if you are unsure, say so.',
          },
          {
            role: 'user',
            content: `Context:\n${context}\n\nQuestion: ${message}`,
          },
        ],
      }),
    })

    const result = await response.json()
    console.log('Received Mistral response')

    // Store the interaction in the messages table
    await supabase.from('messages').insert([
      {
        content: message,
        role: 'user',
      },
      {
        content: result.choices[0].message.content,
        role: 'assistant',
      },
    ])

    return new Response(
      JSON.stringify({ response: result.choices[0].message.content }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})