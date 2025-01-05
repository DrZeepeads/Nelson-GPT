import { Send, Brain } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
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
        description: "Please sign in to use the chat feature.",
        variant: "destructive",
        className: "bg-red-500 text-white border-none rounded-none w-full top-0 fixed",
        duration: 3000,
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
    <form onSubmit={handleSubmit} className="fixed bottom-16 left-0 right-0 bg-white/80 backdrop-blur-md border-t shadow-lg z-40">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex items-center space-x-2 py-4">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Brain className="h-5 w-5 text-nelson-accent opacity-40" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>AI-powered pediatric assistant</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about pediatrics..."
              className="w-full p-4 pl-12 pr-12 rounded-xl border-2 border-nelson-accent/20 focus:border-nelson-accent focus:outline-none focus:ring-2 focus:ring-nelson-accent/20 transition-all duration-200 placeholder:text-gray-400 bg-white/80"
              aria-label="Chat input"
            />
          </div>
          <Button
            type="submit"
            className="p-4 bg-nelson-accent text-white rounded-xl hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            disabled={!message.trim()}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </form>
  );
};