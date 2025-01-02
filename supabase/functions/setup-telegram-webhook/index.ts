import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const telegramToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    if (!telegramToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set');
    }

    const body = await req.json();
    const webhookUrl = `${body.url}/functions/v1/telegram-bot`;
    
    console.log('Setting webhook URL:', webhookUrl);

    const response = await fetch(
      `https://api.telegram.org/bot${telegramToken}/setWebhook`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: webhookUrl,
          allowed_updates: ['message'],
        }),
      }
    );

    const data = await response.json();
    console.log('Telegram setWebhook response:', data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error setting webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});