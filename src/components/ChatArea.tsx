import { useState, useRef, useEffect } from "react";
import { ChatInput } from "./ChatInput";
import { WelcomeScreen } from "./chat/WelcomeScreen";
import { ChatMessageList } from "./chat/ChatMessageList";
import { ScrollArea } from "./ui/scroll-area";
import { getChatResponse } from "@/utils/mistralApi";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useTelegramNotification } from "@/hooks/useTelegramNotification";

interface Message {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: string;
  confidence?: number;
  keywords?: string[];
}

interface ChatAreaProps {
  onThinkingChange?: (thinking: boolean) => void;
}

export const ChatArea = ({ onThinkingChange }: ChatAreaProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { sendTelegramNotification } = useTelegramNotification();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    onThinkingChange?.(isThinking);
  }, [isThinking, onThinkingChange]);

  const handleSendMessage = async (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      message,
      isBot: false,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);
    setIsThinking(true);

    try {
      const response = await getChatResponse(message);
      
      const { data: enhancedContent, error: enhancedError } = await supabase
        .from('content_enhancements')
        .select('enhanced_content, confidence_score, keywords')
        .eq('original_content', message)
        .maybeSingle();

      if (enhancedError) {
        console.warn('Error fetching enhanced content:', enhancedError);
      }

      const botResponse = {
        id: (Date.now() + 1).toString(),
        message: response,
        isBot: true,
        timestamp: new Date().toISOString(),
        confidence: enhancedContent?.confidence_score,
        keywords: enhancedContent?.keywords,
      };
      
      setMessages((prev) => [...prev, botResponse]);
      await sendTelegramNotification(message, response);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] max-w-[100vw] overflow-hidden pb-32">
      <div className="flex items-center justify-between px-4 py-2 bg-white/80 backdrop-blur-sm border-b" />
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
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};