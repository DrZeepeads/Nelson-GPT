import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const telegramToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
const telegramApi = `https://api.telegram.org/bot${telegramToken}`;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Setting up bot commands...');
    console.log('Telegram API URL:', telegramApi.replace(telegramToken!, '****')); // Log API URL without exposing token
    
    if (!telegramToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not configured');
    }

    const commands = [
      {
        command: 'start',
        description: 'Start the bot and get your Chat ID',
      },
      {
        command: 'help',
        description: 'Show available commands and usage instructions',
      },
      {
        command: 'status',
        description: 'Check bot connection status',
      },
    ];

    // First, verify the bot token is valid by calling getMe
    const verifyResponse = await fetch(`${telegramApi}/getMe`);
    const verifyResult = await verifyResponse.json();
    
    console.log('Bot verification response:', verifyResult);
    
    if (!verifyResult.ok) {
      throw new Error(`Invalid bot token: ${verifyResult.description}`);
    }

    // If verification successful, proceed with setting commands
    const response = await fetch(`${telegramApi}/setMyCommands`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commands }),
    });

    const result = await response.json();
    console.log('Set commands response:', result);

    if (!result.ok) {
      throw new Error(`Failed to set commands: ${result.description}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error setting up commands:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        ok: false,
        description: error.message 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});