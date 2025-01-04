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
    try {
      console.log('Searching for conditions with symptoms:', symptoms, 'and age:', age);
      
      const { data, error } = await supabase
        .from('clinical_conditions')
        .select('*')
        .contains('common_symptoms', symptoms)
        .contains('age_groups', [age]);

      if (error) {
        console.error("Error fetching matching conditions:", error);
        return [];
      }

      console.log('Found matching conditions:', data);
      return data || [];
    } catch (error) {
      console.error("Error in findMatchingConditions:", error);
      return [];
    }
  };

  const handleSubmit = async (data: {
    symptoms: string;
    age: string;
    history: string;
  }) => {
    console.log('Form submitted with data:', data);
    
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
      console.log('Processing symptoms array:', symptomsArray);
      
      const matchedConditions = await findMatchingConditions(symptomsArray, data.age);
      setMatchedConditions(matchedConditions);

      // Generate AI response with enhanced prompt
      const prompt = `As a pediatric diagnostic assistant based on the Nelson Textbook of Pediatrics, analyze these symptoms and provide three differential diagnoses:

Patient Information:
- Age: ${data.age}
- Presenting Symptoms: ${data.symptoms}
- Relevant History: ${data.history}

For each differential diagnosis, provide:
1. Name of the condition
2. Key supporting features from the patient's presentation
3. Recommended next steps (diagnostic tests and/or initial treatment)
4. Any red flags or warning signs to watch for

Format your response exactly like this example:

1. [Condition Name]:
   - Supporting Features: [list key findings that support this diagnosis]
   - Next Steps: [specific tests or treatments to consider]
   - Red Flags: [any warning signs to monitor]

2. [Second Condition]:
   [same format as above]

3. [Third Condition]:
   [same format as above]

Important: Prioritize evidence-based recommendations and highlight any urgent actions needed.`;

      console.log('Sending prompt to Mistral API:', prompt);
      const response = await getChatResponse(prompt);
      console.log('Received response from Mistral API:', response);
      
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

      <PediaDxResponse response={response} isLoading={isLoading} />
    </div>
  );
};