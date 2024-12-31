import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tools from "./pages/Tools";
import ApgarCalculator from "./pages/ApgarCalculator";
import BmiCalculator from "./pages/BmiCalculator";
import DrugCalculator from "./pages/DrugCalculator";
import GrowthChart from "./pages/GrowthChart";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        retry: 1,
      },
    },
  });

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/apgar-calculator" element={<ApgarCalculator />} />
              <Route path="/bmi-calculator" element={<BmiCalculator />} />
              <Route path="/drug-calculator" element={<DrugCalculator />} />
              <Route path="/growth-chart" element={<GrowthChart />} />
            </Routes>
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;