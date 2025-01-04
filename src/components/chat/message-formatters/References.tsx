import React from 'react';

interface ReferencesProps {
  citations: string[];
}

export const References = ({ citations }: ReferencesProps) => {
  if (citations.length === 0) return null;
  
  return (
    <div className="mt-4 pt-2 border-t border-gray-200 text-sm text-gray-600">
      <p className="font-medium">References:</p>
      <ul className="list-none space-y-1">
        {[...new Set(citations)].map((citation, index) => (
          <li key={index}>{citation}</li>
        ))}
      </ul>
    </div>
  );
};