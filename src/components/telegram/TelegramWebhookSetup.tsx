import { useState, useEffect } from 'react';
import { useToast } from '../ui/use-toast';
import { setupTelegramWebhook } from '@/utils/telegram';

export const useTelegramWebhook = () => {
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [setupAttempted, setSetupAttempted] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();

  const setupWebhook = async () => {
    if (isSettingUp) return;

    setIsSettingUp(true);
    try {
      const origin = window.location.origin;
      await setupTelegramWebhook(origin);
      sessionStorage.setItem('telegram_webhook_setup', 'true');
      setRetryCount(0);
      
      toast({
        title: 'Bot Setup Complete',
        description: 'You can now connect your Telegram account.',
      });
    } catch (error: any) {
      console.error('Webhook setup error:', error);
      
      // Handle rate limit error
      if (error.status === 429) {
        const retryAfter = parseInt(error.message?.match(/\d+/)?.[0] || '5');
        const backoffTime = Math.min(Math.pow(2, retryCount) * 1000, 30000);
        const waitTime = retryAfter * 1000 || backoffTime;

        toast({
          title: 'Rate Limit Exceeded',
          description: `Retrying in ${Math.ceil(waitTime/1000)} seconds...`,
          duration: waitTime + 1000,
        });

        setSetupAttempted(false);
        setRetryCount(prev => prev + 1);
        
        setTimeout(() => {
          setupWebhook();
        }, waitTime);
        return;
      }

      toast({
        title: 'Setup Error',
        description: 'Could not set up the bot. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSettingUp(false);
    }
  };

  useEffect(() => {
    const hasSetup = sessionStorage.getItem('telegram_webhook_setup');
    if (!hasSetup && !setupAttempted) {
      setupWebhook();
    }
  }, [setupAttempted]);

  return { isSettingUp };
};