import { useState, useRef, useEffect } from "react";
import { SimpleChatInput } from "./chat/SimpleChatInput";
import { SimpleChatMessageList } from "./chat/SimpleChatMessageList";

interface Message {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: string;
}

export const ChatArea = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] max-w-[100vw] overflow-hidden pb-32">
      <div className="flex items-center justify-between px-4 py-2 bg-white/80 backdrop-blur-sm border-b">
        <h2 className="text-lg font-semibold text-gray-700">Chat</h2>
      </div>
      <SimpleChatMessageList messages={messages} />
      <div ref={messagesEndRef} />
      <SimpleChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};