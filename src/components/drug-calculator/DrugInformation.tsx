import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { calculateDrugDose } from "@/utils/drugCalculations";
import { Drug } from "@/data/drugData";

interface DrugInformationProps {
  selectedDrug: string;
  weight: string;
  drugs: Drug[];
}

export const DrugInformation = ({ selectedDrug, weight, drugs }: DrugInformationProps) => {
  const { toast } = useToast();

  const calculateDose = () => {
    if (!weight || !selectedDrug) {
      toast({
        title: "Missing Information",
        description: "Please enter weight and select a medication",
        variant: "destructive",
      });
      return;
    }

    const drug = drugs.find((d) => d.name === selectedDrug);
    if (!drug) return;

    let doseInfo = `${drug.name}\n`;
    doseInfo += `Patient weight: ${weight} kg\n`;
    
    const calculatedDose = calculateDrugDose(weight, drug.dose);
    if (calculatedDose) {
      doseInfo += calculatedDose;
    }
    
    doseInfo += `\nStandard dosing: ${drug.dose}`;

    toast({
      title: "Calculated Dose",
      description: doseInfo,
      duration: 5000,
    });
  };

  return (
    <Button
      onClick={calculateDose}
      className="w-full bg-blue-600 hover:bg-blue-700"
    >
      Calculate Dose
    </Button>
  );
};