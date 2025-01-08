import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { GrowthChartHeader } from "@/components/growth-chart/Header";
import { MeasurementForm } from "@/components/growth-chart/MeasurementForm";
import { ChartToggle } from "@/components/growth-chart/ChartToggle";
import { GrowthLineChart } from "@/components/growth-chart/GrowthLineChart";
import { GrowthInterpretation } from "@/components/growth-chart/GrowthInterpretation";

interface GrowthData {
  age: number;
  height: number;
  weight: number;
  head: number;
  gender: 'boys' | 'girls';
}

const initialData: GrowthData[] = [
  { age: 0, height: 50, weight: 3.5, head: 35, gender: 'boys' },
  { age: 1, height: 54, weight: 4.3, head: 37, gender: 'boys' },
  { age: 2, height: 58, weight: 5.0, head: 38, gender: 'boys' },
  { age: 3, height: 62, weight: 5.8, head: 39, gender: 'boys' },
  { age: 4, height: 65, weight: 6.5, head: 40, gender: 'boys' },
  { age: 6, height: 70, weight: 7.5, head: 42, gender: 'boys' },
  { age: 8, height: 75, weight: 9.0, head: 44, gender: 'boys' },
  { age: 10, height: 80, weight: 10.0, head: 45, gender: 'boys' },
  { age: 12, height: 82, weight: 10.8, head: 46, gender: 'boys' },
  { age: 15, height: 85, weight: 11.5, head: 47, gender: 'boys' },
  { age: 18, height: 87, weight: 12.0, head: 47.5, gender: 'boys' },
  { age: 24, height: 90, weight: 13.0, head: 48, gender: 'boys' },
];

const GrowthChart = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<GrowthData[]>(initialData);
  const [activeChart, setActiveChart] = useState<'height' | 'weight' | 'head'>('height');

  const handleAddMeasurement = (age: string, height: string, weight: string, head: string, gender: 'boys' | 'girls') => {
    const newMeasurement: GrowthData = {
      age: parseInt(age),
      height: parseFloat(height),
      weight: parseFloat(weight),
      head: parseFloat(head),
      gender,
    };
    setData([...data, newMeasurement]);
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
          <h1 className="text-lg font-semibold ml-2 text-white">Growth Chart</h1>
        </div>
      </div>
      <div className="pt-16 pb-20 px-4 space-y-6 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-[350px,1fr] gap-6">
          <div className="space-y-6">
            <MeasurementForm onAddMeasurement={handleAddMeasurement} />
            <ChartToggle activeChart={activeChart} onToggle={setActiveChart} />
          </div>
          <div className="space-y-6">
            <GrowthLineChart data={data} activeChart={activeChart} />
            <GrowthInterpretation data={data} activeChart={activeChart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthChart;