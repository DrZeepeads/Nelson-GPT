import { Card } from '../ui/card';

export const TelegramConnect = () => {
  return (
    <Card className="p-4 bg-white rounded-lg shadow-sm border space-y-6">
      <h3 className="text-lg font-semibold mb-4">Telegram Integration</h3>
      <p className="text-sm text-gray-600">
        Telegram integration is temporarily disabled.
      </p>
    </Card>
  );
};