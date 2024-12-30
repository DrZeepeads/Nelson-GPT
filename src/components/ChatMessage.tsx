import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp?: string;
}

export const ChatMessage = ({ message, isBot, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full gap-2 p-4",
        isBot ? "bg-blue-50" : "bg-white"
      )}
    >
      <div className={cn(
        "flex flex-col flex-1 gap-1",
        isBot ? "items-start" : "items-end"
      )}>
        <div className={cn(
          "rounded-lg px-4 py-2 max-w-[80%]",
          isBot ? "bg-white border border-gray-200" : "bg-nelson-accent text-white"
        )}>
          {message}
        </div>
        {timestamp && (
          <span className="text-xs text-gray-500">{timestamp}</span>
        )}
      </div>
    </div>
  );
};