import { ChatMessage } from "../ChatMessage";
import { LoadingIndicator } from "../chat/LoadingIndicator";

interface PediaDxResponseProps {
  response: string | null;
  isLoading: boolean;
}

export const PediaDxResponse = ({ response, isLoading }: PediaDxResponseProps) => {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!response) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-nelson-primary mb-4">AI-Generated Differential Diagnoses</h3>
      <ChatMessage
        message={response}
        isBot={true}
        timestamp={new Date().toISOString()}
      />
    </div>
  );
};