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
        <div className="flex items-start space-x-2 p-4 max-w-[80%]">
          <div className="h-8 w-8 rounded-full bg-nelson-primary flex items-center justify-center">
            <span className="text-white text-sm">AI</span>
          </div>
          <div className="flex-1">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-nelson-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-nelson-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-nelson-primary rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};