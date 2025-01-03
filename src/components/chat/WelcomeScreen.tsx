import { ExampleQuestions } from "../ExampleQuestions";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WelcomeScreenProps {
  onQuestionClick: (question: string) => void;
}

export const WelcomeScreen = ({ onQuestionClick }: WelcomeScreenProps) => {
  return (
    <div className="space-y-6 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-nelson-primary">Welcome to NelsonGPT</h1>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Your trusted pediatric knowledge assistant powered by Nelson Textbook of Pediatrics.
          Ask any question about pediatric conditions, treatments, or guidelines.
        </p>
      </div>
      
      <Card className="p-4 bg-blue-50/50">
        <h2 className="text-lg font-semibold text-nelson-primary mb-3">Popular Topics</h2>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            <ExampleQuestions onQuestionClick={onQuestionClick} />
          </div>
        </ScrollArea>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold text-nelson-primary mb-2">Getting Started</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Type your question in the chat box below</li>
            <li>• Use specific medical terms for better results</li>
            <li>• Review suggested questions for examples</li>
          </ul>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-semibold text-nelson-primary mb-2">Features</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Evidence-based responses</li>
            <li>• Access to medical calculators</li>
            <li>• Growth chart analysis</li>
            <li>• Drug dosing information</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};