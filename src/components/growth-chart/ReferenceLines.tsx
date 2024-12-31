import { Line } from "recharts";

interface ReferenceLinesProps {
  referenceData: {
    age: number;
    SD3neg: number;
    SD2neg: number;
    SD0: number;
    SD2: number;
    SD3: number;
  }[];
}

export const ReferenceLines = ({ referenceData }: ReferenceLinesProps) => {
  return (
    <>
      <Line 
        data={referenceData}
        type="monotone" 
        dataKey="SD3" 
        stroke="#e2e8f0"
        strokeDasharray="3 3"
        dot={false}
        name="+3 SD"
      />
      <Line 
        data={referenceData}
        type="monotone" 
        dataKey="SD2" 
        stroke="#e2e8f0"
        strokeDasharray="3 3"
        dot={false}
        name="+2 SD"
      />
      <Line 
        data={referenceData}
        type="monotone" 
        dataKey="SD0" 
        stroke="#94a3b8"
        strokeDasharray="3 3"
        dot={false}
        name="Median"
      />
      <Line 
        data={referenceData}
        type="monotone" 
        dataKey="SD2neg" 
        stroke="#e2e8f0"
        strokeDasharray="3 3"
        dot={false}
        name="-2 SD"
      />
      <Line 
        data={referenceData}
        type="monotone" 
        dataKey="SD3neg" 
        stroke="#e2e8f0"
        strokeDasharray="3 3"
        dot={false}
        name="-3 SD"
      />
    </>
  );
};