import { supabase } from "@/integrations/supabase/client";

export const setupTelegramWebhook = async (origin: string) => {
  try {
    // Remove any trailing slashes and ensure no empty port
    const cleanOrigin = origin.replace(/\/$/, '').replace(/:$/, '');
    
    // Construct the complete webhook URL with the function path
    const webhookUrl = `${cleanOrigin}/functions/v1/telegram-bot`;
    console.log('Setting up webhook with URL:', webhookUrl);
    
    const response = await supabase.functions.invoke('setup-telegram-webhook', {
      body: { url: webhookUrl }
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    console.log('Webhook setup response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Webhook setup error:', error);
    throw error;
  }
};

export const sendTelegramTestMessage = async (chatId: string) => {
  try {
    console.log('Sending test message to chat ID:', chatId);
    const response = await supabase.functions.invoke('telegram-bot', {
      body: {
        message: 'Hello! Your NelsonGPT bot is now connected.',
        chatId: chatId,
      },
    });

    if (response.error) {
      console.error('Error response:', response.error);
      throw new Error(response.error.message);
    }

    console.log('Test message response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending test message:', error);
    throw error;
  }
};