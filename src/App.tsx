import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import Tools from "./pages/Tools"
import DrugCalculator from "./pages/DrugCalculator"
import GrowthChart from "./pages/GrowthChart"
import Settings from "./pages/Settings"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/drug-calculator" element={<DrugCalculator />} />
        <Route path="/growth-chart" element={<GrowthChart />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  )
}
