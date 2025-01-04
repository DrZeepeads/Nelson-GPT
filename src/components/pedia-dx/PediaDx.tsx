import { useState } from "react";
import { PediaDxForm } from "./PediaDxForm";
import { PediaDxResponse } from "./PediaDxResponse";
import { PediaDxAnalysis } from "./PediaDxAnalysis";
import { getChatResponse } from "@/utils/mistralApi";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";

interface MatchedCondition {
  condition_name: string;
  description: string;
  common_symptoms: string[];
  typical_history?: string;
  chapter_reference?: string;
}

export const PediaDx = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [matchedConditions, setMatchedConditions] = useState<MatchedCondition[]>([]);
  const { toast } = useToast();
  const session = useSession();

  const findMatchingConditions = async (symptoms: string[], age: string) => {
    const { data, error } = await supabase
      .from('clinical_conditions')
      .select('*')
      .contains('common_symptoms', symptoms)
      .contains('age_groups', [age]);

    if (error) {
      console.error("Error fetching matching conditions:", error);
      return [];
    }

    return data;
  };

  const handleSubmit = async (data: {
    symptoms: string;
    age: string;
    history: string;
  }) => {
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to use the PediaDx feature.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Find matching conditions from the database
      const symptomsArray = data.symptoms.toLowerCase().split(',').map(s => s.trim());
      const matchedConditions = await findMatchingConditions(symptomsArray, data.age);
      setMatchedConditions(matchedConditions);

      // Generate AI response
      const prompt = `Based on the following patient information from Nelson Textbook of Pediatrics, suggest three possible differential diagnoses. Rank them by likelihood and relevance:

Symptoms: ${data.symptoms}
Patient Age: ${data.age}
Relevant History: ${data.history}

Please structure your response as follows:
1. Most Likely Diagnosis:
   - Clinical reasoning
   - Key findings supporting this diagnosis
   - Recommended next steps

2. Second Most Likely:
   - Clinical reasoning
   - Key findings supporting this diagnosis
   - Recommended next steps

3. Third Most Likely:
   - Clinical reasoning
   - Key findings supporting this diagnosis
   - Recommended next steps

Important Considerations:
- Age-specific variations
- Red flags to watch for
- Recommended initial workup`;

      const response = await getChatResponse(prompt);
      setResponse(response);
    } catch (error) {
      console.error("Error generating differential diagnoses:", error);
      toast({
        title: "Error",
        description: "Failed to generate differential diagnoses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-nelson-primary mb-4">PediaDx Assistant</h2>
        <p className="text-gray-600 mb-6">
          Enter patient information below to generate differential diagnoses based on the Nelson
          Textbook of Pediatrics.
        </p>
        <PediaDxForm onSubmit={handleSubmit} />
      </div>

      <PediaDxAnalysis 
        matchedConditions={matchedConditions}
        isLoading={isLoading}
      />

      <PediaDxResponse response={response} />
    </div>
  );
};