import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const telegramToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
const telegramApi = `https://api.telegram.org/bot${telegramToken}`;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Setting up bot commands...');

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!telegramToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set');
    }

    const commands = [
      {
        command: 'start',
        description: 'Start the bot and get your Chat ID',
      },
      {
        command: 'help',
        description: 'Show available commands',
      },
    ];

    const response = await fetch(
      `${telegramApi}/setMyCommands`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commands }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to set commands:', errorText);
      throw new Error(`Telegram API error: ${errorText}`);
    }

    const data = await response.json();
    console.log('Set commands response:', data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error setting up bot commands:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});