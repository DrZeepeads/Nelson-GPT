import { Drug } from "@/data/drugData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface DrugSelectorProps {
  selectedDrug: string;
  onDrugChange: (value: string) => void;
  drugs: Drug[];
}

export const DrugSelector = ({
  selectedDrug,
  onDrugChange,
  drugs,
}: DrugSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="drug">Select Medication</Label>
      <Select onValueChange={onDrugChange} value={selectedDrug}>
        <SelectTrigger className="text-base md:text-sm">
          <SelectValue placeholder="Select a medication" />
        </SelectTrigger>
        <SelectContent>
          {drugs.map((drug) => (
            <SelectItem
              key={drug.name}
              value={drug.name}
              className="text-base md:text-sm"
            >
              {drug.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};