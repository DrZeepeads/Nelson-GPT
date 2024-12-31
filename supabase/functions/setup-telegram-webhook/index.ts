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

    const body = await req.json()
    const { url } = body

    if (!url) {
      throw new Error('URL is required')
    }

    // Ensure the URL is properly formatted
    const webhookUrl = new URL('/functions/v1/telegram-bot', url).toString()
    console.log('Setting webhook URL:', webhookUrl)

    // Set the webhook
    const setWebhookUrl = `https://api.telegram.org/bot${telegramToken}/setWebhook`
    const setWebhookResponse = await fetch(setWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ['message', 'callback_query'],
      }),
    })

    if (!setWebhookResponse.ok) {
      const errorText = await setWebhookResponse.text()
      console.error('Error setting webhook:', errorText)
      throw new Error(`Failed to set webhook: ${errorText}`)
    }

    const data = await setWebhookResponse.json()
    console.log('Webhook setup response:', data)

    // Get webhook info for verification
    const getWebhookInfoUrl = `https://api.telegram.org/bot${telegramToken}/getWebhookInfo`
    const webhookInfoResponse = await fetch(getWebhookInfoUrl)
    
    if (!webhookInfoResponse.ok) {
      const errorText = await webhookInfoResponse.text()
      console.error('Error getting webhook info:', errorText)
      throw new Error(`Failed to get webhook info: ${errorText}`)
    }

    const webhookInfo = await webhookInfoResponse.json()
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
    console.error('Error in setup-telegram-webhook:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})