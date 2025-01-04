import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  try {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const { message } = await req.json();
    console.log('Received request with message:', message);

    const mistralApiKey = Deno.env.get('MISTRAL_API_KEY');
    if (!mistralApiKey) {
      console.error('MISTRAL_API_KEY is not set');
      throw new Error('MISTRAL_API_KEY environment variable is not set');
    }

    console.log('Initiating request to Mistral API...');
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

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Mistral API error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorData
      });
      throw new Error(`Mistral API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received response from Mistral API:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid response structure:', data);
      throw new Error('Invalid response structure from Mistral AI');
    }

    const aiResponse = data.choices[0].message.content;
    console.log('Successfully extracted AI response:', aiResponse.substring(0, 100) + '...');

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
        },
      },
    );
  }
});