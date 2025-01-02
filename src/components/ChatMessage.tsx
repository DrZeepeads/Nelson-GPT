import { cn } from "@/lib/utils";
import { format, isValid } from "date-fns";

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

  // Function to format different types of content
  const formatContent = (text: string) => {
    // Split the text into sections (double newline indicates a new section)
    const sections = text.split('\n\n');
    
    return sections.map((section, index) => {
      // Check if the section is a list
      if (section.trim().match(/^[0-9]+\.|^\-|\*/)) {
        const items = section.split('\n');
        return (
          <ul key={index} className="space-y-2 my-4 list-disc list-inside">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-left">
                {item.replace(/^[0-9]+\.|\-|\*/, '').trim()}
              </li>
            ))}
          </ul>
        );
      }
      
      // Check if it's a heading (contains "Chapter" or "Reference:")
      if (section.includes('Chapter') || section.includes('Reference:')) {
        return (
          <h3 key={index} className="font-semibold text-nelson-primary text-left my-3">
            {section}
          </h3>
        );
      }

      // Check if it's a clinical pearl or important note
      if (section.toLowerCase().includes('clinical pearl') || section.toLowerCase().includes('important:')) {
        return (
          <div key={index} className="bg-blue-50 border-l-4 border-nelson-accent p-4 my-4 text-left">
            {section}
          </div>
        );
      }

      // Regular paragraph
      return (
        <p key={index} className="text-left my-3 leading-relaxed">
          {section}
        </p>
      );
    });
  };

  return (
    <div
      className={cn(
        "flex w-full gap-2 p-3 rounded-lg transition-colors group",
        isBot ? "bg-blue-50 hover:bg-blue-100" : "bg-white hover:bg-gray-50"
      )}
    >
      {/* Avatar for bot messages */}
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-nelson-primary flex-shrink-0 flex items-center justify-center">
          <span className="text-white text-sm">AI</span>
        </div>
      )}
      
      <div className={cn(
        "flex flex-col flex-1 gap-2",
        isBot ? "items-start" : "items-end"
      )}>
        <div className={cn(
          "rounded-lg px-4 py-2 max-w-[85%] shadow-sm",
          isBot ? "bg-white border border-gray-200" : "bg-nelson-accent text-white"
        )}>
          {isBot ? formatContent(message) : message}
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