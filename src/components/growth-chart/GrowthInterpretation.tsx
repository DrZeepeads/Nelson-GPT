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

  const getNormalRange = (age: number, type: 'height' | 'weight' | 'head') => {
    switch (type) {
      case 'height':
        const meanHeight = age * 6 + 50;
        return {
          min: (meanHeight - 10).toFixed(1),
          max: (meanHeight + 10).toFixed(1),
          unit: 'cm'
        };
      case 'weight':
        const meanWeight = age * 0.5 + 3.5;
        return {
          min: (meanWeight - 1).toFixed(1),
          max: (meanWeight + 1).toFixed(1),
          unit: 'kg'
        };
      case 'head':
        const meanHead = age * 0.5 + 35;
        return {
          min: (meanHead - 2).toFixed(1),
          max: (meanHead + 2).toFixed(1),
          unit: 'cm'
        };
    }
  };

  const interpretHeight = (height: number, age: number) => {
    const meanHeight = age * 6 + 50;
    const deviation = height - meanHeight;
    const range = getNormalRange(age, 'height');
    
    if (deviation < -15) return { 
      status: "destructive", 
      message: "Severe stunting detected. Height is significantly below expected range.",
      range
    };
    if (deviation < -10) return { 
      status: "warning", 
      message: "Mild stunting detected. Height is below expected range.",
      range
    };
    if (deviation > 15) return { 
      status: "warning", 
      message: "Height is above expected range.",
      range
    };
    return { 
      status: "default", 
      message: "Height is within normal range.",
      range
    };
  };

  const interpretWeight = (weight: number, age: number) => {
    const meanWeight = age * 0.5 + 3.5;
    const deviation = weight - meanWeight;
    const range = getNormalRange(age, 'weight');
    
    if (deviation < -2) return { 
      status: "destructive", 
      message: "Severe underweight detected. Weight is significantly below expected range.",
      range
    };
    if (deviation < -1) return { 
      status: "warning", 
      message: "Underweight detected. Weight is below expected range.",
      range
    };
    if (deviation > 2) return { 
      status: "warning", 
      message: "Weight is above expected range.",
      range
    };
    return { 
      status: "default", 
      message: "Weight is within normal range.",
      range
    };
  };

  const interpretHead = (head: number, age: number) => {
    const meanHead = age * 0.5 + 35;
    const deviation = head - meanHead;
    const range = getNormalRange(age, 'head');
    
    if (deviation < -2) return { 
      status: "destructive", 
      message: "Microcephaly detected. Head circumference is significantly below expected range.",
      range
    };
    if (deviation > 2) return { 
      status: "warning", 
      message: "Macrocephaly detected. Head circumference is above expected range.",
      range
    };
    return { 
      status: "default", 
      message: "Head circumference is within normal range.",
      range
    };
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
          : { 
              status: "default", 
              message: "No head circumference data available.",
              range: getNormalRange(latestMeasurement.age, 'head')
            };
      default:
        return { 
          status: "default", 
          message: "Select a measurement type to see interpretation.",
          range: null
        };
    }
  };

  const interpretation = getInterpretation();

  return (
    <div className="mt-4">
      <Alert variant={interpretation.status as "default" | "destructive" | "warning"}>
        <p className="text-sm">
          {interpretation.message}
        </p>
        {interpretation.range && (
          <p className="text-xs mt-1 text-muted-foreground">
            Normal range at {latestMeasurement.age} months: {interpretation.range.min} - {interpretation.range.max} {interpretation.range.unit}
          </p>
        )}
        <p className="text-xs mt-1 text-muted-foreground">
          Based on latest measurement at {latestMeasurement.age} months
        </p>
      </Alert>
    </div>
  );
};