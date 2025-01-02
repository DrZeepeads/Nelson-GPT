import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Received webhook setup request');
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const telegramToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    if (!telegramToken) {
      console.error('TELEGRAM_BOT_TOKEN is not set');
      throw new Error('TELEGRAM_BOT_TOKEN is not set');
    }

    const body = await req.json();
    const webhookUrl = body.url;
    
    console.log('Setting webhook URL:', webhookUrl);

    // First, check current webhook info
    const getWebhookResponse = await fetch(
      `https://api.telegram.org/bot${telegramToken}/getWebhookInfo`
    );
    const webhookInfo = await getWebhookResponse.json();
    console.log('Current webhook info:', webhookInfo);

    // If webhook is already set to our URL, return success
    if (webhookInfo.ok && webhookInfo.result.url === webhookUrl) {
      console.log('Webhook already set to correct URL');
      return new Response(
        JSON.stringify({ ok: true, result: true, description: "Webhook was already set" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Add delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Delete existing webhook
    const deleteResponse = await fetch(
      `https://api.telegram.org/bot${telegramToken}/deleteWebhook`
    );
    const deleteData = await deleteResponse.json();
    console.log('Delete webhook response:', deleteData);

    if (!deleteData.ok) {
      throw new Error(`Failed to delete webhook: ${JSON.stringify(deleteData)}`);
    }

    // Add delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Set the new webhook
    const response = await fetch(
      `https://api.telegram.org/bot${telegramToken}/setWebhook`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: webhookUrl,
          allowed_updates: ['message', 'callback_query'],
        }),
      }
    );

    const data = await response.json();
    console.log('Telegram setWebhook response:', data);

    if (!data.ok) {
      throw new Error(`Telegram API error: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error setting webhook:', error);
    
    // Check if it's a rate limit error
    if (error.message?.includes('Too Many Requests')) {
      const retryAfter = error.parameters?.retry_after || 1;
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded', 
          retryAfter,
          message: 'Please try again in a few seconds'
        }),
        {
          status: 429,
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': String(retryAfter)
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});