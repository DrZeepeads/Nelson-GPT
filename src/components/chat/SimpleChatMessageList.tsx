import { Message } from "@/types/chat";
import { ScrollArea } from "../ui/scroll-area";

interface SimpleChatMessageListProps {
  messages: Message[];
}

export const SimpleChatMessageList = ({ messages }: SimpleChatMessageListProps) => {
  return (
    <ScrollArea className="flex-1 px-4">
      <div className="space-y-4 py-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.isBot
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {message.message}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};