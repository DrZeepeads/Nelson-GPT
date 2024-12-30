import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface MeasurementFormProps {
  onAddMeasurement: (age: string, height: string, weight: string, head: string) => void;
}

export const MeasurementForm = ({ onAddMeasurement }: MeasurementFormProps) => {
  const { toast } = useToast();
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [head, setHead] = useState('');

  const handleSubmit = () => {
    if (!age || !height || !weight || !head) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    onAddMeasurement(age, height, weight, head);
    setAge('');
    setHeight('');
    setWeight('');
    setHead('');

    toast({
      title: "Measurement Added",
      description: "Your measurement has been recorded successfully.",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
      <div className="space-y-3">
        <div>
          <Label htmlFor="age" className="text-sm font-medium text-gray-700">Age (months)</Label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age in months"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="height" className="text-sm font-medium text-gray-700">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height in cm"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="weight" className="text-sm font-medium text-gray-700">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="head" className="text-sm font-medium text-gray-700">Head Circumference (cm)</Label>
          <Input
            id="head"
            type="number"
            value={head}
            onChange={(e) => setHead(e.target.value)}
            placeholder="Enter head circumference in cm"
            className="mt-1"
          />
        </div>
      </div>
      <Button 
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        Add Measurement
      </Button>
    </div>
  );
};