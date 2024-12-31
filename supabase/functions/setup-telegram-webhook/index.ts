import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

    // Implement retry logic with exponential backoff
    const maxRetries = 3;
    let lastError = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // Add delay for retry attempts
        if (attempt > 0) {
          const delay = Math.pow(2, attempt) * 1000; // exponential backoff
          console.log(`Retry attempt ${attempt + 1}, waiting ${delay}ms`);
          await sleep(delay);
        }

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

        const webhookResponseText = await setWebhookResponse.text()
        console.log('Webhook response:', webhookResponseText)

        if (!setWebhookResponse.ok) {
          const error = new Error(`Failed to set webhook: ${webhookResponseText}`)
          console.error('Webhook setup failed:', error)
          lastError = error
          
          // If it's not a rate limit error, break the retry loop
          if (setWebhookResponse.status !== 429) {
            break
          }
          continue // Try again if it was a rate limit error
        }

        // If successful, get webhook info for verification
        const getWebhookInfoUrl = `https://api.telegram.org/bot${telegramToken}/getWebhookInfo`
        const webhookInfoResponse = await fetch(getWebhookInfoUrl)
        const webhookInfoText = await webhookInfoResponse.text()
        console.log('Webhook info:', webhookInfoText)

        return new Response(
          JSON.stringify({ 
            success: true,
            webhook: JSON.parse(webhookResponseText),
            webhookInfo: JSON.parse(webhookInfoText)
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          },
        )
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error)
        lastError = error
      }
    }

    // If we get here, all retries failed
    throw lastError || new Error('Failed to set webhook after all retries')
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