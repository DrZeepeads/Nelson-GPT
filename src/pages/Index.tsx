import { Header } from "@/components/Header";
import Navigation from "@/components/Navigation";
import { ChatArea } from "@/components/ChatArea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Info, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main className="pt-14 pb-16 container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Main Chat Area */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <ChatArea />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Quick Actions</h3>
              <div className="space-y-2">
                <Link to="/tools">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Medical Tools
                  </Button>
                </Link>
                <Link to="/settings">
                  <Button variant="outline" className="w-full justify-start">
                    <Info className="mr-2 h-4 w-4" />
                    About NelsonGPT
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Tips</h3>
              <ScrollArea className="h-[200px]">
                <div className="space-y-3 text-sm text-gray-600">
                  <p>• Ask specific questions about pediatric conditions</p>
                  <p>• Use medical calculators in the Tools section</p>
                  <p>• Check growth charts and developmental milestones</p>
                  <p>• Get drug dosing information</p>
                  <p>• Review APGAR scoring</p>
                  <p>• Calculate BMI for pediatric patients</p>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </main>
      <Navigation />
      <Toaster />
    </div>
  );
};

export default Index;