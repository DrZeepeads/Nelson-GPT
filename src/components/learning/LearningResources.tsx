import { Book, ListCheck, Brain, Stethoscope, Microscope, Beaker } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const LearningResources = () => {
  const navigate = useNavigate();

  const resources = [
    {
      icon: Book,
      title: "Study Materials",
      description: "Access comprehensive pediatric learning resources",
      details: [
        "Nelson Textbook of Pediatrics summaries",
        "Clinical practice guidelines",
        "Video lectures and demonstrations",
        "Downloadable study guides",
        "Interactive flashcards"
      ],
      color: "text-nelson-accent",
      route: '/learning/resources'
    },
    {
      icon: ListCheck,
      title: "Practice Questions",
      description: "Test your knowledge with MCQs and case studies",
      details: [
        "Board-style multiple choice questions",
        "Image-based assessments",
        "Clinical scenario questions",
        "Progress tracking",
        "Personalized question banks"
      ],
      color: "text-green-500",
      route: '/learning/quiz'
    },
    {
      icon: Brain,
      title: "Clinical Cases",
      description: "Learn from real pediatric case scenarios",
      details: [
        "Interactive case discussions",
        "Step-by-step diagnostic approach",
        "Treatment planning exercises",
        "Follow-up case management",
        "Evidence-based decision making"
      ],
      color: "text-purple-500",
      route: '/learning/cases'
    },
    {
      icon: Stethoscope,
      title: "Physical Examination",
      description: "Guide to pediatric examination techniques",
      details: [
        "System-wise examination guides",
        "Age-specific assessment tips",
        "Normal vs abnormal findings",
        "Developmental assessment",
        "Red flag recognition"
      ],
      color: "text-red-500",
      route: '/learning/examination'
    },
    {
      icon: Microscope,
      title: "Laboratory Values",
      description: "Reference ranges and interpretation",
      details: [
        "Age-specific normal ranges",
        "Common abnormalities",
        "Result interpretation guides",
        "Diagnostic algorithms",
        "Sample collection guidelines"
      ],
      color: "text-blue-500",
      route: '/learning/lab-values'
    },
    {
      icon: Beaker,
      title: "Research Updates",
      description: "Latest pediatric research and guidelines",
      details: [
        "Recent clinical trials",
        "Updated treatment protocols",
        "New diagnostic approaches",
        "Practice-changing studies",
        "Evidence summaries"
      ],
      color: "text-amber-500",
      route: '/learning/research'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {resources.map((resource, index) => (
        <Card 
          key={index}
          className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
          onClick={() => navigate(resource.route)}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gray-50 ${resource.color}`}>
                <resource.icon className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">{resource.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {resource.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {resource.details.map((detail, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  {detail}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};