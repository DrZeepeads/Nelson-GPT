import { useState, useRef, useEffect } from "react";
import { ChatInput } from "../ChatInput";
import { WelcomeScreen } from "./WelcomeScreen";
import { ChatMessageList } from "./ChatMessageList";
import { ScrollArea } from "../ui/scroll-area";
import { useChatMessages } from "@/hooks/useChatMessages";

interface ChatContainerProps {
  onThinkingChange?: (thinking: boolean) => void;
}

export const ChatContainer = ({ onThinkingChange }: ChatContainerProps) => {
  const {
    messages,
    isLoading,
    isThinking,
    handleSendMessage
  } = useChatMessages(onThinkingChange);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] w-full overflow-hidden pb-32">
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