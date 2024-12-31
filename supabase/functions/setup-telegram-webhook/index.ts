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

    // Remove any trailing slashes and construct the webhook URL
    const baseUrl = url.replace(/\/+$/, '')
    const webhookUrl = `${baseUrl}/functions/v1/telegram-bot`
    console.log('Setting webhook URL:', webhookUrl)

    // Set the webhook
    const setWebhookUrl = `https://api.telegram.org/bot${telegramToken}/setWebhook`
    console.log('Making request to:', setWebhookUrl)
    
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

    const webhookResponseText = await setWebhookResponse.text()
    console.log('Webhook response:', webhookResponseText)

    if (!setWebhookResponse.ok) {
      console.error('Error setting webhook:', webhookResponseText)
      throw new Error(`Failed to set webhook: ${webhookResponseText}`)
    }

    let webhookData
    try {
      webhookData = JSON.parse(webhookResponseText)
    } catch (e) {
      console.error('Error parsing webhook response:', e)
      throw new Error('Invalid response from Telegram API')
    }

    // Get webhook info for verification
    const getWebhookInfoUrl = `https://api.telegram.org/bot${telegramToken}/getWebhookInfo`
    console.log('Getting webhook info from:', getWebhookInfoUrl)
    
    const webhookInfoResponse = await fetch(getWebhookInfoUrl)
    const webhookInfoText = await webhookInfoResponse.text()
    console.log('Webhook info response:', webhookInfoText)
    
    if (!webhookInfoResponse.ok) {
      console.error('Error getting webhook info:', webhookInfoText)
      throw new Error(`Failed to get webhook info: ${webhookInfoText}`)
    }

    let webhookInfo
    try {
      webhookInfo = JSON.parse(webhookInfoText)
    } catch (e) {
      console.error('Error parsing webhook info:', e)
      throw new Error('Invalid response from Telegram API')
    }

    return new Response(
      JSON.stringify({ 
        setWebhook: webhookData,
        webhookInfo: webhookInfo
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error in setup-telegram-webhook:', error)
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