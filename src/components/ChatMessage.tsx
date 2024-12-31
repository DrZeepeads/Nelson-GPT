import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp?: string;
}

export const ChatMessage = ({ message, isBot, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full gap-2 p-3 rounded-lg transition-colors group",
        isBot ? "bg-blue-50 hover:bg-blue-100" : "bg-white hover:bg-gray-50"
      )}
    >
      <div className={cn(
        "flex flex-col flex-1 gap-2",
        isBot ? "items-start" : "items-end"
      )}>
        <div className={cn(
          "rounded-lg px-4 py-2 max-w-[85%] shadow-sm text-sm leading-relaxed",
          isBot ? "bg-white border border-gray-200" : "bg-nelson-accent text-white"
        )}>
          {message}
        </div>
        {timestamp && (
          <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {format(new Date(timestamp), "h:mm a")}
          </span>
        )}
      </div>
    </div>
  );
};