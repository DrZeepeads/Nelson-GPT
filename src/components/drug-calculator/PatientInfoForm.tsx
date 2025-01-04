import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { useState, useEffect } from "react";

interface PatientInfoFormProps {
  weight: string;
  age: string;
  onWeightChange: (value: string) => void;
  onAgeChange: (value: string) => void;
}

export const PatientInfoForm = ({
  weight,
  age,
  onWeightChange,
  onAgeChange,
}: PatientInfoFormProps) => {
  const [ageValue, setAgeValue] = useState("");
  const [ageUnit, setAgeUnit] = useState<"months" | "years">("months");

  // Convert age to months when unit changes or age value changes
  useEffect(() => {
    const numericAge = parseFloat(ageValue) || 0;
    const ageInMonths = ageUnit === "years" ? (numericAge * 12).toString() : ageValue;
    onAgeChange(ageInMonths);
  }, [ageValue, ageUnit, onAgeChange]);

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input
          id="weight"
          type="number"
          value={weight}
          onChange={(e) => onWeightChange(e.target.value)}
          placeholder="Enter weight in kg"
          className="text-base md:text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <div className="flex gap-2">
          <Input
            id="age"
            type="number"
            value={ageValue}
            onChange={(e) => setAgeValue(e.target.value)}
            placeholder={`Enter age in ${ageUnit}`}
            className="text-base md:text-sm"
          />
          <select
            value={ageUnit}
            onChange={(e) => setAgeUnit(e.target.value as "months" | "years")}
            className="px-3 py-2 bg-background border border-input rounded-md text-sm"
          >
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
      </div>
    </>
  );
};