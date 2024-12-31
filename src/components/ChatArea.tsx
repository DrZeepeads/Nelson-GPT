import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ExampleQuestions } from "./ExampleQuestions";
import { ScrollArea } from "./ui/scroll-area";
import { getChatResponse } from "@/utils/mistralApi";
import { useToast } from "@/components/ui/use-toast";
import { TelegramConnect } from "./TelegramConnect";
import { supabase } from "@/integrations/supabase/client";

export const ChatArea = () => {
  const [messages, setMessages] = useState<Array<{
    id: string;
    message: string;
    isBot: boolean;
    timestamp: string;
  }>>([]);
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
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const response = await getChatResponse(message);
      const botResponse = {
        id: (Date.now() + 1).toString(),
        message: response,
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botResponse]);

      // Send to Telegram if chat ID is available
      const telegramChatId = localStorage.getItem('telegram_chat_id');
      if (telegramChatId) {
        try {
          await supabase.functions.invoke('telegram-bot', {
            body: {
              message: `User: ${message}\n\nAssistant: ${response}`,
              chatId: telegramChatId,
            },
          });
        } catch (error) {
          console.error('Error sending to Telegram:', error);
        }
      }
    } catch (error) {
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
          <div className="space-y-6 p-4">
            <div className="text-center space-y-2">
              <h1 className="text-xl font-bold text-nelson-primary">Welcome to NelsonGPT</h1>
              <p className="text-sm text-gray-600">
                Your trusted pediatric knowledge assistant powered by Nelson Textbook of Pediatrics.
                Ask any question about pediatric conditions, treatments, or guidelines.
              </p>
            </div>
            <TelegramConnect />
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-nelson-primary">Suggested Questions</h2>
              <ExampleQuestions onQuestionClick={handleSendMessage} />
            </div>
          </div>
        ) : (
          <div className="space-y-4 pb-4">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.message}
                isBot={msg.isBot}
                timestamp={msg.timestamp}
              />
            ))}
            {isLoading && (
              <div className="p-4">
                <div className="flex gap-2 items-center text-gray-500">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>
      
      <div className="mt-auto">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};