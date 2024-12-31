import { supabase } from "@/integrations/supabase/client";

export const getChatResponse = async (message: string): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('chat', {
      body: { message },
    });

    if (error) throw error;
    return data.response;
  } catch (error) {
    console.error('Error calling chat function:', error);
    throw new Error('Failed to get response from chat function');
  }
};