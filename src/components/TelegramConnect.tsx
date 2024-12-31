import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink } from 'lucide-react';

export const TelegramConnect = () => {
  const [chatId, setChatId] = useState('');
  const [isSettingUp, setIsSettingUp] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const setupWebhookIfNeeded = async () => {
      // Check if webhook was already set up in this session
      const webhookSetup = sessionStorage.getItem('telegram_webhook_setup');
      if (webhookSetup) {
        console.log('Webhook already set up in this session');
        return;
      }

      if (isSettingUp) {
        console.log('Setup already in progress');
        return;
      }

      try {
        setIsSettingUp(true);
        console.log('Setting up webhook...');
        const origin = window.location.origin;
        console.log('Using origin:', origin);

        // First set up the webhook with retry logic
        let retryCount = 0;
        const maxRetries = 3;
        let success = false;

        while (!success && retryCount < maxRetries) {
          try {
            const webhookResponse = await supabase.functions.invoke('setup-telegram-webhook', {
              body: { url: origin }
            });

            if (webhookResponse.error) {
              throw webhookResponse.error;
            }

            console.log('Webhook setup response:', webhookResponse.data);
            success = true;
          } catch (error) {
            retryCount++;
            if (retryCount === maxRetries) {
              throw error;
            }
            // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
          }
        }

        // Then set up bot commands
        console.log('Setting up bot commands...');
        const commandsResponse = await supabase.functions.invoke('setup-telegram-commands', {
          body: { url: origin }
        });

        if (commandsResponse.error) {
          throw commandsResponse.error;
        }

        if (!commandsResponse.data?.ok) {
          throw new Error(`Failed to set up bot commands: ${commandsResponse.data?.description || 'Unknown error'}`);
        }

        console.log('Bot setup completed successfully');
        sessionStorage.setItem('telegram_webhook_setup', 'true');
        toast({
          title: 'Success',
          description: 'Bot has been set up successfully.',
        });
      } catch (error) {
        console.error('Error during bot setup:', error);
        toast({
          title: 'Error',
          description: 'Failed to set up the bot. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsSettingUp(false);
      }
    };

    setupWebhookIfNeeded();
  }, []); // Empty dependency array to run only once

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