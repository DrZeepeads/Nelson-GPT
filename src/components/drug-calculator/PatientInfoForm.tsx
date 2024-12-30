import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <Label htmlFor="age">Age (months)</Label>
        <Input
          id="age"
          type="number"
          value={age}
          onChange={(e) => onAgeChange(e.target.value)}
          placeholder="Enter age in months"
          className="text-base md:text-sm"
        />
      </div>
    </>
  );
};