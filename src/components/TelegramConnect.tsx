import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const TelegramConnect = () => {
  const [chatId, setChatId] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setupBotCommands();
  }, []);

  const setupBotCommands = async () => {
    try {
      console.log('Setting up bot commands...');
      const { data, error } = await supabase.functions.invoke('setup-telegram-commands');
      
      if (error) {
        console.error('Error setting up bot commands:', error);
        toast({
          title: 'Error',
          description: 'Failed to set up bot commands. Please try again.',
          variant: 'destructive',
        });
        return;
      }
      
      if (!data.ok) {
        console.error('Failed to set up bot commands:', data);
        toast({
          title: 'Error',
          description: `Failed to set up bot commands: ${data.description}`,
          variant: 'destructive',
        });
        return;
      }

      console.log('Bot commands set up successfully');
      toast({
        title: 'Success',
        description: 'Bot commands have been set up successfully.',
      });
    } catch (error) {
      console.error('Error setting up bot commands:', error);
      toast({
        title: 'Error',
        description: 'Failed to set up bot commands. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const sendTestMessage = async () => {
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

      // Save the chat ID in localStorage for future use
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
    <div className="p-4 bg-white rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Connect to Telegram</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">
            1. Start a chat with your bot on Telegram
          </p>
          <p className="text-sm text-gray-600 mb-2">
            2. Send /start to the bot
          </p>
          <p className="text-sm text-gray-600 mb-2">
            3. Visit{' '}
            <a
              href="https://api.telegram.org/bot[YOUR_BOT_TOKEN]/getUpdates"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              this link
            </a>{' '}
            to get your Chat ID
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter your Telegram Chat ID"
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            className="flex-1"
          />
          <Button onClick={sendTestMessage} disabled={!chatId}>
            Test Connection
          </Button>
        </div>
      </div>
    </div>
  );
};