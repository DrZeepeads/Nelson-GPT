import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const telegramToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
const telegramApi = `https://api.telegram.org/bot${telegramToken}`;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const formatTimestamp = () => {
  const now = new Date();
  return now.toLocaleString('en-US', { 
    hour: 'numeric', 
    minute: 'numeric',
    hour12: true,
    timeZone: 'UTC'
  });
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
    console.log('Telegram API response:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error;
  }
};

const handleStart = async (chatId: number) => {
  console.log('Handling /start command for chat ID:', chatId);
  const welcomeMessage = `Welcome to NelsonGPT Bot! 👋\n\nYour Chat ID is: ${chatId}\n\nPlease copy this Chat ID and paste it in the web application to connect your Telegram account.`;
  await sendTelegramMessage(chatId, welcomeMessage);
  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
};

serve(async (req) => {
  console.log('Received request:', req.method, req.url);
  
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
        const command = text.split(' ')[0];
        console.log('Processing command:', command);

        switch (command) {
          case '/start':
            return handleStart(chatId);
          case '/help':
            await sendTelegramMessage(chatId, "Available commands:\n/start - Get your Chat ID\n/help - Show this help message");
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
    if (!message || !chatId) {
      throw new Error('Message and chatId are required');
    }
    
    const timestamp = formatTimestamp();
    const timestampedMessage = `${message}\n\nSent at: ${timestamp} UTC`;
    console.log('Sending message to Telegram:', { message: timestampedMessage, chatId });

    const response = await sendTelegramMessage(chatId, timestampedMessage);

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
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