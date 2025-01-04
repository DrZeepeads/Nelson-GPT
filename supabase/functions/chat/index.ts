import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)
const mistralApiKey = Deno.env.get('MISTRAL_API_KEY')

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Ensure request has a body
    if (!req.body) {
      throw new Error('Request body is required')
    }

    // Parse request body with error handling
    let { message } = await req.json().catch(error => {
      console.error('Error parsing request body:', error)
      throw new Error('Invalid JSON in request body')
    })

    if (!message || typeof message !== 'string') {
      throw new Error('Message is required and must be a string')
    }

    console.log('Received message:', message)

    if (!mistralApiKey) {
      throw new Error('MISTRAL_API_KEY is not set')
    }

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
            Structure your responses in this clear format:

            1. Initial Assessment:
            - Provide a concise overview of the topic/condition
            - Include key points from Nelson's relevant chapter
            
            2. Clinical Presentation:
            - List common symptoms and signs
            - Highlight critical findings when applicable
            
            3. Management Approach:
            - Evidence-based treatment options
            - Step-by-step management guidelines
            
            4. Important Considerations:
            - Age-specific variations
            - Red flags to watch for
            - Parent education points`,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Mistral API error:', errorData)
      throw new Error(`Mistral API error: ${response.status}`)
    }

    const result = await response.json()
    console.log('Received Mistral response')

    // Store messages in Supabase
    try {
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
    } catch (error) {
      console.error('Error storing messages:', error)
      // Don't throw here, we still want to return the response
    }

    return new Response(
      JSON.stringify({ response: result.choices[0].message.content }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})