import { cn } from "@/lib/utils";
import { useSettings } from "@/stores/useSettings";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: string;
  confidence?: number;
  keywords?: string[];
}

export default function ChatMessage({ message, isBot, timestamp, confidence, keywords }: ChatMessageProps) {
  const { chatBubbleStyle } = useSettings();
  
  return (
    <div
      className={cn(
        "py-2 px-4 mb-4",
        isBot ? "bg-primary-50" : "bg-gray-50",
        chatBubbleStyle === "rounded" ? "rounded-2xl" : "rounded-md"
      )}
    >
      <p className="text-gray-800">{message}</p>
    </div>
  );
}