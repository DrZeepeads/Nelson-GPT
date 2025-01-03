import { MessageSquare, Stethoscope, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-[9999] shadow-sm">
      <div className="container max-w-md mx-auto">
        <div className="flex justify-around py-4">
          <button 
            onClick={() => navigate('/')}
            className="flex flex-col items-center p-2 rounded-xl transition-all duration-200 hover:bg-nelson-accent/10 active:scale-95"
          >
            <MessageSquare className="w-6 h-6 text-nelson-primary" />
            <span className="text-xs mt-1 font-medium text-nelson-primary">Chat</span>
          </button>

          <button 
            onClick={() => navigate('/tools')}
            className="flex flex-col items-center p-2 rounded-xl transition-all duration-200 hover:bg-nelson-accent/10 active:scale-95"
          >
            <Stethoscope className="w-6 h-6 text-nelson-primary" />
            <span className="text-xs mt-1 font-medium text-nelson-primary">Tools</span>
          </button>

          <button 
            onClick={() => navigate('/settings')}
            className="flex flex-col items-center p-2 rounded-xl transition-all duration-200 hover:bg-nelson-accent/10 active:scale-95"
          >
            <Settings className="w-6 h-6 text-nelson-primary" />
            <span className="text-xs mt-1 font-medium text-nelson-primary">Settings</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;