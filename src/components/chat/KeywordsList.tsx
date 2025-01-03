import { Badge } from "@/components/ui/badge";

interface KeywordsListProps {
  keywords: string[];
}

export const KeywordsList = ({ keywords }: KeywordsListProps) => {
  if (!keywords || keywords.length === 0) return null;
  
  return (
    <div className="mb-2 flex flex-wrap gap-1">
      {keywords.map((keyword, index) => (
        <Badge key={index} variant="secondary" className="text-xs">
          {keyword}
        </Badge>
      ))}
    </div>
  );
};