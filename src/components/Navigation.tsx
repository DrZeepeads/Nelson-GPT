import { MessageSquare, Stethoscope, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="container max-w-md mx-auto">
        <div className="flex justify-around py-2">
          <button 
            onClick={() => navigate('/')}
            className="flex flex-col items-center p-2 rounded-lg transition-colors hover:bg-gray-50"
          >
            <MessageSquare className="w-6 h-6 text-gray-500" />
            <span className="text-xs mt-1 text-gray-500">Chat</span>
          </button>

          <button 
            onClick={() => navigate('/tools')}
            className="flex flex-col items-center p-2 rounded-lg transition-colors hover:bg-gray-50"
          >
            <Stethoscope className="w-6 h-6 text-gray-500" />
            <span className="text-xs mt-1 text-gray-500">Tools</span>
          </button>

          <button 
            onClick={() => navigate('/settings')}
            className="flex flex-col items-center p-2 rounded-lg transition-colors hover:bg-gray-50"
          >
            <Settings className="w-6 h-6 text-gray-500" />
            <span className="text-xs mt-1 text-gray-500">Settings</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;