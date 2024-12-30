import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const initialData = [
  { age: 0, height: 50, weight: 3.5 },
  { age: 2, height: 58, weight: 5.0 },
  { age: 4, height: 65, weight: 6.5 },
  { age: 6, height: 70, weight: 7.5 },
  { age: 8, height: 75, weight: 9.0 },
  { age: 10, height: 80, weight: 10.0 },
];

const GrowthChart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [data, setData] = useState(initialData);
  const [activeChart, setActiveChart] = useState<'height' | 'weight'>('height');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleAddMeasurement = () => {
    if (!age || !height || !weight) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const newMeasurement = {
      age: parseInt(age),
      height: parseFloat(height),
      weight: parseFloat(weight),
    };

    setData([...data, newMeasurement]);
    setAge('');
    setHeight('');
    setWeight('');

    toast({
      title: "Measurement Added",
      description: "Your measurement has been recorded successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-14 pb-16">
      <div className="px-4 py-2 bg-white shadow-sm flex items-center">
        <button 
          onClick={() => navigate('/tools')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold ml-2">Growth Chart</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age (months)</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age in months"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height in cm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight in kg"
              />
            </div>
            <Button onClick={handleAddMeasurement}>Add Measurement</Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant={activeChart === 'height' ? 'default' : 'outline'}
            onClick={() => setActiveChart('height')}
            className="flex-1"
          >
            Height Chart
          </Button>
          <Button
            variant={activeChart === 'weight' ? 'default' : 'outline'}
            onClick={() => setActiveChart('weight')}
            className="flex-1"
          >
            Weight Chart
          </Button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="age" 
                  label={{ value: 'Age (months)', position: 'bottom' }} 
                />
                <YAxis 
                  label={{ 
                    value: activeChart === 'height' ? 'Height (cm)' : 'Weight (kg)', 
                    angle: -90, 
                    position: 'left' 
                  }} 
                />
                <Tooltip />
                <Legend />
                {activeChart === 'height' ? (
                  <Line 
                    type="monotone" 
                    dataKey="height" 
                    stroke="#2563eb" 
                    name="Height (cm)" 
                  />
                ) : (
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#16a34a" 
                    name="Weight (kg)" 
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthChart;