import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ConfidenceDisplayProps {
  confidence: number;
}

export const ConfidenceDisplay = ({ confidence }: ConfidenceDisplayProps) => {
  return (
    <div className="mb-2 flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center gap-1">
              <Info className="w-4 h-4 text-nelson-accent" />
              <span className="text-sm text-gray-600">
                Confidence: {(confidence * 100).toFixed(1)}%
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>AI confidence score for this response</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};