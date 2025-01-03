import { Header } from "@/components/Header";
import { ChatArea } from "@/components/ChatArea";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [isThinking, setIsThinking] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header isThinking={isThinking} />
      <main className="pt-14 pb-24 container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <ChatArea onThinkingChange={setIsThinking} />
            </div>
          </div>
        </div>
      </main>
      <Navigation />
      <Toaster />
    </div>
  );
};

export default Index;