import React from 'react';

interface DifferentialListProps {
  title: string;
  items: string[];
}

export const DifferentialList = ({ title, items }: DifferentialListProps) => {
  return (
    <div className="mb-4">
      <h4 className="font-semibold mb-2">{title}</h4>
      <ol className="list-decimal list-inside pl-4 space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-left">{item.trim()}</li>
        ))}
      </ol>
    </div>
  );
};