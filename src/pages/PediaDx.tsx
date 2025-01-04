import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

interface Diagnosis {
  condition: string;
  keyFeatures: string[];
  nextSteps: string[];
  explanation: string;
  isRedFlag?: boolean;
}

const PediaDx = () => {
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [history, setHistory] = useState("");
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-diagnosis', {
        body: {
          age,
          gender,
          symptoms,
          history
        }
      });

      if (error) throw error;
      setDiagnoses(data.diagnoses);
    } catch (error) {
      console.error('Error generating diagnosis:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-14 pb-20">
      {/* Header */}
      <div className="px-4 py-2 bg-white/80 backdrop-blur-lg shadow-sm flex items-center fixed top-0 w-full z-10">
        <button 
          onClick={() => navigate('/tools')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold ml-2">PediaDx Assistant</h1>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  placeholder="e.g., 5 years"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="symptoms">Signs & Symptoms</Label>
              <Textarea
                id="symptoms"
                placeholder="Enter the patient's signs and symptoms..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="h-32"
              />
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="history">Relevant History</Label>
              <Textarea
                id="history"
                placeholder="Enter any relevant medical history, recent infections, vaccinations..."
                value={history}
                onChange={(e) => setHistory(e.target.value)}
                className="h-24"
              />
            </div>

            <Button 
              type="submit" 
              className="mt-6 w-full"
              disabled={isLoading}
            >
              {isLoading ? "Analyzing..." : "Generate Differential Diagnosis"}
            </Button>
          </Card>
        </form>

        {diagnoses.length > 0 && (
          <div className="mt-8 space-y-6">
            {diagnoses.map((diagnosis, index) => (
              <Card key={index} className={`p-6 ${diagnosis.isRedFlag ? 'border-red-500 border-2' : ''}`}>
                {diagnosis.isRedFlag && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Medical Emergency</AlertTitle>
                    <AlertDescription>
                      This condition requires immediate medical attention.
                    </AlertDescription>
                  </Alert>
                )}
                
                <h3 className="text-xl font-semibold mb-4">
                  {index + 1}. {diagnosis.condition}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Key Features:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {diagnosis.keyFeatures.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Next Steps:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {diagnosis.nextSteps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Explanation:</h4>
                    <p className="text-gray-600">{diagnosis.explanation}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PediaDx;