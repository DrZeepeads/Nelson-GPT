import { Send } from "lucide-react";
import { useState } from "react";

export const ChatInput = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Handle message submission here
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-4 bg-white border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about pediatric conditions, treatments, or guidelines..."
        className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nelson-accent"
      />
      <button
        type="submit"
        className="p-3 bg-nelson-accent text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};