import MistralClient from '@mistralai/mistralai';

const mistral = new MistralClient(import.meta.env.VITE_MISTRAL_API_KEY || '');

export const getChatResponse = async (message: string): Promise<string> => {
  try {
    const chatResponse = await mistral.chat({
      model: 'mistral-tiny',
      messages: [
        {
          role: 'system',
          content: 'You are a pediatric knowledge assistant powered by Nelson Textbook of Pediatrics. Provide evidence-based answers about pediatric conditions, treatments, and guidelines.'
        },
        {
          role: 'user',
          content: message
        }
      ]
    });

    return chatResponse.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Mistral API:', error);
    throw new Error('Failed to get response from Mistral API');
  }
};