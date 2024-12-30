import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { ChatArea } from "@/components/ChatArea";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16 pb-20">
        <div className="max-w-2xl mx-auto">
          <ChatArea />
        </div>
      </main>
      <Navigation />
    </div>
  );
};

export default Index;