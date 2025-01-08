import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const GrowthChartHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-primary-500">
      <div className="flex items-center h-14 px-4">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-primary-600 rounded-full transition-colors text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold ml-2 text-white">Growth Chart</h1>
      </div>
    </div>
  );
};