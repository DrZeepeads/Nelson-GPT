import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import DrugCalculator from "./pages/DrugCalculator";
import GrowthChart from "./pages/GrowthChart";
import Settings from "./pages/Settings";
import BmiCalculator from "./pages/BmiCalculator";
import ApgarCalculator from "./pages/ApgarCalculator";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        />
        <Route
          path="/drug-calculator"
          element={
            <ProtectedRoute>
              <DrugCalculator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/growth-chart"
          element={
            <ProtectedRoute>
              <GrowthChart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bmi-calculator"
          element={
            <ProtectedRoute>
              <BmiCalculator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apgar-calculator"
          element={
            <ProtectedRoute>
              <ApgarCalculator />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}