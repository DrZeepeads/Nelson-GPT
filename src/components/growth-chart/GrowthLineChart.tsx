import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line
} from "recharts";
import { whoZScores } from "@/utils/whoZScores";

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
  
  // Create a unified dataset that includes both WHO reference data and patient data
  const chartData = Object.keys(whoZScores[gender][activeChart]).map(ageStr => {
    const age = parseInt(ageStr);
    const whoValues = whoZScores[gender][activeChart][age];
    const patientData = data.find(d => d.age === age);
    
    return {
      age,
      SD3: whoValues[6],
      SD2: whoValues[5],
      SD1: whoValues[4],
      SD0: whoValues[3],
      'SD-1': whoValues[2],
      'SD-2': whoValues[1],
      'SD-3': whoValues[0],
      patientValue: patientData ? patientData[activeChart] : null
    };
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
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
              type="number"
              domain={[0, 24]}
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
            
            {/* WHO Reference Lines */}
            <Line 
              type="monotone"
              dataKey="SD3"
              stroke="#e2e8f0"
              strokeDasharray="3 3"
              dot={false}
              name="+3 SD"
              connectNulls
            />
            <Line 
              type="monotone"
              dataKey="SD2"
              stroke="#e2e8f0"
              strokeDasharray="3 3"
              dot={false}
              name="+2 SD"
              connectNulls
            />
            <Line 
              type="monotone"
              dataKey="SD0"
              stroke="#94a3b8"
              strokeDasharray="3 3"
              dot={false}
              name="Median"
              connectNulls
            />
            <Line 
              type="monotone"
              dataKey="SD-2"
              stroke="#e2e8f0"
              strokeDasharray="3 3"
              dot={false}
              name="-2 SD"
              connectNulls
            />
            <Line 
              type="monotone"
              dataKey="SD-3"
              stroke="#e2e8f0"
              strokeDasharray="3 3"
              dot={false}
              name="-3 SD"
              connectNulls
            />

            {/* Patient Data Line */}
            <Line 
              type="monotone"
              dataKey="patientValue"
              stroke={getLineColor()}
              strokeWidth={3}
              dot={{ fill: getLineColor(), strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
              name={getYAxisLabel()}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};