import { Loader2, Stethoscope } from "lucide-react";

interface HeaderProps {
  isThinking?: boolean;
}

export const Header = ({ isThinking }: HeaderProps) => {
  return (
    <header className="bg-nelson-primary text-white p-4 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Stethoscope className="w-6 h-6 animate-[spin_3s_linear_infinite]" />
          <h1 className="text-xl font-semibold">Nelson-GPT</h1>
        </div>
        {isThinking && (
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 text-red-500 animate-spin" />
          </div>
        )}
      </div>
    </header>
  );
};