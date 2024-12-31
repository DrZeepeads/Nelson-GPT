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

    const commands = [
      { command: "start", description: "Initialize bot and get Chat ID" },
      { command: "help", description: "Show available commands" },
      { command: "ask", description: "Ask a medical question" },
      { command: "upload", description: "Upload documents for analysis" },
      { command: "calculate", description: "Access medical calculators" },
      { command: "history", description: "View chat history" },
      { command: "resources", description: "Access medical resources" },
      { command: "feedback", description: "Submit feedback" },
      { command: "drug_dose", description: "Calculate drug doses" },
      { command: "growth_chart", description: "Access growth charts" },
      { command: "emergency_protocols", description: "View emergency protocols" },
      { command: "immunization", description: "Get vaccination schedules" },
      { command: "calculate_bmi", description: "Calculate BMI" },
      { command: "neonate_criteria", description: "Access neonatal guidelines" }
    ];

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

    const data = await response.json();
    console.log('Bot commands set up successfully');

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