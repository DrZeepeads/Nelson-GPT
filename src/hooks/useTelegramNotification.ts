import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useTelegramNotification = () => {
  const { toast } = useToast();

  const sendTelegramNotification = async (userMessage: string, aiResponse: string) => {
    const telegramChatId = localStorage.getItem('telegram_chat_id');
    if (!telegramChatId) return;

    try {
      console.log('Attempting to send message to Telegram:', { 
        message: userMessage, 
        response: aiResponse, 
        chatId: telegramChatId 
      });
      
      const telegramResponse = await supabase.functions.invoke('telegram-bot', {
        body: {
          message: `User: ${userMessage}\n\nAssistant: ${aiResponse}`,
          chatId: telegramChatId,
        },
      });
      
      console.log('Telegram API response:', telegramResponse);
      
      if (telegramResponse.error) {
        console.error('Telegram API error:', telegramResponse.error);
        throw new Error(telegramResponse.error.message);
      }
      
      console.log('Successfully sent message to Telegram');
    } catch (error) {
      console.error('Error sending to Telegram:', error);
      toast({
        title: "Telegram Error",
        description: "Failed to send message to Telegram. Please check your connection and chat ID.",
        variant: "destructive",
      });
    }
  };

  return { sendTelegramNotification };
};