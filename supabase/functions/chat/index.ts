import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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

    // Call Mistral API with the enhanced medical context
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
            content: `You are a pediatric knowledge assistant powered by Nelson Textbook of Pediatrics. 
            Provide evidence-based answers about pediatric conditions, treatments, and guidelines.
            
            Important guidelines:
            1. Base all responses strictly on Nelson Textbook of Pediatrics content
            2. Always cite relevant chapters and page numbers
            3. For symptom queries, include diagnostic approaches and examination techniques
            4. For medication questions, only reference drugs covered in the book
            5. Include specific developmental milestones and growth patterns when relevant
            6. Reference preventive care and vaccination guidelines from the book
            7. For emergency care, provide clear step-by-step protocols
            8. Give evidence-based differential diagnoses when appropriate
            9. Include relevant surgical indications and procedures as described in the book
            10. Provide parental guidance based on book recommendations
            
            Format responses with:
            - Clear structure
            - Relevant chapter/page citations
            - Evidence-based recommendations
            - Clinical pearls from the text`,
          },
          {
            role: 'user',
            content: message,
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