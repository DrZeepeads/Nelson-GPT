import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const telegramToken = Deno.env.get('TELEGRAM_BOT_TOKEN')
    if (!telegramToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set')
    }

    // Get the Supabase Function URL from the request
    const url = new URL(req.url)
    const host = url.hostname
    const protocol = url.protocol
    const webhookUrl = `${protocol}//${host}/functions/v1/telegram-bot`

    console.log('Setting webhook URL:', webhookUrl)

    // Set the webhook
    const setWebhookUrl = `https://api.telegram.org/bot${telegramToken}/setWebhook`
    const response = await fetch(setWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ['message', 'callback_query'],
      }),
    })

    const data = await response.json()
    console.log('Webhook setup response:', data)

    // Get webhook info for verification
    const getWebhookInfoUrl = `https://api.telegram.org/bot${telegramToken}/getWebhookInfo`
    const webhookInfo = await fetch(getWebhookInfoUrl).then(res => res.json())
    console.log('Webhook info:', webhookInfo)

    return new Response(
      JSON.stringify({ 
        setWebhook: data,
        webhookInfo: webhookInfo
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error setting up webhook:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})