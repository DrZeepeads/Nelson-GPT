import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { url } = await req.json()
    console.log('Setting up webhook for URL:', url)

    // Set up webhook with Telegram
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        allowed_updates: ['message'],
      }),
    })

    const result = await response.json()
    console.log('Telegram webhook setup response:', result)

    if (!response.ok) {
      // Handle rate limiting specifically
      if (response.status === 429) {
        const retryAfter = parseInt(result.parameters?.retry_after || '5')
        return new Response(
          JSON.stringify({
            error: result,
            status: 429,
            message: `Rate limit exceeded. Retry after ${retryAfter} seconds.`
          }),
          {
            status: 429,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
              'Retry-After': retryAfter.toString()
            }
          }
        )
      }
      
      throw new Error(`Telegram API error: ${JSON.stringify(result)}`)
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error setting up webhook:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        status: error.status || 500
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.status || 500,
      }
    )
  }
})