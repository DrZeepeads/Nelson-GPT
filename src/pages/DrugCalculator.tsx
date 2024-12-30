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

const DrugCalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [selectedDrug, setSelectedDrug] = useState("");

  // Initial basic drug list - we'll expand this based on your system-wise list
  const drugs = [
    {
      name: "Paracetamol",
      dosage: "15mg/kg",
      maxDose: "1000mg",
      frequency: "Every 4-6 hours",
    },
    {
      name: "Ibuprofen",
      dosage: "10mg/kg",
      maxDose: "400mg",
      frequency: "Every 6-8 hours",
    },
  ];

  const calculateDose = () => {
    if (!weight || !selectedDrug) {
      toast({
        title: "Missing Information",
        description: "Please enter weight and select a drug",
        variant: "destructive",
      });
      return;
    }

    const drug = drugs.find((d) => d.name === selectedDrug);
    if (!drug) return;

    const dosage = parseFloat(drug.dosage) * parseFloat(weight);
    const maxDose = parseFloat(drug.maxDose);

    const finalDose = Math.min(dosage, maxDose);

    toast({
      title: "Calculated Dose",
      description: `${drug.name}: ${finalDose}mg ${drug.frequency}`,
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
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kg"
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
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="drug">Select Drug</Label>
            <Select onValueChange={setSelectedDrug} value={selectedDrug}>
              <SelectTrigger>
                <SelectValue placeholder="Select a drug" />
              </SelectTrigger>
              <SelectContent>
                {drugs.map((drug) => (
                  <SelectItem key={drug.name} value={drug.name}>
                    {drug.name}
                  </SelectItem>
                ))}
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