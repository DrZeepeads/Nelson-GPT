import React from 'react';
import { Alert } from "@/components/ui/alert";
import { getZScore } from '@/utils/whoZScores';

interface GrowthData {
  age: number;
  height: number;
  weight: number;
  head?: number;
  gender: 'boys' | 'girls';
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

  const interpretZScore = (zScore: number, type: 'height' | 'weight' | 'head') => {
    switch (type) {
      case 'height':
        if (zScore < -3) return {
          status: "destructive",
          message: "Severe stunting detected. Height is significantly below expected range (< -3 SD)."
        };
        if (zScore < -2) return {
          status: "warning",
          message: "Stunting detected. Height is below expected range (< -2 SD)."
        };
        if (zScore > 3) return {
          status: "warning",
          message: "Height is significantly above expected range (> +3 SD)."
        };
        return {
          status: "default",
          message: `Height is within normal range (z-score: ${zScore.toFixed(1)})`
        };
      
      case 'weight':
        if (zScore < -3) return {
          status: "destructive",
          message: "Severe underweight detected. Weight is significantly below expected range (< -3 SD)."
        };
        if (zScore < -2) return {
          status: "warning",
          message: "Underweight detected. Weight is below expected range (< -2 SD)."
        };
        if (zScore > 3) return {
          status: "warning",
          message: "Weight is significantly above expected range (> +3 SD)."
        };
        return {
          status: "default",
          message: `Weight is within normal range (z-score: ${zScore.toFixed(1)})`
        };
      
      case 'head':
        if (zScore < -3) return {
          status: "destructive",
          message: "Severe microcephaly detected. Head circumference is significantly below expected range (< -3 SD)."
        };
        if (zScore < -2) return {
          status: "warning",
          message: "Microcephaly detected. Head circumference is below expected range (< -2 SD)."
        };
        if (zScore > 3) return {
          status: "warning",
          message: "Macrocephaly detected. Head circumference is significantly above expected range (> +3 SD)."
        };
        if (zScore > 2) return {
          status: "warning",
          message: "Large head circumference detected (> +2 SD)."
        };
        return {
          status: "default",
          message: `Head circumference is within normal range (z-score: ${zScore.toFixed(1)})`
        };
    }
  };

  const latestMeasurement = getLatestMeasurement();
  if (!latestMeasurement) return null;

  const getInterpretation = () => {
    const { age, gender } = latestMeasurement;
    let zScore: number;

    switch (activeChart) {
      case 'height':
        zScore = getZScore(latestMeasurement.height, age, 'height', gender);
        return interpretZScore(zScore, 'height');
      case 'weight':
        zScore = getZScore(latestMeasurement.weight, age, 'weight', gender);
        return interpretZScore(zScore, 'weight');
      case 'head':
        if (!latestMeasurement.head) return {
          status: "default",
          message: "No head circumference data available."
        };
        zScore = getZScore(latestMeasurement.head, age, 'head', gender);
        return interpretZScore(zScore, 'head');
      default:
        return {
          status: "default",
          message: "Select a measurement type to see interpretation."
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
        <p className="text-xs mt-1 text-muted-foreground">
          Based on WHO growth standards for {latestMeasurement.gender} at {latestMeasurement.age} months
        </p>
      </Alert>
    </div>
  );
};