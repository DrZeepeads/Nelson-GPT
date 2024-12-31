import { Book, ListCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LearningResources = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-4">
      <button 
        onClick={() => navigate('/learning/resources')}
        className="w-full flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
      >
        <Book className="w-6 h-6 text-nelson-accent" />
        <div className="ml-3 text-left">
          <h3 className="font-medium">Study Materials</h3>
          <p className="text-sm text-gray-500">Access pediatric learning resources</p>
        </div>
      </button>

      <button 
        onClick={() => navigate('/learning/quiz')}
        className="w-full flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
      >
        <ListCheck className="w-6 h-6 text-green-500" />
        <div className="ml-3 text-left">
          <h3 className="font-medium">Practice Questions</h3>
          <p className="text-sm text-gray-500">Test your knowledge with MCQs</p>
        </div>
      </button>
    </div>
  );
};