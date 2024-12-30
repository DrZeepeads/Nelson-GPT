interface ClinicalNotesProps {
  notes: string[];
}

export const ClinicalNotes = ({ notes }: ClinicalNotesProps) => {
  if (!notes?.length) return null;

  return (
    <div>
      <h4 className="font-semibold text-blue-600">Clinical Notes</h4>
      <ul className="list-disc pl-5 space-y-1">
        {notes.map((note, index) => (
          <li key={index} className="text-blue-600">
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
};