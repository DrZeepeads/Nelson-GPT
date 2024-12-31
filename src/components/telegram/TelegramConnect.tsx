import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';
import { setupTelegramWebhook, sendTelegramTestMessage } from '@/utils/telegram';
import { TelegramInstructions } from './TelegramInstructions';

export const TelegramConnect = () => {
  const [chatId, setChatId] = useState('');
  const [isSettingUp, setIsSettingUp] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedChatId = localStorage.getItem('telegram_chat_id');
    if (savedChatId) {
      setChatId(savedChatId);
    }

    const hasSetup = sessionStorage.getItem('telegram_webhook_setup');
    if (!hasSetup) {
      handleWebhookSetup();
    }
  }, []);

  const handleWebhookSetup = async () => {
    if (isSettingUp) return;

    setIsSettingUp(true);
    try {
      const origin = window.location.origin;
      await setupTelegramWebhook(origin);
      sessionStorage.setItem('telegram_webhook_setup', 'true');
      
      toast({
        title: 'Bot Setup Complete',
        description: 'You can now connect your Telegram account.',
      });
    } catch (error) {
      console.error('Webhook setup error:', error);
      toast({
        title: 'Setup Error',
        description: 'Could not set up the bot. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSettingUp(false);
    }
  };

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