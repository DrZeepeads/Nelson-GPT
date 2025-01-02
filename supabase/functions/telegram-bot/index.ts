import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const telegramToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
const telegramApi = `https://api.telegram.org/bot${telegramToken}`;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const sendTelegramMessage = async (chatId: number | string, text: string) => {
  if (!telegramToken) {
    console.error('TELEGRAM_BOT_TOKEN is not set');
    throw new Error('TELEGRAM_BOT_TOKEN is not set');
  }

  console.log('Starting sendTelegramMessage function with:', { chatId, text });
  console.log('Using Telegram API URL:', `${telegramApi}/sendMessage`);
  console.log('Token exists:', !!telegramToken);
  
  try {
    const requestBody = {
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
    };
    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(`${telegramApi}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    const responseText = await response.text();
    console.log('Raw Telegram API response:', responseText);

    if (!response.ok) {
      console.error('Telegram API error:', {
        status: response.status,
        statusText: response.statusText,
        response: responseText
      });
      throw new Error(`Telegram API error: ${response.status} ${responseText}`);
    }
    
    try {
      const data = JSON.parse(responseText);
      console.log('Successfully parsed Telegram API response:', JSON.stringify(data, null, 2));
      return data;
    } catch (parseError) {
      console.error('Error parsing Telegram API response:', parseError);
      throw new Error(`Invalid JSON response: ${responseText}`);
    }
  } catch (error) {
    console.error('Error in sendTelegramMessage:', error);
    throw error;
  }
};

const handleCommand = async (chatId: number, command: string) => {
  console.log('Handling command:', { chatId, command });
  
  switch (command) {
    case '/start':
      return await sendTelegramMessage(
        chatId,
        `Welcome to NelsonGPT Bot! 👋\n\nYour Chat ID is: ${chatId}\n\nPlease copy this Chat ID and paste it in the web application to connect your Telegram account.`
      );
    case '/help':
      return await sendTelegramMessage(
        chatId,
        'Available commands:\n\n' +
        '/start - Get your Chat ID and connect to the web app\n' +
        '/help - Show this help message'
      );
    default:
      return await sendTelegramMessage(
        chatId,
        'Sorry, I don\'t understand that command. Try /help to see available commands.'
      );
  }
};

serve(async (req) => {
  console.log('Received request:', req.method, req.url);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!telegramToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set');
    }

    const body = await req.json();
    console.log('Request body:', JSON.stringify(body, null, 2));

    // Handle message sending from the web application
    if (body.message && body.chatId) {
      console.log('Processing web app message:', { message: body.message, chatId: body.chatId });
      const response = await sendTelegramMessage(body.chatId, body.message);
      
      return new Response(JSON.stringify(response), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Handle webhook update from Telegram
    if (body.message?.chat?.id) {
      const chatId = body.message.chat.id;
      const text = body.message.text;
      console.log('Processing Telegram webhook message:', { chatId, text });

      if (text.startsWith('/')) {
        await handleCommand(chatId, text);
      } else {
        const response = `I received your message: "${text}"\n\nI'm a bot that forwards messages from the NelsonGPT web application.`;
        await sendTelegramMessage(chatId, response);
      }
      
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Invalid request body - missing required fields');
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
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