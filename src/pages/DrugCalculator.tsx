import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CategorySelector, type DrugCategory } from "@/components/drug-calculator/CategorySelector";
import { PatientInfoForm } from "@/components/drug-calculator/PatientInfoForm";
import { DrugSelector } from "@/components/drug-calculator/DrugSelector";
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
  type Drug,
} from "@/data/drugData";

const DrugCalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [selectedDrug, setSelectedDrug] = useState("");
  const [category, setCategory] = useState<DrugCategory>("nutrition");

  const getDrugsByCategory = (category: DrugCategory): Drug[] => {
    switch (category) {
      case "nutrition":
        return nutritionDrugs;
      case "endocrine":
        return endocrineDrugs;
      case "rheumatic":
        return rheumaticDrugs;
      case "metabolic":
        return metabolicDrugs;
      case "fluid-electrolyte":
        return fluidElectrolyteDrugs;
      case "genetic":
        return geneticDrugs;
      case "skin":
        return skinDrugs;
      case "bones":
        return boneDrugs;
      case "infectious":
        return infectiousDrugs;
      case "emergency":
        return emergencyDrugs;
      case "blood":
        return bloodDrugs;
      default:
        return nutritionDrugs;
    }
  };

  const calculateDose = () => {
    if (!weight || !selectedDrug) {
      toast({
        title: "Missing Information",
        description: "Please enter weight and select a medication",
        variant: "destructive",
      });
      return;
    }

    const drug = getDrugsByCategory(category).find(
      (d) => d.name === selectedDrug
    );
    if (!drug) return;

    let doseInfo = `${drug.name}\n`;
    doseInfo += `Patient weight: ${weight} kg\n`;
    
    if (drug.dose.includes("/kg")) {
      const baseValue = drug.dose.match(/(\d+(-\d+)?)/)?.[0] || "";
      const unit = drug.dose.match(/[a-zA-Z]+\/kg/)?.[0].replace("/kg", "") || "";
      
      if (baseValue.includes("-")) {
        const [min, max] = baseValue.split("-");
        doseInfo += `Calculated dose range:\n`;
        doseInfo += `${(parseFloat(min) * parseFloat(weight)).toFixed(1)} ${unit} - `;
        doseInfo += `${(parseFloat(max) * parseFloat(weight)).toFixed(1)} ${unit}\n`;
      } else {
        const value = parseFloat(baseValue);
        doseInfo += `Calculated dose: ${(value * parseFloat(weight)).toFixed(1)} ${unit}\n`;
      }
    }
    
    doseInfo += `\nStandard dosing: ${drug.dose}`;

    toast({
      title: "Calculated Dose",
      description: doseInfo,
      duration: 5000,
    });
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

          <Button
            onClick={calculateDose}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Calculate Dose
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DrugCalculator;