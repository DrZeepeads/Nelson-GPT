export const createEmbedding = async (text: string): Promise<number[]> => {
  const mistralApiKey = Deno.env.get('MISTRAL_API_KEY')
  
  if (!mistralApiKey) {
    throw new Error('MISTRAL_API_KEY not configured')
  }

  try {
    const response = await fetch('https://api.mistral.ai/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mistralApiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-embed",
        input: text,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create embedding: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data[0].embedding;
  } catch (error) {
    console.error('Error creating embedding:', error);
    throw error;
  }
};