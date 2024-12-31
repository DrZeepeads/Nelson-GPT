import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What is the most common cause of bacterial meningitis in infants <3 months?",
    options: [
      "Group B Streptococcus",
      "E. coli",
      "S. pneumoniae",
      "N. meningitidis"
    ],
    correctAnswer: 0,
    explanation: "Group B Streptococcus (GBS) is the most common cause of bacterial meningitis in infants less than 3 months of age."
  },
  {
    id: 2,
    question: "Which of the following is NOT a red flag for pediatric fever?",
    options: [
      "Age <28 days",
      "Petechial rash",
      "Low-grade fever",
      "Altered mental status"
    ],
    correctAnswer: 2,
    explanation: "Low-grade fever alone is not a red flag. Red flags include age <28 days, petechial rash, altered mental status, and signs of shock."
  }
];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-14 pb-16">
      <div className="px-4 py-2 bg-white shadow-sm flex items-center">
        <button 
          onClick={() => navigate('/tools')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold ml-2">Practice Questions</h1>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500 mb-4">Question {currentQuestion + 1} of {sampleQuestions.length}</p>
          
          <h2 className="text-lg font-medium mb-4">{sampleQuestions[currentQuestion].question}</h2>
          
          <div className="space-y-2">
            {sampleQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-3 text-left rounded-lg border transition-colors ${
                  selectedAnswer === null
                    ? 'border-gray-200 hover:bg-gray-50'
                    : selectedAnswer === index
                      ? index === sampleQuestions[currentQuestion].correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : index === sampleQuestions[currentQuestion].correctAnswer && showExplanation
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200'
                }`}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">{sampleQuestions[currentQuestion].explanation}</p>
            </div>
          )}

          {showExplanation && currentQuestion < sampleQuestions.length - 1 && (
            <button
              onClick={handleNextQuestion}
              className="mt-4 w-full bg-nelson-accent text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;