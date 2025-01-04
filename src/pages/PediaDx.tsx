import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PediaDx as PediaDxComponent } from "@/components/pedia-dx/PediaDx";

const PediaDx = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-14 pb-20">
      {/* Header */}
      <div className="px-4 py-2 bg-white/80 backdrop-blur-lg shadow-sm flex items-center fixed top-0 w-full z-10">
        <button 
          onClick={() => navigate('/tools')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold ml-2">PediaDx Assistant</h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <PediaDxComponent />
      </div>
    </div>
  );
};

export default PediaDx;