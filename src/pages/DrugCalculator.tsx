import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CategorySelector, type DrugCategory } from "@/components/drug-calculator/CategorySelector";
import { PatientInfoForm } from "@/components/drug-calculator/PatientInfoForm";
import { DrugSelector } from "@/components/drug-calculator/DrugSelector";
import { DrugInformation } from "@/components/drug-calculator/DrugInformation";
import {
  nutritionDrugs,
  endocrineDrugs,
  rheumaticDrugs,
  metabolicDrugs,
  fluidElectrolyteDrugs,
  geneticDrugs,
  skinDrugs,
  boneDrugs,
  infectiousDrugs,
  emergencyDrugs,
  bloodDrugs,
  urologyDrugs,
  nephrologyDrugs,
  gitDrugs,
  respiratoryDrugs,
  cardiovascularDrugs,
} from "@/data/drugData";

const DrugCalculator = () => {
  const navigate = useNavigate();
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [selectedDrug, setSelectedDrug] = useState("");
  const [category, setCategory] = useState<DrugCategory>("nutrition");

  const getDrugsByCategory = (category: DrugCategory) => {
    switch (category) {
      case "nutrition": return nutritionDrugs;
      case "endocrine": return endocrineDrugs;
      case "rheumatic": return rheumaticDrugs;
      case "metabolic": return metabolicDrugs;
      case "fluid-electrolyte": return fluidElectrolyteDrugs;
      case "genetic": return geneticDrugs;
      case "skin": return skinDrugs;
      case "bones": return boneDrugs;
      case "infectious": return infectiousDrugs;
      case "emergency": return emergencyDrugs;
      case "blood": return bloodDrugs;
      case "urology": return urologyDrugs;
      case "nephrology": return nephrologyDrugs;
      case "git": return gitDrugs;
      case "respiratory": return respiratoryDrugs;
      case "cardiovascular": return cardiovascularDrugs;
      default: return nutritionDrugs;
    }
  };

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

          <DrugSelector
            selectedDrug={selectedDrug}
            onDrugChange={setSelectedDrug}
            drugs={getDrugsByCategory(category)}
          />

          <DrugInformation
            selectedDrug={selectedDrug}
            weight={weight}
            age={age}
            drugs={getDrugsByCategory(category)}
          />
        </div>
      </div>
    </div>
  );
};

export default DrugCalculator;