import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ExampleQuestions } from "@/components/ExampleQuestions";

const Quiz = () => {
  const navigate = useNavigate();
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
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

      <div className="p-4 space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Sample Questions</h2>
          <ExampleQuestions onQuestionClick={handleQuestionClick} />
        </div>

        {selectedQuestion && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-medium mb-4">{selectedQuestion}</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 text-sm border rounded-lg hover:bg-gray-50">
                Answer option 1
              </button>
              <button className="w-full text-left p-3 text-sm border rounded-lg hover:bg-gray-50">
                Answer option 2
              </button>
              <button className="w-full text-left p-3 text-sm border rounded-lg hover:bg-gray-50">
                Answer option 3
              </button>
              <button className="w-full text-left p-3 text-sm border rounded-lg hover:bg-gray-50">
                Answer option 4
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;