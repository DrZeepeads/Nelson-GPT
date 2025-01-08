import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [ageUnit, setAgeUnit] = useState<"months" | "years">("years");

  useEffect(() => {
    const numericAge = parseFloat(ageValue) || 0;
    const ageInMonths = ageUnit === "years" ? (numericAge * 12).toString() : ageValue;
    onAgeChange(ageInMonths);
  }, [ageValue, ageUnit, onAgeChange]);

  return (
    <div className="space-y-6">
      <Input
        type="number"
        value={weight}
        onChange={(e) => onWeightChange(e.target.value)}
        placeholder="Enter weight"
        className="w-full text-base bg-white border rounded-lg p-4"
      />

      <div className="flex gap-4">
        <Input
          type="number"
          value={ageValue}
          onChange={(e) => setAgeValue(e.target.value)}
          placeholder="Enter age"
          className="flex-1 text-base bg-white border rounded-lg p-4"
        />
        <Select value={ageUnit} onValueChange={(value: "months" | "years") => setAgeUnit(value)}>
          <SelectTrigger className="w-32 text-base bg-white border rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="years">Years</SelectItem>
            <SelectItem value="months">Months</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};