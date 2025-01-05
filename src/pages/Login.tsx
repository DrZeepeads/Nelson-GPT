import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Set session persistence based on rememberMe
        supabase.auth.setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
        });
        navigate("/");
      }

      if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed successfully');
      }

      if (event === 'SIGNED_OUT') {
        // Clear any stored tokens
        localStorage.removeItem('supabase.auth.token');
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

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