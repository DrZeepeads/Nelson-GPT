import { MessageSquare, Stethoscope, Settings, Menu, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto px-4 py-2">
        <button 
          onClick={() => navigate('/')}
          className="flex flex-col items-center p-2 rounded-lg transition-colors hover:bg-gray-50"
        >
          <MessageSquare className="w-6 h-6 text-nelson-accent" />
          <span className="text-xs mt-1 text-nelson-accent font-medium">Chat</span>
        </button>

        <button 
          onClick={() => navigate('/tools')}
          className="flex flex-col items-center p-2 rounded-lg transition-colors hover:bg-gray-50"
        >
          <Stethoscope className="w-6 h-6 text-gray-500" />
          <span className="text-xs mt-1 text-gray-500">Tools</span>
        </button>

        <button 
          className="flex flex-col items-center p-2 rounded-lg transition-colors hover:bg-gray-50"
        >
          <Menu className="w-6 h-6 text-gray-500" />
          <span className="text-xs mt-1 text-gray-500">Menu</span>
        </button>

        <button 
          className="flex flex-col items-center p-2 rounded-lg transition-colors hover:bg-gray-50"
        >
          <Settings className="w-6 h-6 text-gray-500" />
          <span className="text-xs mt-1 text-gray-500">Settings</span>
        </button>
      </div>
    </nav>
  );
};