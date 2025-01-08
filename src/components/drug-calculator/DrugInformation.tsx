import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drug } from "@/data/drugData";
import { useState } from "react";
import { ToxicityAlert } from "./ToxicityAlert";
import { WarningsDisplay } from "./WarningsDisplay";
import { ClinicalNotes } from "./ClinicalNotes";

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

    const calculatedDose = (parseFloat(weight) * drug.dose_per_kg).toFixed(2);
    const standardDose = `${drug.dose_per_kg} mg/kg ${drug.frequency || ''}`;
    
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

    // Maximum dose check
    if (drug.max_dose && parseFloat(calculatedDose) > drug.max_dose) {
      warnings.push(`Calculated dose exceeds maximum dose of ${drug.max_dose}mg`);
      toxicityRisk = "high";
    }

    // Add route information
    if (drug.route) {
      clinicalNotes.push(`Administration route: ${drug.route}`);
    }

    // Add side effects information
    if (drug.side_effects) {
      clinicalNotes.push(`Potential side effects: ${drug.side_effects}`);
    }

    setCalculationResult({
      doseInfo: `${calculatedDose} mg${drug.frequency ? ` ${drug.frequency}` : ''}`,
      standardDose,
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

          <ToxicityAlert risk={calculationResult.toxicityRisk} />
          
          <WarningsDisplay warnings={calculationResult.warnings} />
          
          <ClinicalNotes notes={calculationResult.clinicalNotes} />
        </Card>
      )}
    </div>
  );
};