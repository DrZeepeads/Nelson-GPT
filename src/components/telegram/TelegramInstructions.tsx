import { ExternalLink } from 'lucide-react';

export const TelegramInstructions = () => {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600">
        Follow these steps to connect your Telegram:
      </p>
      <ol className="list-decimal list-inside space-y-3 text-sm text-gray-600">
        <li className="flex items-start gap-2">
          <span>Open Telegram and start a chat with</span>
          <a
            href="https://t.me/Peadiatric_Bot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            @Peadiatric_Bot
            <ExternalLink className="h-4 w-4" />
          </a>
        </li>
        <li>
          Send the command <code className="bg-gray-100 px-1 rounded">/start</code> to the bot
        </li>
        <li>
          The bot will reply with your Chat ID - copy this number
        </li>
        <li>
          Paste your Chat ID below and click "Test Connection"
        </li>
      </ol>
    </div>
  );
};