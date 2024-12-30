import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { ChatArea } from "@/components/ChatArea";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-14 pb-16">
        <ChatArea />
      </main>
      <Navigation />
    </div>
  );
};

export default Index;