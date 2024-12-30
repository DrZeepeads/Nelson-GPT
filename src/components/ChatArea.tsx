import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ExampleQuestions } from "./ExampleQuestions";
import { ScrollArea } from "./ui/scroll-area";

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

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <ScrollArea className="flex-1 pr-4">
        {messages.length === 0 ? (
          <div className="space-y-8 p-4">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-nelson-primary">Welcome to NelsonGPT</h1>
              <p className="text-gray-600">
                Your trusted pediatric knowledge assistant powered by Nelson Textbook of Pediatrics.
                Ask any question about pediatric conditions, treatments, or guidelines.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-nelson-primary">Suggested Questions</h2>
              <ExampleQuestions onQuestionClick={handleSendMessage} />
            </div>
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