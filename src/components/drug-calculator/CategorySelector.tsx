import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export type DrugCategory = 
  | "nutrition"
  | "endocrine"
  | "rheumatic"
  | "metabolic"
  | "fluid-electrolyte"
  | "genetic"
  | "skin"
  | "bones"
  | "infectious"
  | "emergency"
  | "blood"
  | "urology"
  | "nephrology"
  | "git"
  | "respiratory"
  | "cardiovascular";

interface CategorySelectorProps {
  category: DrugCategory;
  onCategoryChange: (category: DrugCategory) => void;
}

export const CategorySelector = ({ category, onCategoryChange }: CategorySelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="category">Category</Label>
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="text-base md:text-sm">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="nutrition">Nutrition</SelectItem>
          <SelectItem value="endocrine">Endocrine</SelectItem>
          <SelectItem value="rheumatic">Rheumatic Diseases</SelectItem>
          <SelectItem value="metabolic">Metabolic Disorders</SelectItem>
          <SelectItem value="fluid-electrolyte">Fluid & Electrolytes</SelectItem>
          <SelectItem value="genetic">Genetics</SelectItem>
          <SelectItem value="skin">Skin</SelectItem>
          <SelectItem value="bones">Bones</SelectItem>
          <SelectItem value="infectious">Infectious Diseases</SelectItem>
          <SelectItem value="emergency">Emergency Drugs</SelectItem>
          <SelectItem value="blood">Blood</SelectItem>
          <SelectItem value="urology">Urology</SelectItem>
          <SelectItem value="nephrology">Nephrology</SelectItem>
          <SelectItem value="git">Gastrointestinal</SelectItem>
          <SelectItem value="respiratory">Respiratory</SelectItem>
          <SelectItem value="cardiovascular">Cardiovascular</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};