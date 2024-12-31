import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Resources = () => {
  const navigate = useNavigate();

  const resources = [
    {
      title: "Pediatric Emergency Medicine",
      description: "Essential guidelines for managing pediatric emergencies",
      link: "#"
    },
    {
      title: "Developmental Pediatrics",
      description: "Growth and developmental milestones from birth to adolescence",
      link: "#"
    },
    {
      title: "Pediatric Pharmacology",
      description: "Drug dosing, interactions, and administration guidelines",
      link: "#"
    },
    {
      title: "Neonatal Care",
      description: "Comprehensive guide to newborn care and common conditions",
      link: "#"
    },
    {
      title: "Pediatric Nutrition",
      description: "Nutritional requirements and feeding guidelines by age",
      link: "#"
    },
    {
      title: "Infectious Diseases",
      description: "Common pediatric infections, diagnosis, and treatment",
      link: "#"
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
        <h1 className="text-lg font-semibold ml-2">Study Materials</h1>
      </div>

      <div className="p-4 space-y-4">
        {resources.map((resource, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-lg mb-2 text-nelson-primary">{resource.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
            <button className="text-nelson-accent hover:text-blue-700 text-sm font-medium flex items-center">
              Access Material →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;