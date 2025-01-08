import { Drug } from "@/data/drugData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <Select 
      value={selectedDrug} 
      onValueChange={onDrugChange}
    >
      <SelectTrigger className="w-full text-base bg-white border rounded-lg p-4">
        <SelectValue placeholder="Select medication" />
      </SelectTrigger>
      <SelectContent>
        {drugs && drugs.map((drug) => (
          <SelectItem
            key={drug.id}
            value={drug.name}
            className="text-base"
          >
            {drug.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};