import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const GrowthChartHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm">
      <div className="flex items-center h-14 px-4">
        <button 
          onClick={() => navigate('/tools')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold ml-2">Growth Chart</h1>
      </div>
    </div>
  );
};