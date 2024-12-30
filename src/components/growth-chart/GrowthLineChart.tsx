import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface GrowthData {
  age: number;
  height: number;
  weight: number;
  head?: number;
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

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="age" 
              label={{ 
                value: 'Age (months)', 
                position: 'bottom',
                style: { fontSize: '12px' }
              }}
              tick={{ fontSize: 12 }}
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
            {activeChart === 'height' && (
              <Line 
                type="monotone" 
                dataKey="height" 
                stroke="#0EA5E9" 
                strokeWidth={2}
                dot={{ fill: '#0EA5E9', strokeWidth: 2 }}
                name="Height (cm)" 
              />
            )}
            {activeChart === 'weight' && (
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#16A34A" 
                strokeWidth={2}
                dot={{ fill: '#16A34A', strokeWidth: 2 }}
                name="Weight (kg)" 
              />
            )}
            {activeChart === 'head' && (
              <Line 
                type="monotone" 
                dataKey="head" 
                stroke="#9333EA" 
                strokeWidth={2}
                dot={{ fill: '#9333EA', strokeWidth: 2 }}
                name="Head Circ. (cm)" 
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};