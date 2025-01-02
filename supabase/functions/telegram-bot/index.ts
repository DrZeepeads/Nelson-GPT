import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Received request:', req.method, req.url);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const telegramToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    if (!telegramToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set');
    }

    const body = await req.json();
    console.log('Request body:', JSON.stringify(body, null, 2));

    // Handle message sending from the web application
    if (body.message && body.chatId) {
      console.log('Processing web app message:', { message: body.message, chatId: body.chatId });
      const response = await fetch(
        `https://api.telegram.org/bot${telegramToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: body.chatId,
            text: body.message,
            parse_mode: 'HTML',
          }),
        }
      );
      
      const responseData = await response.json();
      console.log('Telegram API response:', responseData);
      
      if (!responseData.ok) {
        throw new Error(`Telegram API error: ${JSON.stringify(responseData)}`);
      }
      
      return new Response(JSON.stringify(responseData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Handle webhook update from Telegram
    if (body.message?.chat?.id) {
      const chatId = body.message.chat.id;
      const text = body.message.text;
      console.log('Processing Telegram webhook message:', { chatId, text });

      let responseText = '';
      if (text.startsWith('/')) {
        switch (text) {
          case '/start':
            responseText = `Welcome to NelsonGPT Bot! 👋\n\nYour Chat ID is: ${chatId}\n\nPlease copy this Chat ID and paste it in the web application to connect your Telegram account.`;
            break;
          case '/help':
            responseText = 'Available commands:\n\n' +
              '/start - Get your Chat ID and connect to the web app\n' +
              '/help - Show this help message';
            break;
          default:
            responseText = 'Sorry, I don\'t understand that command. Try /help to see available commands.';
        }
      } else {
        responseText = `I received your message: "${text}"\n\nI'm a bot that forwards messages from the NelsonGPT web application.`;
      }

      const response = await fetch(
        `https://api.telegram.org/bot${telegramToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: responseText,
            parse_mode: 'HTML',
          }),
        }
      );
      
      const responseData = await response.json();
      console.log('Telegram API response:', responseData);
      
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Invalid request body - missing required fields');
    return new Response(
      JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in telegram-bot function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});