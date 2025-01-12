import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calculator, 
  LineChart, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu as MenuIcon,
  Baby,
  Scale,
  Home,
  Brain
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useToast } from "./ui/use-toast";

const Navigation = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login', { replace: true });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const triggerKnowledgeExtraction = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('extract-knowledge');
      
      if (error) throw error;

      toast({
        title: "Knowledge extraction started",
        description: `Processing ${data.processed} items`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Error triggering knowledge extraction:', error);
      toast({
        title: "Error starting knowledge extraction",
        description: error.message,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const menuItems = [
    {
      label: "Home",
      icon: Home,
      onClick: () => navigate('/')
    },
    {
      label: "Drug Calculator",
      icon: Calculator,
      onClick: () => navigate('/drug-calculator')
    },
    {
      label: "Growth Charts",
      icon: LineChart,
      onClick: () => navigate('/growth-chart')
    },
    {
      label: "APGAR Score",
      icon: Baby,
      onClick: () => navigate('/apgar-calculator')
    },
    {
      label: "BMI Calculator",
      icon: Scale,
      onClick: () => navigate('/bmi-calculator')
    },
    {
      label: "Chat History",
      icon: MessageSquare,
      onClick: () => navigate('/chat-history')
    },
    {
      label: "Extract Knowledge",
      icon: Brain,
      onClick: triggerKnowledgeExtraction
    },
    {
      label: "Settings",
      icon: Settings,
      onClick: () => navigate('/settings')
    }
  ];

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-primary-500 z-50 flex items-center px-4">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white hover:bg-primary-600">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full">
            <div className="flex-1 py-4">
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="w-full justify-start px-6 py-4 h-auto text-lg font-normal"
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                >
                  <item.icon className="mr-4 h-5 w-5" />
                  {item.label}
                </Button>
              ))}
            </div>
            <div className="border-t p-4">
              <Button
                variant="ghost"
                className="w-full justify-start px-6 py-4 h-auto text-lg font-normal text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleSignOut}
              >
                <LogOut className="mr-4 h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navigation;