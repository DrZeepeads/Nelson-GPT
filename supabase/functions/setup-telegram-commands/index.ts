import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const telegramToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
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
    if (!telegramToken) {
      console.error('TELEGRAM_BOT_TOKEN is not configured');
      return new Response(
        JSON.stringify({
          error: 'TELEGRAM_BOT_TOKEN is not configured in environment variables',
          ok: false
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const telegramApi = `https://api.telegram.org/bot${telegramToken}`;
    console.log('Setting up bot commands...');
    
    // First verify the bot token is valid
    const verifyResponse = await fetch(`${telegramApi}/getMe`);
    const verifyResult = await verifyResponse.json();
    
    console.log('Bot verification response:', verifyResult);
    
    if (!verifyResult.ok) {
      throw new Error(`Invalid bot token: ${verifyResult.description}`);
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
    console.error('Error in setup-telegram-commands:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        ok: false,
        description: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});