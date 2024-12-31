import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const BmiCalculator = () => {
  const navigate = useNavigate();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('metric'); // metric or imperial
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    if (!weight || !height) return;

    let bmiValue: number;
    if (unit === 'metric') {
      // Weight in kg, height in cm
      bmiValue = (parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2));
    } else {
      // Weight in lbs, height in inches
      bmiValue = (parseFloat(weight) / Math.pow(parseFloat(height), 2)) * 703;
    }
    setBmi(Math.round(bmiValue * 10) / 10);
  };

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { text: "Underweight", color: "bg-blue-100 border-blue-200 text-blue-800" };
    if (bmi < 25) return { text: "Normal weight", color: "bg-green-100 border-green-200 text-green-800" };
    if (bmi < 30) return { text: "Overweight", color: "bg-yellow-100 border-yellow-200 text-yellow-800" };
    return { text: "Obese", color: "bg-red-100 border-red-200 text-red-800" };
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-14 pb-20">
      <div className="px-4 py-2 bg-white shadow-sm flex items-center fixed top-0 w-full z-10">
        <button 
          onClick={() => navigate('/tools')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold ml-2">BMI Calculator</h1>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Calculate BMI</CardTitle>
            <CardDescription>Enter height and weight to calculate Body Mass Index</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <RadioGroup
                value={unit}
                onValueChange={setUnit}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="metric" id="metric" />
                  <Label htmlFor="metric">Metric (kg/cm)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="imperial" id="imperial" />
                  <Label htmlFor="imperial">Imperial (lb/in)</Label>
                </div>
              </RadioGroup>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight ({unit === 'metric' ? 'kg' : 'lb'})</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder={`Enter weight in ${unit === 'metric' ? 'kilograms' : 'pounds'}`}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height ({unit === 'metric' ? 'cm' : 'in'})</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder={`Enter height in ${unit === 'metric' ? 'centimeters' : 'inches'}`}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={calculateBMI}
                className="w-full"
                disabled={!weight || !height}
              >
                Calculate BMI
              </Button>
            </div>

            {bmi !== null && (
              <div className="space-y-4">
                <Alert className={`${getBmiCategory(bmi).color}`}>
                  <div className="text-lg font-semibold">BMI: {bmi}</div>
                  <div>{getBmiCategory(bmi).text}</div>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>BMI Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center text-blue-600">
                <span className="w-32">Under 18.5:</span>
                <span>Underweight</span>
              </li>
              <li className="flex items-center text-green-600">
                <span className="w-32">18.5 - 24.9:</span>
                <span>Normal weight</span>
              </li>
              <li className="flex items-center text-yellow-600">
                <span className="w-32">25.0 - 29.9:</span>
                <span>Overweight</span>
              </li>
              <li className="flex items-center text-red-600">
                <span className="w-32">30.0 or higher:</span>
                <span>Obese</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BmiCalculator;