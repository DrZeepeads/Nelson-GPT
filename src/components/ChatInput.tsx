import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const session = useSession();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to use this feature",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    onSendMessage(message.trim());
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sticky bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t p-4">
      <div className="max-w-4xl mx-auto flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-full border-2 border-primary-100 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
          aria-label="Chat input"
        />
        <Button
          type="submit"
          size="icon"
          className="rounded-full bg-primary-500 hover:bg-primary-600 transition-all duration-200"
          disabled={!message.trim()}
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
};