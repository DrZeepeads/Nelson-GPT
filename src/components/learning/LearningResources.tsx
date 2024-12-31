import { Book, ListCheck, Brain, Stethoscope, Microscope, Beaker } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LearningResources = () => {
  const navigate = useNavigate();

  const resources = [
    {
      icon: Book,
      title: "Study Materials",
      description: "Access comprehensive pediatric learning resources",
      color: "text-nelson-accent",
      route: '/learning/resources'
    },
    {
      icon: ListCheck,
      title: "Practice Questions",
      description: "Test your knowledge with MCQs and case studies",
      color: "text-green-500",
      route: '/learning/quiz'
    },
    {
      icon: Brain,
      title: "Clinical Cases",
      description: "Learn from real pediatric case scenarios",
      color: "text-purple-500",
      route: '/learning/cases'
    },
    {
      icon: Stethoscope,
      title: "Physical Examination",
      description: "Guide to pediatric examination techniques",
      color: "text-red-500",
      route: '/learning/examination'
    },
    {
      icon: Microscope,
      title: "Laboratory Values",
      description: "Reference ranges and interpretation",
      color: "text-blue-500",
      route: '/learning/lab-values'
    },
    {
      icon: Beaker,
      title: "Research Updates",
      description: "Latest pediatric research and guidelines",
      color: "text-amber-500",
      route: '/learning/research'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {resources.map((resource, index) => (
        <button 
          key={index}
          onClick={() => navigate(resource.route)}
          className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-all hover:translate-y-[-2px]"
        >
          <resource.icon className={`w-6 h-6 ${resource.color}`} />
          <div className="ml-3 text-left">
            <h3 className="font-medium">{resource.title}</h3>
            <p className="text-sm text-gray-500">{resource.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};