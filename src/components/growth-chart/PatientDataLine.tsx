import { Line } from "recharts";

interface PatientDataLineProps {
  data: { age: number; value: number }[];
  lineColor: string;
  name: string;
}

export const PatientDataLine = ({ data, lineColor, name }: PatientDataLineProps) => {
  return (
    <Line 
      data={data}
      type="monotone" 
      dataKey="value" 
      stroke={lineColor} 
      strokeWidth={3}
      dot={{ fill: lineColor, strokeWidth: 2, r: 4 }}
      activeDot={{ r: 6, strokeWidth: 2 }}
      name={name}
      connectNulls
    />
  );
};