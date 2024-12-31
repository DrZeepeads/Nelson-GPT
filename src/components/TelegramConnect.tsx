import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink } from 'lucide-react';

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
            disabled={!chatId}
            className="whitespace-nowrap"
          >
            Test Connection
          </Button>
        </div>
      </div>
    </div>
  );
};