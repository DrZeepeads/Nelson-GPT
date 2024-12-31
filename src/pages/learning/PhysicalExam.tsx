import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PhysicalExam = () => {
  const navigate = useNavigate();

  const examinations = [
    {
      title: "Neurological Examination",
      description: "Comprehensive guide to pediatric neurological examination including reflexes, tone, and developmental assessment",
      category: "System-based",
      key_points: ["Cranial nerves", "Motor function", "Sensory function", "Reflexes"]
    },
    {
      title: "Cardiovascular Examination",
      description: "Systematic approach to heart examination including heart sounds, murmurs, and peripheral pulses",
      category: "System-based",
      key_points: ["Heart sounds", "Murmur assessment", "Peripheral pulses", "Blood pressure"]
    },
    {
      title: "Respiratory Examination",
      description: "Techniques for assessing respiratory status in children of different ages",
      category: "System-based",
      key_points: ["Respiratory rate", "Work of breathing", "Breath sounds", "Chest percussion"]
    },
    {
      title: "Abdominal Examination",
      description: "Guide to examining the pediatric abdomen including liver and spleen assessment",
      category: "System-based",
      key_points: ["Inspection", "Palpation", "Percussion", "Auscultation"]
    },
    {
      title: "Newborn Examination",
      description: "Complete physical examination of the newborn including primitive reflexes",
      category: "Age-based",
      key_points: ["APGAR score", "Primitive reflexes", "Hip examination", "Growth parameters"]
    },
    {
      title: "Musculoskeletal Examination",
      description: "Assessment of joints, gait, and spine in pediatric patients",
      category: "System-based",
      key_points: ["Joint assessment", "Gait analysis", "Spine examination", "Muscle strength"]
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
        <h1 className="text-lg font-semibold ml-2">Physical Examination</h1>
      </div>

      <div className="p-4 space-y-4">
        {examinations.map((exam, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <h3 className="font-medium text-lg mb-2 text-nelson-primary">{exam.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{exam.description}</p>
            <div className="space-y-2">
              <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {exam.category}
              </span>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Key Points:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {exam.key_points.map((point, i) => (
                    <div key={i} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhysicalExam;