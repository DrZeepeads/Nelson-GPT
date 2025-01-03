import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

export const enhanceText = async (text: string, context: string) => {
  const mistralApiKey = Deno.env.get('MISTRAL_API_KEY')
  
  if (!mistralApiKey) {
    throw new Error('MISTRAL_API_KEY not configured')
  }

  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${mistralApiKey}`,
    },
    body: JSON.stringify({
      model: 'mistral-large-latest',
      messages: [
        {
          role: 'system',
          content: `You are a medical content enhancement system. Enhance the following ${context} while maintaining medical accuracy and adding clinical pearls where relevant.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.3,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to enhance text: ${response.statusText}`)
  }

  const result = await response.json()
  return result.choices[0].message.content
}