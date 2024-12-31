import { Line } from "recharts";

interface PatientDataLineProps {
  dataKey: string;
  lineColor: string;
  name: string;
}

export const PatientDataLine = ({ dataKey, lineColor, name }: PatientDataLineProps) => {
  return (
    <Line 
      type="monotone" 
      dataKey={dataKey} 
      stroke={lineColor} 
      strokeWidth={3}
      dot={{ fill: lineColor, strokeWidth: 2, r: 4 }}
      activeDot={{ r: 6, strokeWidth: 2 }}
      name={name}
      connectNulls
    />
  );
};