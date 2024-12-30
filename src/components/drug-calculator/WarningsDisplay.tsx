interface WarningsDisplayProps {
  warnings: string[];
}

export const WarningsDisplay = ({ warnings }: WarningsDisplayProps) => {
  if (!warnings?.length) return null;

  return (
    <div>
      <h4 className="font-semibold text-amber-600">Important Warnings</h4>
      <ul className="list-disc pl-5 space-y-1">
        {warnings.map((warning, index) => (
          <li key={index} className="text-amber-600">
            {warning}
          </li>
        ))}
      </ul>
    </div>
  );
};