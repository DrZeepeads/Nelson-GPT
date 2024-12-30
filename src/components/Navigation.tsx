import { MessageSquare, Settings, Stethoscope } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="flex justify-around max-w-md mx-auto">
        <button className="flex flex-col items-center text-nelson-accent">
          <MessageSquare className="w-6 h-6" />
          <span className="text-sm mt-1">Chat</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Stethoscope className="w-6 h-6" />
          <span className="text-sm mt-1">Tools</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Settings className="w-6 h-6" />
          <span className="text-sm mt-1">Settings</span>
        </button>
      </div>
    </nav>
  );
};