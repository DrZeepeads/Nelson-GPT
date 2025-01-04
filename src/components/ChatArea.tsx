import { ChatContainer } from "./chat/ChatContainer";

interface ChatAreaProps {
  onThinkingChange?: (thinking: boolean) => void;
}

export const ChatArea = ({ onThinkingChange }: ChatAreaProps) => {
  return <ChatContainer onThinkingChange={onThinkingChange} />;
};