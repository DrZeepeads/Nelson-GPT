import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CategorySelector } from "@/components/drug-calculator/CategorySelector";
import { DrugSelector } from "@/components/drug-calculator/DrugSelector";
import { PatientInfoForm } from "@/components/drug-calculator/PatientInfoForm";
import { DrugInformation } from "@/components/drug-calculator/DrugInformation";
import { ClinicalNotes } from "@/components/drug-calculator/ClinicalNotes";
import { ToxicityAlert } from "@/components/drug-calculator/ToxicityAlert";
import { WarningsDisplay } from "@/components/drug-calculator/WarningsDisplay";

const DrugCalculator = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDrug, setSelectedDrug] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-nelson-primary">
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
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
        <DrugSelector 
          category={selectedCategory} 
          selectedDrug={selectedDrug} 
          onSelectDrug={setSelectedDrug} 
        />
        {selectedDrug && (
          <>
            <PatientInfoForm 
              weight={weight}
              age={age}
              onWeightChange={setWeight}
              onAgeChange={setAge}
            />
            <DrugInformation drugId={selectedDrug} />
            <ClinicalNotes drugId={selectedDrug} />
            <ToxicityAlert drugId={selectedDrug} />
            <WarningsDisplay drugId={selectedDrug} />
          </>
        )}
      </div>
    </div>
  );
};

export default DrugCalculator;