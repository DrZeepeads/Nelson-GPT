import { 
  LineChart, 
  Calculator, 
  ArrowLeft, 
  Baby,
  Scale,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Tools = () => {
  const navigate = useNavigate();

  const mainTools = [
    {
      icon: LineChart,
      title: "Growth Chart",
      description: "Track pediatric growth percentiles and development",
      route: "/growth-chart",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Calculator,
      title: "Drug Calculator",
      description: "Calculate pediatric medication doses safely",
      route: "/drug-calculator",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Baby,
      title: "APGAR Score",
      description: "Calculate and track newborn APGAR scores",
      route: "/apgar-calculator",
      color: "text-pink-500",
      bgColor: "bg-pink-50",
    },
    {
      icon: Scale,
      title: "BMI Calculator",
      description: "Calculate and interpret pediatric BMI",
      route: "/bmi-calculator",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-14 pb-20">
      {/* Header */}
      <div className="px-4 py-2 bg-white shadow-sm flex items-center fixed top-0 w-full z-10">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold ml-2">Clinical Tools</h1>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Main Tools Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 px-1">Essential Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {mainTools.map((tool) => (
              <Card
                key={tool.route}
                className={`p-4 hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer ${tool.bgColor}`}
                onClick={() => navigate(tool.route)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-white/80 ${tool.color}`}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{tool.title}</h3>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tools;