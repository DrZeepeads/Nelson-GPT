import { Line } from "recharts";

interface PatientDataLineProps {
  data: any[];
  activeChart: 'height' | 'weight' | 'head';
  lineColor: string;
}

export const PatientDataLine = ({ data, activeChart, lineColor }: PatientDataLineProps) => {
  const getDataKey = () => {
    switch (activeChart) {
      case 'height':
        return { key: 'height', name: 'Height (cm)' };
      case 'weight':
        return { key: 'weight', name: 'Weight (kg)' };
      case 'head':
        return { key: 'head', name: 'Head Circ. (cm)' };
    }
  };

  const { key, name } = getDataKey();

  return (
    <Line 
      data={data}
      type="monotone" 
      dataKey={key} 
      stroke={lineColor} 
      strokeWidth={3}
      dot={{ fill: lineColor, strokeWidth: 2, r: 4 }}
      activeDot={{ r: 6, strokeWidth: 2 }}
      name={name}
      connectNulls
    />
  );
};