import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CategorySelector, type DrugCategory } from "@/components/drug-calculator/CategorySelector";
import { PatientInfoForm } from "@/components/drug-calculator/PatientInfoForm";
import { DrugSelector } from "@/components/drug-calculator/DrugSelector";
import { DrugInformation } from "@/components/drug-calculator/DrugInformation";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Drug } from "@/data/drugData";
import { useToast } from "@/hooks/use-toast";

const fetchDrugs = async (category: DrugCategory) => {
  console.log('Fetching drugs for category:', category);
  try {
    const { data, error } = await supabase
      .from('drugs')
      .select('*')
      .eq('category', category);
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    if (!data) {
      console.log('No data returned from Supabase');
      return [];
    }
    
    console.log('Fetched drugs:', data);
    return data as Drug[];
  } catch (error) {
    console.error('Error in fetchDrugs:', error);
    throw error;
  }
};

const DrugCalculator = () => {
  const navigate = useNavigate();
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [selectedDrug, setSelectedDrug] = useState("");
  const [category, setCategory] = useState<DrugCategory>("nutrition");
  const { toast } = useToast();

  const { data: drugs = [], isLoading, error } = useQuery({
    queryKey: ['drugs', category],
    queryFn: () => fetchDrugs(category),
    onError: (error) => {
      console.error('Query error:', error);
      toast({
        title: "Error loading drugs",
        description: "There was a problem loading the drug list. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Reset selected drug when category changes
  useEffect(() => {
    setSelectedDrug("");
  }, [category]);

  if (error) {
    console.error('Error in drug calculator:', error);
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-red-600 font-semibold">Error loading drugs data</h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-2 bg-white shadow-sm flex items-center fixed top-0 w-full z-10">
        <button
          onClick={() => navigate("/tools")}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold ml-2">Pediatric Drug Calculator</h1>
      </div>

      <div className="pt-16 p-4 max-w-md mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <CategorySelector 
            category={category} 
            onCategoryChange={(value) => {
              console.log('Category changed to:', value);
              setCategory(value);
              setSelectedDrug("");
            }} 
          />

          <PatientInfoForm
            weight={weight}
            age={age}
            onWeightChange={setWeight}
            onAgeChange={setAge}
          />

          {isLoading ? (
            <div className="text-center py-4">Loading drugs...</div>
          ) : (
            <DrugSelector
              selectedDrug={selectedDrug}
              onDrugChange={setSelectedDrug}
              drugs={drugs}
            />
          )}

          <DrugInformation
            selectedDrug={selectedDrug}
            weight={weight}
            age={age}
            drugs={drugs}
          />
        </div>
      </div>
    </div>
  );
};

export default DrugCalculator;