import { useState, useEffect } from "react";
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

export const useChatMessages = (onThinkingChange?: (thinking: boolean) => void) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const { toast } = useToast();
  const { sendTelegramNotification } = useTelegramNotification();

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

  return {
    messages,
    isLoading,
    isThinking,
    handleSendMessage
  };
};