import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LabValues = () => {
  const navigate = useNavigate();

  const labCategories = [
    {
      title: "Hematology",
      description: "CBC, coagulation studies, and age-specific ranges",
      values: ["Hemoglobin", "WBC", "Platelets"]
    },
    {
      title: "Chemistry",
      description: "Electrolytes, liver function, and renal function tests",
      values: ["Sodium", "Potassium", "Creatinine"]
    },
    {
      title: "Endocrine",
      description: "Thyroid function, growth hormones, and metabolic markers",
      values: ["TSH", "Growth Hormone", "Cortisol"]
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
        <h1 className="text-lg font-semibold ml-2">Laboratory Values</h1>
      </div>

      <div className="p-4 space-y-4">
        {labCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <h3 className="font-medium text-lg mb-2">{category.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{category.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {category.values.map((value, vIndex) => (
                <span key={vIndex} className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {value}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabValues;