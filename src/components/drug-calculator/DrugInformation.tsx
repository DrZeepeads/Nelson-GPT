import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { calculateDrugDose } from "@/utils/drugCalculations";
import { Drug } from "@/data/drugData";
import { useState } from "react";

interface DrugInformationProps {
  selectedDrug: string;
  weight: string;
  drugs: Drug[];
}

export const DrugInformation = ({ selectedDrug, weight, drugs }: DrugInformationProps) => {
  const [calculationResult, setCalculationResult] = useState<{
    doseInfo: string;
    standardDose: string;
    warnings: string[];
  } | null>(null);

  const calculateDose = () => {
    if (!weight || !selectedDrug) {
      setCalculationResult(null);
      return;
    }

    const drug = drugs.find((d) => d.name === selectedDrug);
    if (!drug) return;

    const calculatedDose = calculateDrugDose(weight, drug.dose);
    
    // Generate warnings based on weight and drug
    const warnings: string[] = [];
    if (parseFloat(weight) < 5) {
      warnings.push("Caution: Very low patient weight - consider consulting specialist");
    }
    if (drug.name.toLowerCase().includes("warfarin") || 
        drug.name.toLowerCase().includes("heparin")) {
      warnings.push("Caution: Anticoagulant - monitor coagulation parameters closely");
    }
    if (drug.dose.toLowerCase().includes("iv")) {
      warnings.push("Ensure IV administration rate and dilution are appropriate");
    }

    setCalculationResult({
      doseInfo: calculatedDose || "Unable to calculate specific dose",
      standardDose: drug.dose,
      warnings
    });
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={calculateDose}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        Calculate Dose
      </Button>

      {calculationResult && (
        <Card className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg mb-2">Calculated Dose</h3>
            <p className="whitespace-pre-line">{calculationResult.doseInfo}</p>
          </div>

          <div>
            <h4 className="font-semibold">Standard Dosing</h4>
            <p>{calculationResult.standardDose}</p>
          </div>

          {calculationResult.warnings.length > 0 && (
            <div>
              <h4 className="font-semibold text-amber-600">Important Warnings</h4>
              <ul className="list-disc pl-5 space-y-1">
                {calculationResult.warnings.map((warning, index) => (
                  <li key={index} className="text-amber-600">
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};