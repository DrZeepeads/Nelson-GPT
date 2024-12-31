import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Research = () => {
  const navigate = useNavigate();

  const updates = [
    {
      title: "Latest Guidelines",
      description: "Recent updates in pediatric practice guidelines",
      date: "2024"
    },
    {
      title: "Clinical Trials",
      description: "Ongoing pediatric research and clinical trials",
      date: "2024"
    },
    {
      title: "Journal Highlights",
      description: "Key publications in pediatric medicine",
      date: "2024"
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
        <h1 className="text-lg font-semibold ml-2">Research Updates</h1>
      </div>

      <div className="p-4 space-y-4">
        {updates.map((update, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <h3 className="font-medium text-lg mb-2">{update.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{update.description}</p>
            <span className="text-xs font-medium px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
              {update.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Research;