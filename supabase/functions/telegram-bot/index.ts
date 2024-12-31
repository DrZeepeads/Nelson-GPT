import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const telegramToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
const telegramApi = `https://api.telegram.org/bot${telegramToken}`;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const sendTelegramMessage = async (chatId: number | string, text: string) => {
  console.log('Attempting to send message to Telegram:', { chatId, text });
  try {
    const response = await fetch(`${telegramApi}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Telegram API error response:', errorText);
      throw new Error(`Telegram API error: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Telegram API response:', data);
    return data;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error;
  }
};

const handleStart = async (chatId: number) => {
  console.log('Handling /start command for chat ID:', chatId);
  const welcomeMessage = `Welcome to NelsonGPT Bot! 👋\n\nYour Chat ID is: ${chatId}\n\nPlease copy this Chat ID and paste it in the web application to connect your Telegram account.\n\nAvailable commands:\n/start - Show this welcome message\n/help - Show available commands`;
  
  return sendTelegramMessage(chatId, welcomeMessage);
};

serve(async (req) => {
  console.log('Received request:', req.method, req.url);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!telegramToken) {
      console.error('TELEGRAM_BOT_TOKEN is not set');
      throw new Error('TELEGRAM_BOT_TOKEN is not set');
    }

    const body = await req.json();
    console.log('Request body:', JSON.stringify(body, null, 2));

    // Handle webhook update from Telegram
    if (body.message?.text) {
      const chatId = body.message.chat.id;
      const text = body.message.text;
      console.log('Processing Telegram message:', { chatId, text });

      if (text.startsWith('/')) {
        const [command] = text.split(' ');
        console.log('Processing command:', command);

        switch (command) {
          case '/start':
            await handleStart(chatId);
            break;
          case '/help':
            await sendTelegramMessage(chatId, "Available commands:\n/start - Initialize bot and get Chat ID\n/help - Show this help message");
            break;
          default:
            await sendTelegramMessage(chatId, "Command not recognized. Use /help to see available commands.");
        }
      }
      
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Handle message sending from the web application
    const { message, chatId } = body;
    
    // Prevent duplicate messages by adding a timestamp
    const timestampedMessage = `${message}\n\nSent at: ${new Date().toLocaleTimeString()}`;
    console.log('Sending message to Telegram:', { message: timestampedMessage, chatId });

    const response = await sendTelegramMessage(chatId, timestampedMessage);
    console.log('Telegram API response:', response);

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in telegram-bot function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});