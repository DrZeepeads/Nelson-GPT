import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DrugSelector } from "@/components/drug-calculator/DrugSelector";
import { PatientInfoForm } from "@/components/drug-calculator/PatientInfoForm";
import { DrugInformation } from "@/components/drug-calculator/DrugInformation";
import { CategorySelector } from "@/components/drug-calculator/CategorySelector";
import { Drug } from "@/data/drugData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { DrugCategory } from "@/components/drug-calculator/CategorySelector";

const DrugCalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDrug, setSelectedDrug] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [category, setCategory] = useState<DrugCategory>("nutrition");
  const [drugs, setDrugs] = useState<Drug[]>([]);

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const { data, error } = await supabase
          .from('drugs')
          .select('*')
          .eq('category', category);
        
        if (error) throw error;
        setDrugs(data || []);
      } catch (error) {
        console.error('Error fetching drugs:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load medications. Please try again.",
        });
      }
    };

    fetchDrugs();
  }, [category, toast]);

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="flex items-center h-14 px-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold ml-2 text-emerald-500">Pediatric Drug Calculator</h1>
        </div>
      </div>

      <div className="pt-20 pb-20 px-4 max-w-xl mx-auto space-y-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Category</h2>
            <CategorySelector 
              category={category}
              onCategoryChange={setCategory}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Weight (kg)</h2>
            <PatientInfoForm
              weight={weight}
              age={age}
              onWeightChange={setWeight}
              onAgeChange={setAge}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Select Medication</h2>
            <DrugSelector
              selectedDrug={selectedDrug}
              onDrugChange={setSelectedDrug}
              drugs={drugs}
            />
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