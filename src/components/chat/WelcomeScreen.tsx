import { ExampleQuestions } from "../ExampleQuestions";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart } from "lucide-react";

interface WelcomeScreenProps {
  onQuestionClick: (question: string) => void;
}

export const WelcomeScreen = ({ onQuestionClick }: WelcomeScreenProps) => {
  return (
    <div className="space-y-8 p-6 animate-fade-in">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-center space-x-2">
          <Heart className="h-6 w-6 text-red-500 animate-pulse" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-nelson-primary to-nelson-accent bg-clip-text text-transparent">
            Welcome to Nelson-GPT
          </h1>
          <Heart className="h-6 w-6 text-red-500 animate-pulse" />
        </div>
        <p className="text-gray-600">
          Your trusted AI companion for comprehensive pediatric knowledge.
          <br />
          Get evidence-based answers for all your pediatric clinical questions.
        </p>
      </div>
      
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-none shadow-lg">
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            <ExampleQuestions onQuestionClick={onQuestionClick} />
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};