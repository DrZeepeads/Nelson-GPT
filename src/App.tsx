import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tools from "./pages/Tools";
import ApgarCalculator from "./pages/ApgarCalculator";
import BmiCalculator from "./pages/BmiCalculator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tools />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/apgar-calculator" element={<ApgarCalculator />} />
        <Route path="/bmi-calculator" element={<BmiCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;
