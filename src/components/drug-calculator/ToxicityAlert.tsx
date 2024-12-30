import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface ToxicityAlertProps {
  risk: "low" | "medium" | "high";
}

export const ToxicityAlert = ({ risk }: ToxicityAlertProps) => {
  return (
    <div>
      <h4 className="font-semibold flex items-center gap-2">
        Toxicity Risk
        <InfoIcon className="w-4 h-4" />
      </h4>
      <Alert
        variant={
          risk === "high" ? "destructive" :
          risk === "medium" ? "warning" : "default"
        }
      >
        <AlertDescription>
          {risk === "high" ? "High risk - careful monitoring required" :
           risk === "medium" ? "Medium risk - regular monitoring advised" :
           "Low risk - standard monitoring"}
        </AlertDescription>
      </Alert>
    </div>
  );
};