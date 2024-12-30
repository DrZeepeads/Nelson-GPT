import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ExampleQuestions } from "./ExampleQuestions";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Eraser, Download } from "lucide-react";

export const ChatArea = () => {
  const [messages, setMessages] = useState<Array<{
    id: string;
    message: string;
    isBot: boolean;
    timestamp: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      message,
      isBot: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        message: "This is a simulated response. In the future, this will be connected to the Nelson Textbook of Pediatrics knowledge base.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const downloadChat = () => {
    const chatContent = messages
      .map((msg) => `[${msg.timestamp}] ${msg.isBot ? "Bot" : "You"}: ${msg.message}`)
      .join("\n");
    
    const blob = new Blob([chatContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-history-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex justify-end gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={clearChat}
          className="text-gray-500"
        >
          <Eraser className="w-4 h-4 mr-2" />
          Clear Chat
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={downloadChat}
          className="text-gray-500"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Chat
        </Button>
      </div>
      
      <ScrollArea className="flex-1 pr-4">
        {messages.length === 0 ? (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Example Questions</h2>
            <ExampleQuestions onQuestionClick={handleSendMessage} />
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.message}
                isBot={msg.isBot}
                timestamp={msg.timestamp}
              />
            ))}
            {isLoading && (
              <div className="p-4">
                <div className="flex gap-2 items-center text-gray-500">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        )}
      </ScrollArea>
      
      <div className="mt-auto">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};