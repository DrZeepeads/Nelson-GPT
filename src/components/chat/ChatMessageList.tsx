import { ChatMessage } from "../ChatMessage";

interface Message {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: string;
}

interface ChatMessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatMessageList = ({ messages, isLoading }: ChatMessageListProps) => {
  return (
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
    </div>
  );
};