import { ChevronLeft, Sun, Moon, Laptop, TextQuote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettings } from "@/stores/useSettings";
import { useEffect } from "react";

const Settings = () => {
  const navigate = useNavigate();
  const settings = useSettings();

  // Apply theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (settings.theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', settings.theme === 'dark');
    }
  }, [settings.theme]);

  // Apply font size changes
  useEffect(() => {
    const root = window.document.documentElement;
    root.style.fontSize = {
      small: '14px',
      medium: '16px',
      large: '18px',
    }[settings.fontSize];
  }, [settings.fontSize]);

  return (
    <div className="container max-w-2xl mx-auto p-4 pt-20 pb-32 space-y-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-bold ml-2">Settings</h2>
      </div>

      <div className="space-y-6">
        {/* Theme Selection */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Theme</h3>
          <RadioGroup
            value={settings.theme}
            onValueChange={(value: 'light' | 'dark' | 'system') => settings.setTheme(value)}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Sun className="w-5 h-5 mr-2" />
              <Label htmlFor="light">Light</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Moon className="w-5 h-5 mr-2" />
              <Label htmlFor="dark">Dark</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="system" />
              <Laptop className="w-5 h-5 mr-2" />
              <Label htmlFor="system">System</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Font Size */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Font Size</h3>
          <RadioGroup
            value={settings.fontSize}
            onValueChange={(value: 'small' | 'medium' | 'large') => settings.setFontSize(value)}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="small" id="small" />
              <Label htmlFor="small">Small</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="large" id="large" />
              <Label htmlFor="large">Large</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold">Notifications</h3>
              <p className="text-gray-500">Enable or disable notifications</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={settings.setNotifications}
            />
          </div>
        </div>

        {/* Chat Bubble Style */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Chat Bubble Style</h3>
          <Select
            value={settings.chatBubbleStyle}
            onValueChange={(value: 'rounded' | 'square') => settings.setChatBubbleStyle(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rounded">Rounded</SelectItem>
              <SelectItem value="square">Square</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Send on Enter */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold">Send on Enter</h3>
              <p className="text-gray-500">Send messages by pressing Enter</p>
            </div>
            <Switch
              checked={settings.sendOnEnter}
              onCheckedChange={settings.setSendOnEnter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;