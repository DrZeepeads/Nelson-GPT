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
import { useToast } from "@/hooks/use-toast";

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm">
        <div className="flex items-center h-14 px-4">
          <button 
            onClick={() => navigate('/tools')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold ml-2">Growth Chart</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 pb-6 px-4 space-y-6 max-w-md mx-auto">
        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="age" className="text-sm font-medium text-gray-700">Age (months)</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age in months"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="height" className="text-sm font-medium text-gray-700">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height in cm"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="weight" className="text-sm font-medium text-gray-700">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight in kg"
                className="mt-1"
              />
            </div>
          </div>
          <Button 
            onClick={handleAddMeasurement}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Measurement
          </Button>
        </div>

        {/* Chart Toggle */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
          <Button
            variant={activeChart === 'height' ? 'default' : 'ghost'}
            onClick={() => setActiveChart('height')}
            className={`flex-1 ${activeChart === 'height' ? 'bg-white shadow-sm' : ''}`}
          >
            Height Chart
          </Button>
          <Button
            variant={activeChart === 'weight' ? 'default' : 'ghost'}
            onClick={() => setActiveChart('weight')}
            className={`flex-1 ${activeChart === 'weight' ? 'bg-white shadow-sm' : ''}`}
          >
            Weight Chart
          </Button>
        </div>

        {/* Chart */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="age" 
                  label={{ 
                    value: 'Age (months)', 
                    position: 'bottom',
                    style: { fontSize: '12px' }
                  }}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  label={{ 
                    value: activeChart === 'height' ? 'Height (cm)' : 'Weight (kg)', 
                    angle: -90, 
                    position: 'left',
                    style: { fontSize: '12px' }
                  }}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Legend 
                  wrapperStyle={{
                    fontSize: '12px',
                    paddingTop: '10px'
                  }}
                />
                {activeChart === 'height' ? (
                  <Line 
                    type="monotone" 
                    dataKey="height" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                    dot={{ fill: '#2563eb', strokeWidth: 2 }}
                    name="Height (cm)" 
                  />
                ) : (
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#16a34a" 
                    strokeWidth={2}
                    dot={{ fill: '#16a34a', strokeWidth: 2 }}
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