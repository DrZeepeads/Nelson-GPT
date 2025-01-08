import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const BmiCalculator = () => {
  const navigate = useNavigate();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBmi = () => {
    if (weight && height) {
      const weightInKg = parseFloat(weight);
      const heightInM = parseFloat(height) / 100;
      const calculatedBmi = weightInKg / (heightInM * heightInM);
      setBmi(calculatedBmi);
    }
  };

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { category: "Normal weight", color: "text-green-600" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-600" };
    return { category: "Obese", color: "text-red-600" };
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

      <div className="pt-16 pb-20 px-4 max-w-4xl mx-auto">
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight in kg"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height in cm"
                className="mt-1"
              />
            </div>
            <Button
              onClick={calculateBmi}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Calculate BMI
            </Button>
          </div>

          {bmi !== null && (
            <div className="mt-6 space-y-2">
              <h2 className="text-lg font-semibold">Results</h2>
              <p className="text-2xl font-bold">BMI: {bmi.toFixed(1)}</p>
              <p className={`text-lg ${getBmiCategory(bmi).color}`}>
                Category: {getBmiCategory(bmi).category}
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BmiCalculator;