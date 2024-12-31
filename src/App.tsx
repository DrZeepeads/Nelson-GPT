import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tools from "./pages/Tools";
import GrowthChart from "./pages/GrowthChart";
import DrugCalculator from "./pages/DrugCalculator";
import Resources from "./pages/learning/Resources";
import Quiz from "./pages/learning/Quiz";
import ClinicalCases from "./pages/learning/ClinicalCases";
import PhysicalExam from "./pages/learning/PhysicalExam";
import LabValues from "./pages/learning/LabValues";
import Research from "./pages/learning/Research";

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
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/growth-chart" element={<GrowthChart />} />
              <Route path="/drug-calculator" element={<DrugCalculator />} />
              <Route path="/learning/resources" element={<Resources />} />
              <Route path="/learning/quiz" element={<Quiz />} />
              <Route path="/learning/cases" element={<ClinicalCases />} />
              <Route path="/learning/examination" element={<PhysicalExam />} />
              <Route path="/learning/lab-values" element={<LabValues />} />
              <Route path="/learning/research" element={<Research />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;