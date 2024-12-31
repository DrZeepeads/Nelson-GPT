import { supabase } from "@/integrations/supabase/client";

export const setupTelegramWebhook = async (origin: string) => {
  try {
    const response = await supabase.functions.invoke('setup-telegram-webhook', {
      body: { url: origin }
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data;
  } catch (error) {
    console.error('Webhook setup error:', error);
    throw error;
  }
};

export const sendTelegramTestMessage = async (chatId: string) => {
  try {
    const response = await supabase.functions.invoke('telegram-bot', {
      body: {
        message: 'Hello! Your NelsonGPT bot is now connected.',
        chatId: chatId,
      },
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data;
  } catch (error) {
    console.error('Error sending test message:', error);
    throw error;
  }
};