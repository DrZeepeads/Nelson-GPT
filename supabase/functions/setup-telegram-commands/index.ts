import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const telegramToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
const telegramApi = `https://api.telegram.org/bot${telegramToken}`;

const commands = [
  {
    command: "start",
    description: "Initialize the bot and get your Chat ID"
  },
  {
    command: "help",
    description: "Display available commands and instructions"
  },
  {
    command: "ask",
    description: "Submit a medical or pediatric question"
  },
  {
    command: "upload",
    description: "Upload documents or images for analysis"
  },
  {
    command: "calculate",
    description: "Calculate calorie intake for premature babies"
  },
  {
    command: "history",
    description: "View your previous queries and responses"
  },
  {
    command: "resources",
    description: "Access pediatric references and guidelines"
  },
  {
    command: "feedback",
    description: "Submit feedback or report issues"
  },
  {
    command: "drug_dose",
    description: "Calculate pediatric drug dosages"
  },
  {
    command: "growth_chart",
    description: "Access growth chart tools and guidance"
  },
  {
    command: "emergency_protocols",
    description: "Quick access to emergency protocols"
  },
  {
    command: "immunization",
    description: "Get immunization schedules by age"
  },
  {
    command: "calculate_bmi",
    description: "Calculate and interpret pediatric BMI"
  },
  {
    command: "neonate_criteria",
    description: "Access neonatal care guidelines"
  }
];

serve(async (req) => {
  try {
    console.log('Setting up Telegram bot commands...');
    
    const response = await fetch(`${telegramApi}/setMyCommands`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commands }),
    });

    const result = await response.json();
    console.log('Setup result:', result);

    if (!result.ok) {
      throw new Error(`Failed to set commands: ${result.description}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error setting up commands:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});