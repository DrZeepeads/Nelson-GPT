import { cn } from "@/lib/utils";
import { format, isValid, parseISO } from "date-fns";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp?: string;
}

export const ChatMessage = ({ message, isBot, timestamp }: ChatMessageProps) => {
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

  // Function to format the message with proper line breaks and lists
  const formatMessage = (text: string) => {
    // Split the text into paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Check if paragraph starts with a list marker
      if (paragraph.trim().match(/^[0-9]+\.|^\-|\*/) || paragraph.includes('Chapter') || paragraph.includes('Reference:')) {
        // Format as a list item or special section with different styling
        return (
          <div 
            key={index} 
            className={cn(
              "mb-2",
              paragraph.includes('Chapter') || paragraph.includes('Reference:') ? "font-semibold text-nelson-primary" : ""
            )}
          >
            {paragraph}
          </div>
        );
      }
      // Regular paragraph
      return <p key={index} className="mb-2">{paragraph}</p>;
    });
  };

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
          {isBot ? formatMessage(message) : message}
        </div>
        {timestamp && (
          <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {formatTimestamp(timestamp)}
          </span>
        )}
      </div>
    </div>
  );
};