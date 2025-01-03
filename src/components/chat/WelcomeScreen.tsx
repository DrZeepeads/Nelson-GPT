import { ExampleQuestions } from "../ExampleQuestions";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, BookOpen, Stethoscope, GraduationCap } from "lucide-react";

interface WelcomeScreenProps {
  onQuestionClick: (question: string) => void;
}

export const WelcomeScreen = ({ onQuestionClick }: WelcomeScreenProps) => {
  return (
    <div className="space-y-8 p-6 animate-fade-in">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="h-8 w-8 text-blue-500 animate-pulse" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Medical Assistant
          </h1>
          <Sparkles className="h-8 w-8 text-blue-500 animate-pulse" />
        </div>
        <p className="text-base text-gray-600 leading-relaxed">
          Your trusted knowledge assistant powered by medical expertise.
          Ask any question about conditions, treatments, or guidelines.
        </p>
      </div>
      
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-none shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-blue-900">Popular Topics</h2>
        </div>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            <ExampleQuestions onQuestionClick={onQuestionClick} />
          </div>
        </ScrollArea>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow duration-300 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <Stethoscope className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Getting Started</h3>
          </div>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
              Type your question in the chat box below
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
              Use specific medical terms for better results
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
              Review suggested questions for examples
            </li>
          </ul>
        </Card>
        
        <Card className="p-6 hover:shadow-lg transition-shadow duration-300 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Features</h3>
          </div>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
              Evidence-based responses
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
              Access to medical calculators
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
              Growth chart analysis
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
              Drug dosing information
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};