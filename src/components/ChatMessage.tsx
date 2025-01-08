import { cn } from "@/lib/utils";
import { useSettings } from "@/stores/useSettings";

interface ChatMessageProps {
  content: string;
  role: string;
}

const ChatMessage = ({ content, role }: ChatMessageProps) => {
  const { chatBubbleStyle } = useSettings();
  
  return (
    <div
      className={cn(
        "py-2 px-4 mb-4",
        role === "assistant" ? "bg-primary-50" : "bg-gray-50",
        chatBubbleStyle === "rounded" ? "rounded-2xl" : "rounded-md"
      )}
    >
      <p className="text-gray-800">{content}</p>
    </div>
  );
};

export default ChatMessage;