import { Stethoscope } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-nelson-primary text-white p-4 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center space-x-2">
        <Stethoscope className="w-6 h-6 animate-[spin_3s_linear_infinite]" />
        <h1 className="text-xl font-semibold">Nelson-GPT</h1>
      </div>
    </header>
  );
};