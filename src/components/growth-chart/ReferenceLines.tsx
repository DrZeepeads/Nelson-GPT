import { Line } from "recharts";

interface ReferenceLinesProps {
  data: any[];
}

export const ReferenceLines = ({ data }: ReferenceLinesProps) => {
  return (
    <>
      <Line 
        data={data}
        type="monotone" 
        dataKey="SD3" 
        stroke="#e2e8f0"
        strokeDasharray="3 3"
        dot={false}
        name="+3 SD"
        connectNulls
      />
      <Line 
        data={data}
        type="monotone" 
        dataKey="SD2" 
        stroke="#e2e8f0"
        strokeDasharray="3 3"
        dot={false}
        name="+2 SD"
        connectNulls
      />
      <Line 
        data={data}
        type="monotone" 
        dataKey="SD0" 
        stroke="#94a3b8"
        strokeDasharray="3 3"
        dot={false}
        name="Median"
        connectNulls
      />
      <Line 
        data={data}
        type="monotone" 
        dataKey="SD-2" 
        stroke="#e2e8f0"
        strokeDasharray="3 3"
        dot={false}
        name="-2 SD"
        connectNulls
      />
      <Line 
        data={data}
        type="monotone" 
        dataKey="SD-3" 
        stroke="#e2e8f0"
        strokeDasharray="3 3"
        dot={false}
        name="-3 SD"
        connectNulls
      />
    </>
  );
};