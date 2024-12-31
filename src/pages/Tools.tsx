import { LineChart, Calculator, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LearningResources } from "@/components/learning/LearningResources";

const Tools = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-14 pb-16">
      <div className="px-4 py-2 bg-white shadow-sm flex items-center">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold ml-2">Tools</h1>
      </div>

      <div className="p-4 space-y-4">
        <button 
          onClick={() => navigate('/growth-chart')}
          className="w-full flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <LineChart className="w-6 h-6 text-blue-500" />
          <div className="ml-3 text-left">
            <h3 className="font-medium">Growth Chart</h3>
            <p className="text-sm text-gray-500">Track pediatric growth percentiles</p>
          </div>
        </button>

        <button 
          onClick={() => navigate('/drug-calculator')}
          className="w-full flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <Calculator className="w-6 h-6 text-green-500" />
          <div className="ml-3 text-left">
            <h3 className="font-medium">Drug Calculator</h3>
            <p className="text-sm text-gray-500">Calculate pediatric medication doses</p>
          </div>
        </button>

        <div className="pt-4">
          <h2 className="text-lg font-semibold px-1 mb-2">Learning Resources</h2>
          <LearningResources />
        </div>
      </div>
    </div>
  );
};

export default Tools;