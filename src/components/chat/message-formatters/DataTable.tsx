import React from 'react';

interface DataTableProps {
  rows: string[][];
}

export const DataTable = ({ rows }: DataTableProps) => {
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
};