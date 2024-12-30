import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Drug {
  name: string;
  dose: string;
}

const nutritionDrugs: Drug[] = [
  { name: "Oral rehydration salts (ORS)", dose: "50-100 mL/kg over 4-6 hours" },
  { name: "Folic acid", dose: "1 mg/day" },
  { name: "Iron sulfate", dose: "3-6 mg/kg/day" },
  { name: "Vitamin D (Cholecalciferol)", dose: "400-1000 IU/day" },
  { name: "Vitamin B12 (Cyanocobalamin)", dose: "1000 mcg IM weekly" },
  { name: "Calcium carbonate", dose: "500-1500 mg/day" },
  { name: "Magnesium sulfate", dose: "1-2 g IV over 1-2 hours" },
  { name: "Zinc sulfate", dose: "10-20 mg/day" },
  { name: "MCT oil", dose: "1-2 g/kg/day" },
  { name: "Glucose solution (Dextrose)", dose: "2-5 mL/kg" },
  { name: "Sodium chloride", dose: "1-2 mL/kg" },
  { name: "L-carnitine", dose: "50-100 mg/kg/day" },
];

const endocrineDrugs: Drug[] = [
  { name: "Levothyroxine", dose: "1.5-2 mcg/kg/day" },
  { name: "Methimazole", dose: "0.2-0.5 mg/kg/day" },
  { name: "Propylthiouracil (PTU)", dose: "10-15 mg/kg/day" },
  { name: "Insulin (Regular)", dose: "0.1-0.2 units/kg/day" },
  { name: "Insulin (Long-acting)", dose: "0.2-0.4 units/kg/day" },
  { name: "Insulin (Rapid-acting)", dose: "0.05-0.1 units/kg/dose" },
  { name: "Glucagon", dose: "0.5-1 mg IV/IM" },
  { name: "Fludrocortisone", dose: "0.05-0.2 mg/day" },
  { name: "Hydrocortisone", dose: "5-10 mg/m²/day" },
  { name: "Desmopressin", dose: "0.1-0.4 mg/day" },
  { name: "Bromocriptine", dose: "2.5-15 mg/day" },
  { name: "Dexamethasone", dose: "0.02-0.1 mg/kg/day" },
  { name: "Somatropin", dose: "0.16-0.33 mg/kg/week" },
  { name: "Vitamin D (Calcitriol)", dose: "0.25-0.5 mcg/day" },
  { name: "Leuprolide", dose: "0.01-0.03 mg/kg/day" },
];

const DrugCalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [selectedDrug, setSelectedDrug] = useState("");
  const [category, setCategory] = useState<"nutrition" | "endocrine">("nutrition");

  const calculateDose = () => {
    if (!weight || !selectedDrug) {
      toast({
        title: "Missing Information",
        description: "Please enter weight and select a medication",
        variant: "destructive",
      });
      return;
    }

    const drug = [...nutritionDrugs, ...endocrineDrugs].find(
      (d) => d.name === selectedDrug
    );
    if (!drug) return;

    let doseInfo = `${drug.name}\n`;
    doseInfo += `Patient weight: ${weight} kg\n`;
    
    // Extract numeric values and units from dose string
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
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={category}
              onValueChange={(value: "nutrition" | "endocrine") =>
                setCategory(value)
              }
            >
              <SelectTrigger className="text-base md:text-sm">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nutrition">Nutrition</SelectItem>
                <SelectItem value="endocrine">Endocrine</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kg"
              className="text-base md:text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age (months)</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age in months"
              className="text-base md:text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="drug">Select Medication</Label>
            <Select onValueChange={setSelectedDrug} value={selectedDrug}>
              <SelectTrigger className="text-base md:text-sm">
                <SelectValue placeholder="Select a medication" />
              </SelectTrigger>
              <SelectContent>
                {(category === "nutrition" ? nutritionDrugs : endocrineDrugs).map(
                  (drug) => (
                    <SelectItem
                      key={drug.name}
                      value={drug.name}
                      className="text-base md:text-sm"
                    >
                      {drug.name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

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