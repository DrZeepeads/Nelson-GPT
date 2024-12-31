import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const telegramToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
const telegramApi = `https://api.telegram.org/bot${telegramToken}`;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const sendTelegramMessage = async (chatId: number | string, text: string) => {
  console.log('Sending message to Telegram:', { chatId, text });
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
      const errorData = await response.text();
      console.error('Telegram API error:', errorData);
      throw new Error(`Telegram API error: ${response.status} ${errorData}`);
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
  const welcomeMessage = `Welcome to NelsonGPT Bot! 👋\n\nYour Chat ID is: ${chatId}\n\nPlease copy this Chat ID and paste it in the web application to connect your Telegram account.\n\nAvailable commands:\n/start - Show this welcome message\n/help - Show available commands\n/ask - Ask a medical question\n/upload - Upload documents\n/calculate - Access calculators\n/history - View chat history\n/resources - Access resources\n/feedback - Submit feedback`;
  
  return sendTelegramMessage(chatId, welcomeMessage);
};

const handleHelp = async (chatId: number) => {
  console.log('Handling /help command for chat ID:', chatId);
  const helpMessage = `Available Commands:\n\n` +
    `Core Commands:\n` +
    `/start - Initialize bot and get Chat ID\n` +
    `/help - Show this help message\n` +
    `/ask <question> - Submit medical questions\n` +
    `/upload - Upload documents\n` +
    `/calculate - Access calculators\n` +
    `/history - View chat history\n` +
    `/resources - Access resources\n` +
    `/feedback - Submit feedback\n\n` +
    `Specialized Commands:\n` +
    `/drug_dose <drug> <weight> - Calculate drug doses\n` +
    `/growth_chart - Access growth charts\n` +
    `/emergency_protocols - View emergency protocols\n` +
    `/immunization <age> - Get vaccination schedules\n` +
    `/calculate_bmi <weight> <height> - Calculate BMI\n` +
    `/neonate_criteria - Access neonatal guidelines`;

  return sendTelegramMessage(chatId, helpMessage);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!telegramToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set');
    }

    const body = await req.json();
    console.log('Received request:', body);

    // Check if this is a webhook update from Telegram
    if (body.message?.text) {
      const chatId = body.message.chat.id;
      const text = body.message.text;
      console.log('Processing message:', { chatId, text });

      if (text.startsWith('/')) {
        const [command, ...args] = text.split(' ');
        console.log('Processing command:', command, 'with args:', args);

        try {
          switch (command) {
            case '/start':
              await handleStart(chatId);
              break;
            case '/help':
              await handleHelp(chatId);
              break;
            default:
              await sendTelegramMessage(chatId, "Command not implemented yet. Use /help to see available commands.");
          }
        } catch (error) {
          console.error('Error handling command:', error);
          await sendTelegramMessage(chatId, "Sorry, there was an error processing your command. Please try again later.");
        }
      }
      
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Handle regular message sending from the web application
    const { message, chatId } = body;
    console.log('Sending message to Telegram:', { message, chatId });

    const response = await sendTelegramMessage(chatId, message);
    console.log('Telegram API response:', response);

    return new Response(JSON.stringify(response), {
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