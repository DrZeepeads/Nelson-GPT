import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface ApgarCriteria {
  name: string;
  scores: {
    score: number;
    description: string;
  }[];
}

const ApgarCalculator = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<{ [key: string]: number }>({
    appearance: 0,
    pulse: 0,
    grimace: 0,
    activity: 0,
    respiration: 0,
  });

  const criteria: ApgarCriteria[] = [
    {
      name: "Appearance (Skin Color)",
      scores: [
        { score: 0, description: "Blue/Pale" },
        { score: 1, description: "Blue extremities" },
        { score: 2, description: "Completely pink" },
      ],
    },
    {
      name: "Pulse (Heart Rate)",
      scores: [
        { score: 0, description: "Absent" },
        { score: 1, description: "< 100 bpm" },
        { score: 2, description: "> 100 bpm" },
      ],
    },
    {
      name: "Grimace (Reflex Response)",
      scores: [
        { score: 0, description: "No response" },
        { score: 1, description: "Grimace" },
        { score: 2, description: "Cry or active withdrawal" },
      ],
    },
    {
      name: "Activity (Muscle Tone)",
      scores: [
        { score: 0, description: "Limp" },
        { score: 1, description: "Some flexion" },
        { score: 2, description: "Active movement" },
      ],
    },
    {
      name: "Respiration",
      scores: [
        { score: 0, description: "Absent" },
        { score: 1, description: "Weak/irregular" },
        { score: 2, description: "Strong cry" },
      ],
    },
  ];

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const getScoreInterpretation = (score: number) => {
    if (score >= 7) return { text: "Normal", color: "text-green-600" };
    if (score >= 4) return { text: "Moderately abnormal", color: "text-yellow-600" };
    return { text: "Critically low", color: "text-red-600" };
  };

  const interpretation = getScoreInterpretation(totalScore);

  return (
    <div className="min-h-screen bg-gray-50 pt-14 pb-20">
      {/* Header */}
      <div className="px-4 py-2 bg-white shadow-sm flex items-center fixed top-0 w-full z-10">
        <button 
          onClick={() => navigate('/tools')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold ml-2">APGAR Score Calculator</h1>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Total Score: {totalScore}</h2>
            <p className={`text-lg font-medium ${interpretation.color}`}>
              {interpretation.text}
            </p>
          </div>

          <div className="space-y-6">
            {criteria.map((criterion) => (
              <div key={criterion.name} className="border-b pb-4 last:border-0">
                <h3 className="font-semibold mb-3">{criterion.name}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {criterion.scores.map((option) => (
                    <button
                      key={option.score}
                      onClick={() => setScores({
                        ...scores,
                        [criterion.name.split(' ')[0].toLowerCase()]: option.score,
                      })}
                      className={`p-3 rounded-lg text-sm transition-colors ${
                        scores[criterion.name.split(' ')[0].toLowerCase()] === option.score
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-medium mb-1">{option.score}</div>
                      <div className="text-xs">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-3">Score Interpretation</h3>
          <ul className="space-y-2">
            <li className="flex items-center text-green-600">
              <span className="w-24">7-10:</span>
              <span>Normal</span>
            </li>
            <li className="flex items-center text-yellow-600">
              <span className="w-24">4-6:</span>
              <span>Moderately abnormal</span>
            </li>
            <li className="flex items-center text-red-600">
              <span className="w-24">0-3:</span>
              <span>Critically low</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default ApgarCalculator;