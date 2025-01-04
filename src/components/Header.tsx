import { Loader2, LogOut, Stethoscope } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface HeaderProps {
  isThinking?: boolean;
}

export const Header = ({ isThinking }: HeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
      toast({
        title: "Logged out successfully",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <header className="w-full bg-nelson-primary text-white fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Stethoscope className="w-6 h-6 animate-[spin_3s_linear_infinite]" />
            <h1 className="text-xl font-semibold">Nelson-GPT</h1>
          </div>
          <div className="flex items-center gap-4">
            {isThinking && (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 text-red-500 animate-spin" />
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-white/80"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};