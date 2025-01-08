import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BmiCalculator = () => {
  const navigate = useNavigate();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBmi = () => {
    if (weight && height) {
      const weightInKg = parseFloat(weight);
      const heightInM = parseFloat(height) / 100; // Convert cm to m
      const calculatedBmi = weightInKg / (heightInM * heightInM);
      setBmi(calculatedBmi);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-nelson-primary">
        <div className="flex items-center h-14 px-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-primary-600 rounded-full transition-colors text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold ml-2 text-white">BMI Calculator</h1>
        </div>
      </div>

      <div className="pt-16 pb-20 px-4 max-w-4xl mx-auto space-y-6">
        <div>
          <label className="block mb-2">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <button
          onClick={calculateBmi}
          className="bg-blue-500 text-white rounded p-2"
        >
          Calculate BMI
        </button>
        {bmi !== null && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Your BMI: {bmi.toFixed(2)}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default BmiCalculator;
