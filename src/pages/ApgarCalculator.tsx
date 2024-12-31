import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

interface ApgarCriterion {
  name: string;
  scores: {
    score: number;
    description: string;
    color: string;
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

  const criteria: ApgarCriterion[] = [
    {
      name: "Appearance (Skin Color)",
      scores: [
        { score: 0, description: "Blue/Pale", color: "bg-blue-100 hover:bg-blue-200" },
        { score: 1, description: "Body pink, extremities blue", color: "bg-purple-100 hover:bg-purple-200" },
        { score: 2, description: "Completely pink", color: "bg-pink-100 hover:bg-pink-200" },
      ],
    },
    {
      name: "Pulse (Heart Rate)",
      scores: [
        { score: 0, description: "Absent", color: "bg-red-100 hover:bg-red-200" },
        { score: 1, description: "< 100 bpm", color: "bg-orange-100 hover:bg-orange-200" },
        { score: 2, description: "> 100 bpm", color: "bg-green-100 hover:bg-green-200" },
      ],
    },
    {
      name: "Grimace (Reflex Response)",
      scores: [
        { score: 0, description: "No response", color: "bg-gray-100 hover:bg-gray-200" },
        { score: 1, description: "Grimace", color: "bg-yellow-100 hover:bg-yellow-200" },
        { score: 2, description: "Cry or active withdrawal", color: "bg-emerald-100 hover:bg-emerald-200" },
      ],
    },
    {
      name: "Activity (Muscle Tone)",
      scores: [
        { score: 0, description: "Limp", color: "bg-slate-100 hover:bg-slate-200" },
        { score: 1, description: "Some flexion", color: "bg-cyan-100 hover:bg-cyan-200" },
        { score: 2, description: "Active movement", color: "bg-teal-100 hover:bg-teal-200" },
      ],
    },
    {
      name: "Respiration",
      scores: [
        { score: 0, description: "Absent", color: "bg-rose-100 hover:bg-rose-200" },
        { score: 1, description: "Weak/irregular", color: "bg-amber-100 hover:bg-amber-200" },
        { score: 2, description: "Strong cry", color: "bg-lime-100 hover:bg-lime-200" },
      ],
    },
  ];

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const getScoreInterpretation = (score: number) => {
    if (score >= 7) return { text: "Normal", color: "bg-green-100 border-green-200 text-green-800" };
    if (score >= 4) return { text: "Moderately abnormal", color: "bg-yellow-100 border-yellow-200 text-yellow-800" };
    return { text: "Critically low", color: "bg-red-100 border-red-200 text-red-800" };
  };

  const interpretation = getScoreInterpretation(totalScore);

  return (
    <div className="min-h-screen bg-gray-50 pt-14 pb-20">
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
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Total Score: {totalScore}</CardTitle>
            <CardDescription className="text-center">
              <Alert className={`mt-2 ${interpretation.color}`}>
                {interpretation.text}
              </Alert>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {criteria.map((criterion) => (
              <div key={criterion.name} className="border-b pb-4 last:border-0">
                <h3 className="font-semibold mb-3">{criterion.name}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {criterion.scores.map((option) => (
                    <Button
                      key={option.score}
                      onClick={() => setScores({
                        ...scores,
                        [criterion.name.split(' ')[0].toLowerCase()]: option.score,
                      })}
                      variant="ghost"
                      className={`p-3 h-auto flex flex-col items-center justify-center text-center transition-colors ${
                        scores[criterion.name.split(' ')[0].toLowerCase()] === option.score
                          ? `${option.color} font-medium`
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-medium mb-1">{option.score}</div>
                      <div className="text-xs">{option.description}</div>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Score Interpretation</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApgarCalculator;