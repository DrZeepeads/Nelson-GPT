import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

const data = [
  { age: 0, p3: 2.9, p50: 3.5, p97: 4.2 },
  { age: 2, p3: 4.0, p50: 5.6, p97: 7.0 },
  { age: 4, p3: 5.6, p50: 7.0, p97: 8.4 },
  { age: 6, p3: 6.7, p50: 8.0, p97: 9.5 },
  { age: 8, p3: 7.5, p50: 9.0, p97: 10.5 },
  { age: 10, p3: 8.2, p50: 9.9, p97: 11.6 },
  { age: 12, p3: 8.8, p50: 10.5, p97: 12.4 },
];

const GrowthChart = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-14 pb-16">
      <div className="px-4 py-2 bg-white shadow-sm flex items-center">
        <button 
          onClick={() => navigate('/tools')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold ml-2">Growth Chart</h1>
      </div>

      <div className="p-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Weight-for-age Percentiles</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="age" 
                  label={{ value: 'Age (months)', position: 'bottom' }} 
                />
                <YAxis 
                  label={{ value: 'Weight (kg)', angle: -90, position: 'left' }} 
                />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="p3" 
                  stroke="#ff7300" 
                  name="3rd percentile" 
                />
                <Line 
                  type="monotone" 
                  dataKey="p50" 
                  stroke="#387908" 
                  name="50th percentile" 
                />
                <Line 
                  type="monotone" 
                  dataKey="p97" 
                  stroke="#38abc8" 
                  name="97th percentile" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthChart;