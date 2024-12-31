import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { whoZScores } from "@/utils/whoZScores";
import { ReferenceLines } from "./ReferenceLines";
import { PatientDataLine } from "./PatientDataLine";

interface GrowthData {
  age: number;
  height: number;
  weight: number;
  head?: number;
  gender: 'boys' | 'girls';
}

interface GrowthLineChartProps {
  data: GrowthData[];
  activeChart: 'height' | 'weight' | 'head';
}

export const GrowthLineChart = ({ data, activeChart }: GrowthLineChartProps) => {
  const getYAxisLabel = () => {
    switch (activeChart) {
      case 'height':
        return 'Height (cm)';
      case 'weight':
        return 'Weight (kg)';
      case 'head':
        return 'Head Circumference (cm)';
      default:
        return '';
    }
  };

  const getLineColor = () => {
    switch (activeChart) {
      case 'height':
        return '#0EA5E9';
      case 'weight':
        return '#16A34A';
      case 'head':
        return '#9333EA';
      default:
        return '#000000';
    }
  };

  const gender = data[0]?.gender || 'boys';
  const referenceData = Object.entries(whoZScores[gender][activeChart]).map(([age, values]) => ({
    age: Number(age),
    SD3neg: values[0],
    SD2neg: values[1],
    SD0: values[3],
    SD2: values[5],
    SD3: values[6]
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={referenceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="age" 
              label={{ 
                value: 'Age (months)', 
                position: 'bottom',
                style: { fontSize: '12px', fill: '#64748b' }
              }}
              tick={{ fontSize: 12, fill: '#64748b' }}
              stroke="#cbd5e1"
              allowDuplicatedCategory={false}
            />
            <YAxis 
              label={{ 
                value: getYAxisLabel(), 
                angle: -90, 
                position: 'left',
                style: { fontSize: '12px', fill: '#64748b' }
              }}
              tick={{ fontSize: 12, fill: '#64748b' }}
              stroke="#cbd5e1"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
            <Legend 
              wrapperStyle={{
                fontSize: '12px',
                paddingTop: '15px'
              }}
            />
            
            <ReferenceLines referenceData={referenceData} />
            <PatientDataLine 
              data={data} 
              activeChart={activeChart} 
              lineColor={getLineColor()} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};