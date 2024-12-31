import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const telegramToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
const telegramApi = `https://api.telegram.org/bot${telegramToken}`;

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
    // Check if this is a webhook update from Telegram
    if (req.method === 'POST' && req.headers.get('content-type') === 'application/json') {
      const update = await req.json();
      console.log('Received Telegram update:', JSON.stringify(update));
      
      // Handle /start command
      if (update.message?.text === '/start') {
        const chatId = update.message.chat.id;
        console.log('Handling /start command for chat ID:', chatId);
        
        const welcomeMessage = `Welcome to NelsonBot! 👋\n\nYour Chat ID is: ${chatId}\n\nPlease copy this Chat ID and paste it in the web application to connect your Telegram account. This will allow you to receive your chat history and updates directly here in Telegram.\n\nAvailable commands:\n/start - Show this welcome message\n/help - Show available commands\n/status - Check connection status`;

        const response = await fetch(`${telegramApi}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: welcomeMessage,
            parse_mode: 'HTML',
          }),
        });
        
        const result = await response.json();
        console.log('Telegram API response for /start:', JSON.stringify(result));
        
        if (!result.ok) {
          throw new Error(`Failed to send welcome message: ${result.description}`);
        }
        
        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Handle /help command
      if (update.message?.text === '/help') {
        const chatId = update.message.chat.id;
        console.log('Handling /help command for chat ID:', chatId);
        
        const helpMessage = `Available commands:\n/start - Show welcome message and your Chat ID\n/help - Show this help message\n/status - Check connection status\n\nTo use NelsonBot:\n1. Copy your Chat ID from the /start command\n2. Paste it in the web application\n3. Test the connection\n4. You'll receive your chat history here automatically`;

        await fetch(`${telegramApi}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: helpMessage,
            parse_mode: 'HTML',
          }),
        });
        
        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Handle /status command
      if (update.message?.text === '/status') {
        const chatId = update.message.chat.id;
        console.log('Handling /status command for chat ID:', chatId);
        
        const statusMessage = `NelsonBot Status: 🟢 Online\nChat ID: ${chatId}\n\nYour messages from NelsonBot will be forwarded to this chat automatically.`;

        await fetch(`${telegramApi}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: statusMessage,
            parse_mode: 'HTML',
          }),
        });
        
        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Handle regular message sending from the web application
    const { message, chatId } = await req.json();
    console.log('Sending message to Telegram:', { message, chatId });

    // Send message to Telegram
    const response = await fetch(`${telegramApi}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const result = await response.json();
    console.log('Telegram API response:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in telegram-bot function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});