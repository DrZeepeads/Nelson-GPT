import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { contentType, content, title } = await req.json()
    const mistralApiKey = Deno.env.get('MISTRAL_API_KEY')
    
    if (!mistralApiKey) {
      throw new Error('MISTRAL_API_KEY is not set')
    }

    // Create the enhancement prompt based on content type
    let systemPrompt = ''
    if (contentType === 'chapter') {
      systemPrompt = `As a pediatric medical expert, enhance this chapter summary while maintaining medical accuracy. 
      Structure your response as follows:
      1. Overview: Brief introduction to the topic
      2. Key Concepts: Main medical principles and theories
      3. Clinical Significance: Importance in pediatric practice
      4. Learning Objectives: What medical professionals should learn
      Keep medical terminology precise and maintain academic tone.`
    } else if (contentType === 'section') {
      systemPrompt = `As a pediatric medical expert, enhance this section content while maintaining medical accuracy. 
      Structure your response as follows:
      1. Main Topic: Clear definition and context
      2. Clinical Presentation: Key symptoms and signs
      3. Diagnostic Approach: Relevant tests and evaluations
      4. Management Principles: Evidence-based treatment options
      5. Key Points: Critical information for practice
      Include relevant clinical pearls and warning signs.`
    } else if (contentType === 'subsection') {
      systemPrompt = `As a pediatric medical expert, enhance this subsection content while maintaining medical accuracy. 
      Structure your response as follows:
      1. Detailed Analysis: In-depth exploration of the specific topic
      2. Clinical Correlations: Practical applications
      3. Evidence-Based Updates: Recent research and guidelines
      4. Practice Points: Specific recommendations
      Include specific examples and case scenarios when relevant.`
    }

    console.log('Enhancing content:', { contentType, title })

    // Call Mistral API
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
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Title: ${title}\n\nContent to enhance: ${content}`
          }
        ],
        temperature: 0.3, // Lower temperature for more focused, medical content
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(JSON.stringify(error))
    }

    const result = await response.json()
    console.log('Enhancement completed for:', title)

    return new Response(
      JSON.stringify({ 
        enhancedContent: result.choices[0].message.content,
        originalContent: content,
        contentType,
        title 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in enhance-content function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})