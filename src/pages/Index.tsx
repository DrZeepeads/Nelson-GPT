import { Header } from "@/components/Header";
import Navigation from "@/components/Navigation";
import { ChatArea } from "@/components/ChatArea";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main className="pt-14 pb-16 container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Main Chat Area */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <ChatArea />
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