import { useState, useRef, useEffect } from "react";
import { ChatInput } from "./ChatInput";
import { WelcomeScreen } from "./chat/WelcomeScreen";
import { ChatMessageList } from "./chat/ChatMessageList";
import { ScrollArea } from "./ui/scroll-area";
import { getChatResponse } from "@/utils/mistralApi";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: string;
}

export const ChatArea = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      message,
      isBot: false,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const response = await getChatResponse(message);
      const botResponse = {
        id: (Date.now() + 1).toString(),
        message: response,
        isBot: true,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botResponse]);

      // Send to Telegram if chat ID is available
      const telegramChatId = localStorage.getItem('telegram_chat_id');
      if (telegramChatId) {
        try {
          console.log('Sending to Telegram:', { message, response, chatId: telegramChatId });
          const telegramResponse = await supabase.functions.invoke('telegram-bot', {
            body: {
              message: `User: ${message}\n\nAssistant: ${response}`,
              chatId: telegramChatId,
            },
          });
          console.log('Telegram response:', telegramResponse);
          
          if (telegramResponse.error) {
            throw new Error(telegramResponse.error.message);
          }
        } catch (error) {
          console.error('Error sending to Telegram:', error);
          toast({
            title: "Telegram Error",
            description: "Failed to send message to Telegram. Please check your connection.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] max-w-[100vw] overflow-hidden">
      <ScrollArea className="flex-1 px-4">
        {messages.length === 0 ? (
          <WelcomeScreen onQuestionClick={handleSendMessage} />
        ) : (
          <>
            <ChatMessageList messages={messages} isLoading={isLoading} />
            <div ref={messagesEndRef} />
          </>
        )}
      </ScrollArea>
      
      <div className="mt-auto">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};