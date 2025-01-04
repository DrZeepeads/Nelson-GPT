import { ExampleQuestions } from "../ExampleQuestions";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, Star, Trophy } from "lucide-react";

interface WelcomeScreenProps {
  onQuestionClick: (question: string) => void;
}

export const WelcomeScreen = ({ onQuestionClick }: WelcomeScreenProps) => {
  return (
    <div className="space-y-8 p-8 animate-fade-in">
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <div className="relative">
          <div className="absolute -left-8 top-0">
            <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
          </div>
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Heart className="h-7 w-7 text-red-500 animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-nelson-primary via-nelson-accent to-blue-600 bg-clip-text text-transparent">
              Welcome to Nelson-GPT
            </h1>
            <Heart className="h-7 w-7 text-red-500 animate-pulse" />
          </div>
          <div className="absolute -right-8 top-0">
            <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-lg text-gray-700">
            Your trusted AI companion for comprehensive pediatric knowledge.
          </p>
          <p className="text-lg text-gray-700">
            Get evidence-based answers for all your pediatric clinical questions.
          </p>
        </div>

        <div className="flex justify-center items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="text-sm text-gray-600 italic">
            Powered by Nelson Textbook of Pediatrics
          </span>
        </div>
      </div>
      
      <Card className="p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            <ExampleQuestions onQuestionClick={onQuestionClick} />
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};