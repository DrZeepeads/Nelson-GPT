import React from 'react';
import { Alert } from "@/components/ui/alert";

interface GrowthData {
  age: number;
  height: number;
  weight: number;
  head?: number;
}

interface GrowthInterpretationProps {
  data: GrowthData[];
  activeChart: 'height' | 'weight' | 'head';
}

export const GrowthInterpretation = ({ data, activeChart }: GrowthInterpretationProps) => {
  const getLatestMeasurement = () => {
    if (data.length === 0) return null;
    return data[data.length - 1];
  };

  const interpretHeight = (height: number, age: number) => {
    // Basic height interpretation based on WHO standards (simplified)
    const meanHeight = age * 6 + 50; // Simplified calculation
    const deviation = height - meanHeight;
    
    if (deviation < -15) return { status: "destructive", message: "Severe stunting detected. Height is significantly below expected range." };
    if (deviation < -10) return { status: "warning", message: "Mild stunting detected. Height is below expected range." };
    if (deviation > 15) return { status: "warning", message: "Height is above expected range." };
    return { status: "default", message: "Height is within normal range." };
  };

  const interpretWeight = (weight: number, age: number) => {
    // Basic weight interpretation based on WHO standards (simplified)
    const meanWeight = age * 0.5 + 3.5; // Simplified calculation
    const deviation = weight - meanWeight;
    
    if (deviation < -2) return { status: "destructive", message: "Severe underweight detected. Weight is significantly below expected range." };
    if (deviation < -1) return { status: "warning", message: "Underweight detected. Weight is below expected range." };
    if (deviation > 2) return { status: "warning", message: "Weight is above expected range." };
    return { status: "default", message: "Weight is within normal range." };
  };

  const interpretHead = (head: number, age: number) => {
    // Basic head circumference interpretation based on WHO standards (simplified)
    const meanHead = age * 0.5 + 35; // Simplified calculation
    const deviation = head - meanHead;
    
    if (deviation < -2) return { status: "destructive", message: "Microcephaly detected. Head circumference is significantly below expected range." };
    if (deviation > 2) return { status: "warning", message: "Macrocephaly detected. Head circumference is above expected range." };
    return { status: "default", message: "Head circumference is within normal range." };
  };

  const latestMeasurement = getLatestMeasurement();
  if (!latestMeasurement) return null;

  const getInterpretation = () => {
    switch (activeChart) {
      case 'height':
        return interpretHeight(latestMeasurement.height, latestMeasurement.age);
      case 'weight':
        return interpretWeight(latestMeasurement.weight, latestMeasurement.age);
      case 'head':
        return latestMeasurement.head 
          ? interpretHead(latestMeasurement.head, latestMeasurement.age)
          : { status: "default", message: "No head circumference data available." };
      default:
        return { status: "default", message: "Select a measurement type to see interpretation." };
    }
  };

  const interpretation = getInterpretation();

  return (
    <div className="mt-4">
      <Alert variant={interpretation.status as "default" | "destructive" | "warning"}>
        <p className="text-sm">
          {interpretation.message}
        </p>
        <p className="text-xs mt-1 text-muted-foreground">
          Based on latest measurement at {latestMeasurement.age} months
        </p>
      </Alert>
    </div>
  );
};