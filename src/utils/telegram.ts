import { supabase } from "@/integrations/supabase/client";

export const setupTelegramWebhook = async (origin: string) => {
  const response = await supabase.functions.invoke('setup-telegram-webhook', {
    body: { url: `${origin}/functions/v1/telegram-bot` }
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
};

export const sendTelegramTestMessage = async (chatId: string) => {
  const response = await supabase.functions.invoke('telegram-bot', {
    body: {
      message: 'Hello! Your NelsonGPT bot is now connected.',
      chatId: chatId,
    },
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
};