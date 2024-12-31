import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    console.log('Setting up bot commands...');
    
    const telegramToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    if (!telegramToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set');
    }

    // First, delete any existing commands
    console.log('Deleting existing commands...');
    const deleteResponse = await fetch(
      `https://api.telegram.org/bot${telegramToken}/deleteMyCommands`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const deleteData = await deleteResponse.text();
    console.log('Delete commands response:', deleteData);

    if (!deleteResponse.ok) {
      throw new Error(`Failed to delete commands: ${deleteData}`);
    }

    const commands = [
      { command: "start", description: "Initialize bot and get Chat ID" },
      { command: "help", description: "Show available commands" }
    ];

    console.log('Setting new commands:', commands);
    const response = await fetch(
      `https://api.telegram.org/bot${telegramToken}/setMyCommands`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commands }),
      }
    );

    const responseText = await response.text();
    console.log('Set commands raw response:', responseText);

    if (!response.ok) {
      throw new Error(`Telegram API error: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    console.log('Set commands parsed response:', data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error setting up bot commands:', error);
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