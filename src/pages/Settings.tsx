import { Header } from "@/components/Header";
import Navigation from "@/components/Navigation";
import { DeleteHistoryButton } from "@/components/settings/DeleteHistoryButton";
import { HomeScreenGuide } from "@/components/settings/HomeScreenGuide";
import { Toaster } from "@/components/ui/toaster";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-24">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="space-y-6">
          <HomeScreenGuide />
          <DeleteHistoryButton />
        </div>
      </main>
      <Navigation />
      <Toaster />
    </div>
  );
};

export default Settings;