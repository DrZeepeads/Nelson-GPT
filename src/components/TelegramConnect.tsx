import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink } from 'lucide-react';

export const TelegramConnect = () => {
  const [chatId, setChatId] = useState('');
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [setupAttempted, setSetupAttempted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedChatId = localStorage.getItem('telegram_chat_id');
    if (savedChatId) {
      setChatId(savedChatId);
    }

    // Only attempt setup once per session
    const hasSetup = sessionStorage.getItem('telegram_webhook_setup');
    if (!hasSetup && !setupAttempted) {
      setupWebhook();
    }
  }, [setupAttempted]);

  const setupWebhook = async () => {
    if (isSettingUp) return;

    setIsSettingUp(true);
    setSetupAttempted(true);

    try {
      const origin = window.location.origin;
      console.log('Setting up webhook with origin:', origin);

      const response = await supabase.functions.invoke('setup-telegram-webhook', {
        body: { url: origin }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      console.log('Webhook setup response:', response.data);
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

  const sendTestMessage = async () => {
    if (!chatId.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a Chat ID',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('telegram-bot', {
        body: {
          message: 'Hello! Your NelsonGPT bot is now connected.',
          chatId: chatId,
        },
      });

      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Test message sent successfully. Check your Telegram!',
      });

      localStorage.setItem('telegram_chat_id', chatId);
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

        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter your Telegram Chat ID"
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={sendTestMessage} 
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