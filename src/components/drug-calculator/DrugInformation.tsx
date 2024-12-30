import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { calculateDrugDose } from "@/utils/drugCalculations";
import { Drug } from "@/data/drugData";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface DrugInformationProps {
  selectedDrug: string;
  weight: string;
  age: string;
  drugs: Drug[];
}

export const DrugInformation = ({ selectedDrug, weight, age, drugs }: DrugInformationProps) => {
  const [calculationResult, setCalculationResult] = useState<{
    doseInfo: string;
    standardDose: string;
    warnings: string[];
    clinicalNotes: string[];
    toxicityRisk: "low" | "medium" | "high";
  } | null>(null);

  const calculateDose = () => {
    if (!weight || !selectedDrug) {
      setCalculationResult(null);
      return;
    }

    const drug = drugs.find((d) => d.name === selectedDrug);
    if (!drug) return;

    const calculatedDose = calculateDrugDose(weight, drug.dose);
    
    // Generate warnings based on weight, age, and drug
    const warnings: string[] = [];
    const clinicalNotes: string[] = [];
    let toxicityRisk: "low" | "medium" | "high" = "low";

    // Weight-based warnings
    if (parseFloat(weight) < 5) {
      warnings.push("Caution: Very low patient weight - consider consulting specialist");
      toxicityRisk = "high";
    }

    // Age-based adjustments
    const ageInMonths = parseFloat(age);
    if (ageInMonths < 1) {
      warnings.push("Neonatal patient - dose adjustment may be required");
      toxicityRisk = "high";
    } else if (ageInMonths < 6) {
      warnings.push("Young infant - careful dose monitoring recommended");
      toxicityRisk = "medium";
    }

    // Drug-specific warnings
    if (drug.name.toLowerCase().includes("warfarin") || 
        drug.name.toLowerCase().includes("heparin")) {
      warnings.push("Anticoagulant - monitor coagulation parameters closely");
      clinicalNotes.push("Regular PT/INR monitoring required");
      toxicityRisk = "high";
    }

    if (drug.dose.toLowerCase().includes("iv")) {
      warnings.push("Ensure IV administration rate and dilution are appropriate");
      clinicalNotes.push("Check compatibility with other IV medications");
    }

    // Add specific drug class warnings
    if (drug.name.toLowerCase().includes("aminoglycoside")) {
      warnings.push("Monitor renal function and drug levels");
      clinicalNotes.push("Consider therapeutic drug monitoring");
      toxicityRisk = "high";
    }

    if (drug.dose.toLowerCase().includes("kg")) {
      clinicalNotes.push("Regular weight monitoring recommended for dose adjustments");
    }

    setCalculationResult({
      doseInfo: calculatedDose || "Unable to calculate specific dose",
      standardDose: drug.dose,
      warnings,
      clinicalNotes,
      toxicityRisk
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
        <Card className="p-4 space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Calculated Dose</h3>
            <p className="whitespace-pre-line">{calculationResult.doseInfo}</p>
          </div>

          <div>
            <h4 className="font-semibold">Standard Dosing</h4>
            <p>{calculationResult.standardDose}</p>
          </div>

          <div>
            <h4 className="font-semibold flex items-center gap-2">
              Toxicity Risk
              <InfoIcon className="w-4 h-4" />
            </h4>
            <Alert variant={
              calculationResult.toxicityRisk === "high" ? "destructive" :
              calculationResult.toxicityRisk === "medium" ? "warning" : "default"
            }>
              <AlertDescription>
                {calculationResult.toxicityRisk === "high" ? "High risk - careful monitoring required" :
                 calculationResult.toxicityRisk === "medium" ? "Medium risk - regular monitoring advised" :
                 "Low risk - standard monitoring"}
              </AlertDescription>
            </Alert>
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

          {calculationResult.clinicalNotes.length > 0 && (
            <div>
              <h4 className="font-semibold text-blue-600">Clinical Notes</h4>
              <ul className="list-disc pl-5 space-y-1">
                {calculationResult.clinicalNotes.map((note, index) => (
                  <li key={index} className="text-blue-600">
                    {note}
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