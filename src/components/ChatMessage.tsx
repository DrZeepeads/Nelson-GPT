import { cn } from "@/lib/utils";
import { format, isValid } from "date-fns";
import { Badge } from "./ui/badge";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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

  // Function to extract citations from text and return cleaned text and citations array
  const extractCitations = (text: string) => {
    const citations: string[] = [];
    const cleanedText = text.replace(/\(Chapter [^)]+\)/g, (match) => {
      citations.push(match);
      return '';
    });
    return { cleanedText, citations };
  };

  // Function to format different types of content
  const formatContent = (text: string) => {
    const sections = text.split('\n\n');
    const allCitations: string[] = [];
    
    const formattedSections = sections.map((section, index) => {
      // Extract citations from the section
      const { cleanedText, citations } = extractCitations(section);
      allCitations.push(...citations);
      
      // Check if the section is a numbered heading (1., 2., etc.)
      if (cleanedText.match(/^\d+\.\s+[A-Za-z]/)) {
        const [heading, ...content] = cleanedText.split('\n');
        return (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-bold text-nelson-primary mb-2">
              {heading.replace(/^\d+\.\s+/, '')}
            </h3>
            {content.length > 0 && (
              <div className="pl-4">
                {formatSection(content.join('\n'))}
              </div>
            )}
          </div>
        );
      }
      
      return formatSection(cleanedText);
    });

    return (
      <>
        {confidence !== undefined && isBot && (
          <div className="mb-2 flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1">
                    <Info className="w-4 h-4 text-nelson-accent" />
                    <span className="text-sm text-gray-600">
                      Confidence: {(confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>AI confidence score for this response</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
        {keywords && keywords.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {keywords.map((keyword, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        )}
        {formattedSections}
        {allCitations.length > 0 && (
          <div className="mt-4 pt-2 border-t border-gray-200 text-sm text-gray-600">
            <p className="font-medium">References:</p>
            <ul className="list-none space-y-1">
              {[...new Set(allCitations)].map((citation, index) => (
                <li key={index}>{citation}</li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  };

  // Helper function to format individual sections
  const formatSection = (text: string) => {
    // Check if it's a list
    if (text.trim().match(/^[0-9]+\.|^\-|\*/)) {
      const items = text.split('\n');
      return (
        <ul className="space-y-2 my-2 list-disc list-inside">
          {items.map((item, index) => (
            <li key={index} className="text-left">
              {item.replace(/^[0-9]+\.|\-|\*/, '').trim()}
            </li>
          ))}
        </ul>
      );
    }

    // Check if it's a clinical pearl or important note
    if (text.toLowerCase().includes('clinical pearl') || text.toLowerCase().includes('important:')) {
      return (
        <div className="bg-blue-50 border-l-4 border-nelson-accent p-4 my-4 text-left">
          {text}
        </div>
      );
    }

    // Regular paragraph
    return (
      <p className="text-left my-2 leading-relaxed">
        {text}
      </p>
    );
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