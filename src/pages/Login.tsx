import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";

const Login = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          navigate("/");
        }
      } catch (error) {
        console.error("Session check error:", error);
        toast({
          title: "Error",
          description: "Failed to check authentication status",
          variant: "destructive",
        });
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        try {
          await supabase.auth.setSession({
            access_token: session.access_token,
            refresh_token: session.refresh_token,
          });
          navigate("/", { replace: true });
        } catch (error) {
          console.error("Session setup error:", error);
          toast({
            title: "Error",
            description: "Failed to setup session",
            variant: "destructive",
          });
        }
      }

      if (event === 'SIGNED_OUT') {
        localStorage.removeItem('supabase.auth.token');
      }

      // Handle auth errors - removed USER_DELETED check as it's not a valid AuthChangeEvent
      if (event === 'SIGNED_OUT') {
        toast({
          title: "Session Ended",
          description: "Please sign in again",
          variant: "destructive",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-nelson-primary mb-2">Welcome to NelsonGPT</h1>
          <p className="text-gray-600">Sign in to access pediatric knowledge</p>
        </div>
        <div className="space-y-6">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#003B4D',
                    brandAccent: '#2563EB',
                  }
                }
              }
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/`}
          />
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="rememberMe" 
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label htmlFor="rememberMe" className="text-sm text-gray-600">
              Remember me
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;