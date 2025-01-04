import { Header } from "@/components/Header";
import { ChatArea } from "@/components/ChatArea";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { HomeScreenGuide } from "@/components/settings/HomeScreenGuide";

const Index = () => {
  const [isThinking, setIsThinking] = useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
        <HomeScreenGuide />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-nelson-primary">
      <Header isThinking={isThinking} />
      <main className="w-full pt-safe pb-24">
        <div className="w-full">
          <div className="bg-white">
            <ChatArea onThinkingChange={setIsThinking} />
          </div>
        </div>
      </main>
      <Navigation />
      <Toaster />
    </div>
  );
};

export default Index;