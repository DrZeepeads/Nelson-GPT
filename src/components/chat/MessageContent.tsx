import { cn } from "@/lib/utils";
import { NumberedSection } from "./message-formatters/NumberedSection";
import { DifferentialList } from "./message-formatters/DifferentialList";
import { BulletList } from "./message-formatters/BulletList";
import { ClinicalAlert } from "./message-formatters/ClinicalAlert";
import { DataTable } from "./message-formatters/DataTable";
import { References } from "./message-formatters/References";

interface MessageContentProps {
  content: string;
  isBot: boolean;
}

export const MessageContent = ({ content, isBot }: MessageContentProps) => {
  const extractCitations = (text: string) => {
    const citations: string[] = [];
    const cleanedText = text.replace(/\(Chapter [^)]+\)/g, (match) => {
      citations.push(match);
      return '';
    });
    return { cleanedText, citations };
  };

  const formatContent = (text: string) => {
    const sections = text.split('\n\n');
    const allCitations: string[] = [];
    
    const formattedSections = sections.map((section, index) => {
      const { cleanedText, citations } = extractCitations(section);
      allCitations.push(...citations);
      
      if (cleanedText.match(/^\d+\.\s+[A-Za-z]/)) {
        const [heading, ...content] = cleanedText.split('\n');
        return <NumberedSection key={index} heading={heading} content={content} />;
      }
      
      if (cleanedText.includes('Differential Diagnoses:') || cleanedText.includes('Ranked by likelihood:')) {
        const [title, ...items] = cleanedText.split('\n');
        return <DifferentialList key={index} title={title} items={items} />;
      }
      
      return formatSection(cleanedText, index);
    });

    return (
      <>
        {formattedSections}
        <References citations={allCitations} />
      </>
    );
  };

  const formatSection = (text: string, index: number) => {
    if (text.trim().match(/^[0-9]+\.|^\-|\*/)) {
      const items = text.split('\n');
      return <BulletList key={index} items={items} />;
    }

    if (text.toLowerCase().includes('clinical pearl') || 
        text.toLowerCase().includes('important:') ||
        text.toLowerCase().includes('red flag')) {
      return <ClinicalAlert key={index} content={text} />;
    }

    if (text.includes('|') || text.includes('\t')) {
      const rows = text.split('\n').map(row => row.split(/\||\t/));
      return <DataTable key={index} rows={rows} />;
    }

    return (
      <p key={index} className="text-left my-2 leading-relaxed">
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