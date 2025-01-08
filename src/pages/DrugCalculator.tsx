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
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchDrugs();
  }, [category, toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-primary-500">
        <div className="flex items-center h-14 px-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-primary-600 rounded-full transition-colors text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold ml-2 text-white">Drug Calculator</h1>
        </div>
      </div>

      <div className="pt-16 pb-20 px-4 max-w-4xl mx-auto space-y-6">
        <CategorySelector 
          category={category}
          onCategoryChange={setCategory}
        />

        <DrugSelector
          selectedDrug={selectedDrug}
          onDrugChange={setSelectedDrug}
          drugs={drugs}
        />

        {selectedDrug && (
          <>
            <PatientInfoForm
              weight={weight}
              age={age}
              onWeightChange={setWeight}
              onAgeChange={setAge}
            />
            
            <DrugInformation
              selectedDrug={selectedDrug}
              weight={weight}
              age={age}
              drugs={drugs}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DrugCalculator;