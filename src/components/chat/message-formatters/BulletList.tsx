import React from 'react';

interface BulletListProps {
  items: string[];
}

export const BulletList = ({ items }: BulletListProps) => {
  return (
    <ul className="space-y-2 my-2 list-disc list-inside">
      {items.map((item, index) => (
        <li key={index} className="text-left">
          {item.replace(/^[0-9]+\.|\-|\*/, '').trim()}
        </li>
      ))}
    </ul>
  );
};