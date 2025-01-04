import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface MatchedCondition {
  condition_name: string;
  description: string;
  common_symptoms: string[];
  typical_history?: string;
  chapter_reference?: string;
}

interface PediaDxAnalysisProps {
  matchedConditions: MatchedCondition[];
  isLoading: boolean;
}

export const PediaDxAnalysis = ({ matchedConditions, isLoading }: PediaDxAnalysisProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-nelson-primary rounded-full animate-bounce" />
          <div className="w-3 h-3 bg-nelson-primary rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="w-3 h-3 bg-nelson-primary rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    );
  }

  if (!matchedConditions.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-nelson-primary">Matched Conditions</h3>
      {matchedConditions.map((condition, index) => (
        <Card key={index} className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              {condition.condition_name}
              {condition.typical_history?.toLowerCase().includes("red flag") && (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-gray-600">{condition.description}</p>
            {condition.typical_history && (
              <div>
                <p className="font-medium">Key Features:</p>
                <p className="text-gray-600">{condition.typical_history}</p>
              </div>
            )}
            <div>
              <p className="font-medium">Common Symptoms:</p>
              <ul className="list-disc list-inside text-gray-600">
                {condition.common_symptoms.map((symptom, idx) => (
                  <li key={idx}>{symptom}</li>
                ))}
              </ul>
            </div>
            {condition.chapter_reference && (
              <p className="text-sm text-gray-500">
                Reference: {condition.chapter_reference}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};