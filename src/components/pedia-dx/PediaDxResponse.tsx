import { ChatMessage } from "../ChatMessage";

interface PediaDxResponseProps {
  response: string | null;
}

export const PediaDxResponse = ({ response }: PediaDxResponseProps) => {
  if (!response) return null;

  return (
    <div className="mt-6">
      <ChatMessage
        message={response}
        isBot={true}
        timestamp={new Date().toISOString()}
      />
    </div>
  );
};