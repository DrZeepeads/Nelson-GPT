interface ExampleQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const questions = [
  "What are the red flags for pediatric fever?",
  "Describe developmental milestones 0-12 months",
  "How do you assess dehydration in infants?",
  "What are the common causes of failure to thrive?",
  "Explain the approach to pediatric respiratory distress",
  "What are the indications for phototherapy in neonatal jaundice?",
  "How do you manage acute otitis media in children?",
  "What is the evaluation process for suspected sepsis in newborns?",
  "Describe the management of status epilepticus in children",
  "What are the warning signs of meningitis in infants?"
];

export const ExampleQuestions = ({ onQuestionClick }: ExampleQuestionsProps) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {questions.map((question) => (
        <button
          key={question}
          onClick={() => onQuestionClick(question)}
          className="w-full text-left p-3 text-sm bg-white hover:bg-blue-50 rounded-lg text-nelson-accent transition-colors border border-blue-100 hover:border-blue-200 shadow-sm hover:shadow"
        >
          {question}
        </button>
      ))}
    </div>
  );
};