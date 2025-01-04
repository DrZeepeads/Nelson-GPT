import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const mistralApiKey = Deno.env.get('MISTRAL_API_KEY');

    if (!mistralApiKey) {
      console.error('MISTRAL_API_KEY is not set');
      throw new Error('MISTRAL_API_KEY is not set');
    }

    console.log('Sending request to Mistral API with message:', message);

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mistralApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral-large-latest',
        messages: [
          {
            role: 'system',
            content: 'You are a pediatric diagnostic assistant based on the Nelson Textbook of Pediatrics. Provide detailed, evidence-based differential diagnoses with clear explanations and recommendations.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    console.log('Received response from Mistral API:', data);
    
    if (!response.ok) {
      console.error('Mistral API error:', data);
      throw new Error(data.error?.message || 'Failed to get response from Mistral AI');
    }

    const aiResponse = data.choices[0].message.content;
    console.log('Extracted AI response:', aiResponse);

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});