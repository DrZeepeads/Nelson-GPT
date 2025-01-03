import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';
import { sendTelegramTestMessage } from '@/utils/telegram';
import { TelegramInstructions } from './TelegramInstructions';
import { useTelegramWebhook } from './TelegramWebhookSetup';

export const TelegramConnect = () => {
  const [chatId, setChatId] = useState('');
  const { isSettingUp } = useTelegramWebhook();
  const { toast } = useToast();

  useEffect(() => {
    const savedChatId = localStorage.getItem('telegram_chat_id');
    if (savedChatId) {
      setChatId(savedChatId);
    }
  }, []);

  const handleTestConnection = async () => {
    if (!chatId.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a Chat ID',
        variant: 'destructive',
      });
      return;
    }

    try {
      await sendTelegramTestMessage(chatId);
      localStorage.setItem('telegram_chat_id', chatId);
      
      toast({
        title: 'Success!',
        description: 'Test message sent successfully. Check your Telegram!',
      });
    } catch (error) {
      console.error('Error sending test message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send test message. Please check your Chat ID.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border space-y-6">
      <h3 className="text-lg font-semibold mb-4">Connect to Telegram</h3>
      
      <div className="space-y-4">
        <TelegramInstructions />

        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter your Telegram Chat ID"
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={handleTestConnection} 
            disabled={!chatId || isSettingUp}
            className="whitespace-nowrap"
          >
            Test Connection
          </Button>
        </div>
      </div>
    </div>
  );
};