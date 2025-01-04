import { supabase } from "@/integrations/supabase/client";

export const getChatResponse = async (message: string): Promise<string> => {
  try {
    console.log('Sending chat request:', { message });
    
    const { data, error } = await supabase.functions.invoke('chat', {
      body: { message },
    });

    if (error) {
      console.error('Chat function error:', error);
      throw new Error(error.message || 'Failed to get response from chat function');
    }

    if (!data || !data.response) {
      console.error('Invalid response structure:', data);
      throw new Error('Invalid response from chat function');
    }

    console.log('Received chat response:', data);
    return data.response;
  } catch (error) {
    console.error('Error calling chat function:', error);
    throw error;
  }
};