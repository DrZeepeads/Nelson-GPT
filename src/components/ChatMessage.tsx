import { cn } from "@/lib/utils";
import { format, isValid } from "date-fns";
import { ConfidenceDisplay } from "./chat/ConfidenceDisplay";
import { KeywordsList } from "./chat/KeywordsList";
import { MessageContent } from "./chat/MessageContent";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp?: string;
  confidence?: number;
  keywords?: string[];
}

export const ChatMessage = ({ 
  message, 
  isBot, 
  timestamp,
  confidence,
  keywords 
}: ChatMessageProps) => {
  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return '';
    
    try {
      const date = new Date(timestamp);
      if (isValid(date)) {
        return format(date, 'h:mm a');
      }
      return '';
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return '';
    }
  };

  return (
    <div
      className={cn(
        "flex w-full gap-2 p-3 rounded-lg transition-colors group",
        isBot ? "bg-blue-50 hover:bg-blue-100" : "bg-white hover:bg-gray-50"
      )}
    >
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-nelson-primary flex-shrink-0 flex items-center justify-center">
          <span className="text-white text-sm">AI</span>
        </div>
      )}
      
      <div className={cn(
        "flex flex-col flex-1 gap-2",
        isBot ? "items-start" : "items-end"
      )}>
        {isBot && confidence !== undefined && (
          <ConfidenceDisplay confidence={confidence} />
        )}
        {isBot && keywords && keywords.length > 0 && (
          <KeywordsList keywords={keywords} />
        )}
        <MessageContent content={message} isBot={isBot} />
        {timestamp && (
          <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {formatTimestamp(timestamp)}
          </span>
        )}
      </div>
    </div>
  );
};