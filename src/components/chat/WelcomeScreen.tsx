import { ExampleQuestions } from "../ExampleQuestions";

interface WelcomeScreenProps {
  onQuestionClick: (question: string) => void;
}

export const WelcomeScreen = ({ onQuestionClick }: WelcomeScreenProps) => {
  return (
    <div className="space-y-6 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-xl font-bold text-nelson-primary">Welcome to NelsonGPT</h1>
        <p className="text-sm text-gray-600">
          Your trusted pediatric knowledge assistant powered by Nelson Textbook of Pediatrics.
          Ask any question about pediatric conditions, treatments, or guidelines.
        </p>
      </div>
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-nelson-primary">Suggested Questions</h2>
        <ExampleQuestions onQuestionClick={onQuestionClick} />
      </div>
    </div>
  );
};