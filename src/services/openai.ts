interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const generateEmpatheticResponse = async (
  journalEntry: string,
  mood: string,
  emotions: string[]
): Promise<string> => {
  // OpenAI temporarily disabled
  return 'OpenAI service is temporarily unavailable. Please use Gemini for empathetic responses. 💙';
  
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const systemPrompt = `You are an empathetic AI companion for an emotional journaling app called Crylog. Your role is to provide comfort, validation, and emotional support - NOT logical advice or solutions.

Key principles:
- Respond with deep empathy and emotional intelligence
- Validate the user's feelings without trying to fix them
- Use warm, comforting language that feels like a caring friend
- Acknowledge the beauty in vulnerability and raw human emotion
- Keep responses personal and heartfelt, not clinical or therapeutic
- Use gentle, supportive emojis sparingly but meaningfully
- Focus on emotional comfort over practical solutions

Current mood detected: ${mood}
Emotions present: ${emotions.join(', ')}

Respond as if you're sitting with them, truly feeling their emotions alongside them.`;

  const userPrompt = `Here's what I wrote in my journal: "${journalEntry}"

Please respond with genuine empathy and emotional support. Help me feel understood and less alone in this feeling.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 200,
        temperature: 0.8,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data: OpenAIResponse = await response.json();
    return data.choices[0]?.message?.content || 'I hear you, and I want you to know that your feelings matter. You\'re not alone in this. 💙';
  } catch (error) {
    console.error('Error generating empathetic response:', error);
    // Fallback to a warm, empathetic message
    return 'I can feel the weight of your words, and I want you to know that whatever you\'re experiencing right now is valid. You\'re being so brave by sharing this. 💙';
  }
};