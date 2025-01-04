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
      
      // Handle numbered sections (like "1. Initial Assessment:")
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
      
      // Handle differential diagnoses or ranked lists
      if (cleanedText.includes('Differential Diagnoses:') || cleanedText.includes('Ranked by likelihood:')) {
        const [title, ...items] = cleanedText.split('\n');
        return (
          <div key={index} className="mb-4">
            <h4 className="font-semibold mb-2">{title}</h4>
            <ol className="list-decimal list-inside pl-4 space-y-1">
              {items.map((item, i) => (
                <li key={i} className="text-left">{item.trim()}</li>
              ))}
            </ol>
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
    // Handle bullet points or numbered lists
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

    // Handle clinical pearls, important notes, and red flags
    if (text.toLowerCase().includes('clinical pearl') || 
        text.toLowerCase().includes('important:') ||
        text.toLowerCase().includes('red flag')) {
      return (
        <div className="bg-blue-50 border-l-4 border-nelson-accent p-4 my-4 text-left">
          {text}
        </div>
      );
    }

    // Handle tables (if content contains tab-separated or pipe-separated values)
    if (text.includes('|') || text.includes('\t')) {
      const rows = text.split('\n').map(row => row.split(/\||\t/));
      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {rows[0].map((cell, i) => (
                  <th key={i} className="px-4 py-2 text-left text-sm font-semibold text-gray-900">
                    {cell.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rows.slice(1).map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2 text-sm text-gray-900">
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // Default paragraph formatting
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