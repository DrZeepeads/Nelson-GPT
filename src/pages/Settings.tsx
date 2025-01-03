import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TelegramConnect } from "@/components/telegram/TelegramConnect";
import { DeleteHistoryButton } from "@/components/settings/DeleteHistoryButton";
import { HomeScreenGuide } from "@/components/settings/HomeScreenGuide";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-2xl mx-auto p-4 pt-20 pb-32">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-bold ml-2">Settings</h2>
      </div>
      
      <div className="space-y-4">
        <HomeScreenGuide />
        <TelegramConnect />
        <DeleteHistoryButton />
      </div>
    </div>
  );
};

export default Settings;