interface ExampleQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const questions = [
  "What are the red flags for pediatric fever?",
  "Describe developmental milestones 0-12 months",
  "Common causes of acute abdominal pain in children",
  "Current vaccination schedule recommendations",
];

export const ExampleQuestions = ({ onQuestionClick }: ExampleQuestionsProps) => {
  return (
    <div className="space-y-3">
      {questions.map((question) => (
        <button
          key={question}
          onClick={() => onQuestionClick(question)}
          className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-nelson-accent transition-colors"
        >
          {question}
        </button>
      ))}
    </div>
  );
};