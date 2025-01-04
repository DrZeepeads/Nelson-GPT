import { supabase } from "@/integrations/supabase/client";

export const getChatResponse = async (message: string): Promise<string> => {
  try {
    console.log('Sending chat request:', { message });
    
    const { data, error } = await supabase.functions.invoke('chat', {
      body: { message },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (error) {
      console.error('Chat function error:', error);
      throw error;
    }

    if (!data || !data.response) {
      throw new Error('Invalid response format from chat function');
    }

    console.log('Received chat response:', data);
    return data.response;
  } catch (error) {
    console.error('Error calling chat function:', error);
    throw new Error('Failed to get response from chat function');
  }
};