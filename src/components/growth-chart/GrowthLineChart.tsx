import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
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
  const referenceData = Object.entries(whoZScores[gender][activeChart]).map(([age, values]) => ({
    age: Number(age),
    SD3neg: values[0],
    SD2neg: values[1],
    SD0: values[3],
    SD2: values[5],
    SD3: values[6]
  }));

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="age" 
              label={{ 
                value: 'Age (months)', 
                position: 'bottom',
                style: { fontSize: '12px' }
              }}
              tick={{ fontSize: 12 }}
              allowDuplicatedCategory={false}
            />
            <YAxis 
              label={{ 
                value: getYAxisLabel(), 
                angle: -90, 
                position: 'left',
                style: { fontSize: '12px' }
              }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #f0f0f0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Legend 
              wrapperStyle={{
                fontSize: '12px',
                paddingTop: '10px'
              }}
            />
            
            {/* WHO Reference Lines */}
            <Line 
              data={referenceData}
              type="monotone" 
              dataKey="SD3" 
              stroke="#ddd"
              strokeDasharray="3 3"
              dot={false}
              name="+3 SD"
            />
            <Line 
              data={referenceData}
              type="monotone" 
              dataKey="SD2" 
              stroke="#ddd"
              strokeDasharray="3 3"
              dot={false}
              name="+2 SD"
            />
            <Line 
              data={referenceData}
              type="monotone" 
              dataKey="SD0" 
              stroke="#666"
              strokeDasharray="3 3"
              dot={false}
              name="Median"
            />
            <Line 
              data={referenceData}
              type="monotone" 
              dataKey="SD2neg" 
              stroke="#ddd"
              strokeDasharray="3 3"
              dot={false}
              name="-2 SD"
            />
            <Line 
              data={referenceData}
              type="monotone" 
              dataKey="SD3neg" 
              stroke="#ddd"
              strokeDasharray="3 3"
              dot={false}
              name="-3 SD"
            />

            {/* Patient Data */}
            {activeChart === 'height' && (
              <Line 
                data={data}
                type="monotone" 
                dataKey="height" 
                stroke={getLineColor()} 
                strokeWidth={2}
                dot={{ fill: getLineColor(), strokeWidth: 2 }}
                name="Height (cm)" 
              />
            )}
            {activeChart === 'weight' && (
              <Line 
                data={data}
                type="monotone" 
                dataKey="weight" 
                stroke={getLineColor()} 
                strokeWidth={2}
                dot={{ fill: getLineColor(), strokeWidth: 2 }}
                name="Weight (kg)" 
              />
            )}
            {activeChart === 'head' && (
              <Line 
                data={data}
                type="monotone" 
                dataKey="head" 
                stroke={getLineColor()} 
                strokeWidth={2}
                dot={{ fill: getLineColor(), strokeWidth: 2 }}
                name="Head Circ. (cm)" 
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};