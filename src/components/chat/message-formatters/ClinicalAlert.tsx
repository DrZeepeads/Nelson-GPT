import React from 'react';

interface ClinicalAlertProps {
  content: string;
}

export const ClinicalAlert = ({ content }: ClinicalAlertProps) => {
  return (
    <div className="bg-blue-50 border-l-4 border-nelson-accent p-4 my-4 text-left">
      {content}
    </div>
  );
};