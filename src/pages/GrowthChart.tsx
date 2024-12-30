import { useState } from "react";
import { GrowthChartHeader } from "@/components/growth-chart/Header";
import { MeasurementForm } from "@/components/growth-chart/MeasurementForm";
import { ChartToggle } from "@/components/growth-chart/ChartToggle";
import { GrowthLineChart } from "@/components/growth-chart/GrowthLineChart";

const initialData = [
  { age: 0, height: 50, weight: 3.5, head: 35 },
  { age: 2, height: 58, weight: 5.0, head: 38 },
  { age: 4, height: 65, weight: 6.5, head: 40 },
  { age: 6, height: 70, weight: 7.5, head: 42 },
  { age: 8, height: 75, weight: 9.0, head: 44 },
  { age: 10, height: 80, weight: 10.0, head: 45 },
];

const GrowthChart = () => {
  const [data, setData] = useState(initialData);
  const [activeChart, setActiveChart] = useState<'height' | 'weight' | 'head'>('height');

  const handleAddMeasurement = (age: string, height: string, weight: string, head: string) => {
    const newMeasurement = {
      age: parseInt(age),
      height: parseFloat(height),
      weight: parseFloat(weight),
      head: parseFloat(head),
    };
    setData([...data, newMeasurement]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GrowthChartHeader />
      <div className="pt-16 pb-20 px-4 space-y-6 max-w-md mx-auto">
        <MeasurementForm onAddMeasurement={handleAddMeasurement} />
        <ChartToggle activeChart={activeChart} onToggle={setActiveChart} />
        <GrowthLineChart data={data} activeChart={activeChart} />
      </div>
    </div>
  );
};

export default GrowthChart;