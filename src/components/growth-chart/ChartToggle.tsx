import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChartToggleProps {
  activeChart: 'height' | 'weight' | 'head';
  onToggle: (chart: 'height' | 'weight' | 'head') => void;
}

export const ChartToggle = ({ activeChart, onToggle }: ChartToggleProps) => {
  return (
    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
      <Button
        variant={activeChart === 'height' ? 'default' : 'ghost'}
        onClick={() => onToggle('height')}
        className={cn(
          'flex-1',
          activeChart === 'height' 
            ? 'bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/90' 
            : 'hover:bg-gray-200'
        )}
      >
        Height Chart
      </Button>
      <Button
        variant={activeChart === 'weight' ? 'default' : 'ghost'}
        onClick={() => onToggle('weight')}
        className={cn(
          'flex-1',
          activeChart === 'weight' 
            ? 'bg-[#16A34A] text-white hover:bg-[#16A34A]/90' 
            : 'hover:bg-gray-200'
        )}
      >
        Weight Chart
      </Button>
      <Button
        variant={activeChart === 'head' ? 'default' : 'ghost'}
        onClick={() => onToggle('head')}
        className={cn(
          'flex-1',
          activeChart === 'head' 
            ? 'bg-[#9333EA] text-white hover:bg-[#9333EA]/90' 
            : 'hover:bg-gray-200'
        )}
      >
        Head Circ.
      </Button>
    </div>
  );
};