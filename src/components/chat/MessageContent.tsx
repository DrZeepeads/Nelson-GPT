import { cn } from "@/lib/utils";

interface MessageContentProps {
  content: string;
  isBot: boolean;
}

export const MessageContent = ({ content, isBot }: MessageContentProps) => {
  // Function to extract citations from text and return cleaned text and citations array
  const extractCitations = (text: string) => {
    const citations: string[] = [];
    const cleanedText = text.replace(/\(Chapter [^)]+\)/g, (match) => {
      citations.push(match);
      return '';
    });
    return { cleanedText, citations };
  };

  // Function to format different types of content
  const formatContent = (text: string) => {
    const sections = text.split('\n\n');
    const allCitations: string[] = [];
    
    const formattedSections = sections.map((section, index) => {
      const { cleanedText, citations } = extractCitations(section);
      allCitations.push(...citations);
      
      if (cleanedText.match(/^\d+\.\s+[A-Za-z]/)) {
        const [heading, ...content] = cleanedText.split('\n');
        return (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-bold text-nelson-primary mb-2">
              {heading.replace(/^\d+\.\s+/, '')}
            </h3>
            {content.length > 0 && (
              <div className="pl-4">
                {formatSection(content.join('\n'))}
              </div>
            )}
          </div>
        );
      }
      
      return formatSection(cleanedText);
    });

    return (
      <>
        {formattedSections}
        {allCitations.length > 0 && (
          <div className="mt-4 pt-2 border-t border-gray-200 text-sm text-gray-600">
            <p className="font-medium">References:</p>
            <ul className="list-none space-y-1">
              {[...new Set(allCitations)].map((citation, index) => (
                <li key={index}>{citation}</li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  };

  // Helper function to format individual sections
  const formatSection = (text: string) => {
    if (text.trim().match(/^[0-9]+\.|^\-|\*/)) {
      const items = text.split('\n');
      return (
        <ul className="space-y-2 my-2 list-disc list-inside">
          {items.map((item, index) => (
            <li key={index} className="text-left">
              {item.replace(/^[0-9]+\.|\-|\*/, '').trim()}
            </li>
          ))}
        </ul>
      );
    }

    if (text.toLowerCase().includes('clinical pearl') || text.toLowerCase().includes('important:')) {
      return (
        <div className="bg-blue-50 border-l-4 border-nelson-accent p-4 my-4 text-left">
          {text}
        </div>
      );
    }

    return (
      <p className="text-left my-2 leading-relaxed">
        {text}
      </p>
    );
  };

  return (
    <div className={cn(
      "rounded-lg px-4 py-2 max-w-[85%] shadow-sm",
      isBot ? "bg-white border border-gray-200" : "bg-nelson-accent text-white"
    )}>
      {formatContent(content)}
    </div>
  );
};