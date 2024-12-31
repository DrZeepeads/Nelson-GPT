import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ClinicalCases = () => {
  const navigate = useNavigate();

  const cases = [
    {
      title: "Respiratory Distress in Newborn",
      description: "Case study of a 2-day-old presenting with tachypnea",
      difficulty: "Intermediate"
    },
    {
      title: "Febrile Seizure",
      description: "6-month-old with first episode of seizure during fever",
      difficulty: "Beginner"
    },
    {
      title: "Kawasaki Disease",
      description: "Complex case of atypical Kawasaki presentation",
      difficulty: "Advanced"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-14 pb-16">
      <div className="px-4 py-2 bg-white shadow-sm flex items-center">
        <button 
          onClick={() => navigate('/tools')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold ml-2">Clinical Cases</h1>
      </div>

      <div className="p-4 space-y-4">
        {cases.map((caseStudy, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <h3 className="font-medium text-lg mb-2">{caseStudy.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{caseStudy.description}</p>
            <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {caseStudy.difficulty}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicalCases;