interface ExampleQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const questions = [
  "What are the red flags for pediatric fever?",
  "Describe developmental milestones 0-12 months",
  "What are common causes of abdominal pain in children?",
  "How to evaluate a child with acute respiratory distress?",
  "What are the signs of dehydration in infants?",
  "Explain the vaccination schedule for the first year"
];

export const ExampleQuestions = ({ onQuestionClick }: ExampleQuestionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {questions.map((question) => (
        <button
          key={question}
          onClick={() => onQuestionClick(question)}
          className="w-full text-left p-3 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg text-nelson-accent transition-colors"
        >
          {question}
        </button>
      ))}
    </div>
  );
};