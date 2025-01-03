import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface SimpleChatInputProps {
  onSendMessage: (message: string) => void;
}

export const SimpleChatInput = ({ onSendMessage }: SimpleChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSendMessage(message.trim());
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="fixed bottom-16 left-0 right-0 bg-white/80 backdrop-blur-md border-t shadow-lg">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex items-center space-x-2 py-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            aria-label="Chat input"
          />
          <Button
            type="submit"
            className="p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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