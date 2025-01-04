import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PediaDxFormProps {
  onSubmit: (data: {
    symptoms: string;
    age: string;
    history: string;
  }) => void;
}

export const PediaDxForm = ({ onSubmit }: PediaDxFormProps) => {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [history, setHistory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      symptoms,
      age,
      history,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="symptoms">Symptoms</Label>
        <Textarea
          id="symptoms"
          placeholder="Enter primary symptoms..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="min-h-[100px]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Patient Age</Label>
        <Input
          id="age"
          type="text"
          placeholder="e.g., 8 years"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="history">Relevant History</Label>
        <Textarea
          id="history"
          placeholder="Enter relevant medical history..."
          value={history}
          onChange={(e) => setHistory(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <Button type="submit" className="w-full bg-nelson-primary hover:bg-nelson-primary/90">
        Generate Differential Diagnoses
      </Button>
    </form>
  );
};