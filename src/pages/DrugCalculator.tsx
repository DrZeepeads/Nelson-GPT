import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DrugInformation } from "@/components/drug-calculator/DrugInformation";
import { DrugSelector } from "@/components/drug-calculator/DrugSelector";
import { CategorySelector } from "@/components/drug-calculator/CategorySelector";
import { Drug } from "@/data/drugData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { DrugCategory } from "@/components/drug-calculator/CategorySelector";
import { PatientInfoForm } from "@/components/drug-calculator/PatientInfoForm";

const DrugCalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDrug, setSelectedDrug] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [category, setCategory] = useState<DrugCategory>("nutrition");
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDrugs = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('drugs')
          .select('*')
          .eq('category', category);
        
        if (error) {
          throw error;
        }
        
        setDrugs(data || []);
        setSelectedDrug("");
      } catch (error) {
        console.error('Error fetching drugs:', error);
        toast({
          title: "Error",
          description: "Failed to load medications. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrugs();
  }, [category, toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 bg-white border-b z-10">
        <div className="container mx-auto px-4 h-14 flex items-center">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold ml-2">Drug Calculator</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Category</h2>
            <CategorySelector 
              category={category} 
              onCategoryChange={setCategory} 
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Patient Information</h2>
            <PatientInfoForm
              weight={weight}
              age={age}
              onWeightChange={setWeight}
              onAgeChange={setAge}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Select Medication</h2>
            {isLoading ? (
              <div className="text-center text-gray-500">Loading medications...</div>
            ) : (
              <DrugSelector
                selectedDrug={selectedDrug}
                onDrugChange={setSelectedDrug}
                drugs={drugs}
              />
            )}
          </div>

          {selectedDrug && weight && age && (
            <DrugInformation
              selectedDrug={selectedDrug}
              weight={weight}
              age={age}
              drugs={drugs}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DrugCalculator;