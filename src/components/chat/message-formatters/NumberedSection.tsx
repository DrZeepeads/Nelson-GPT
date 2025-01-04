import React from 'react';

interface NumberedSectionProps {
  heading: string;
  content: string[];
}

export const NumberedSection = ({ heading, content }: NumberedSectionProps) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold text-nelson-primary mb-2">
        {heading.replace(/^\d+\.\s+/, '')}
      </h3>
      {content.length > 0 && (
        <div className="pl-4">
          {content.map((text, index) => (
            <p key={index} className="text-left my-2 leading-relaxed">
              {text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};