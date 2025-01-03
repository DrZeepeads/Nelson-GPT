export interface Message {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: string;
  confidence?: number;
  keywords?: string[];
}