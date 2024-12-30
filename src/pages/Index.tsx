import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { ExampleQuestions } from "@/components/ExampleQuestions";
import { ChatInput } from "@/components/ChatInput";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-24 px-4 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Nelson-GPT</h1>
          <p className="text-gray-600 text-lg mb-8">
            Evidence-based pediatric knowledge assistant powered by Nelson Textbook of Pediatrics. Ask
            questions about symptoms, diagnoses, treatments, development, and preventive care.
          </p>
          <ExampleQuestions />
        </div>
      </main>
      <div className="fixed bottom-16 left-0 right-0">
        <div className="max-w-2xl mx-auto">
          <ChatInput />
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Index;