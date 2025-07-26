interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export const generateEmpatheticResponseGemini = async (
  journalEntry: string,
  mood: string,
  emotions: string[]
): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Gemini API key not configured');
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

Respond as if you're sitting with them, truly feeling their emotions alongside them.

Here's what they wrote in their journal: "${journalEntry}"

Please respond with genuine empathy and emotional support. Help them feel understood and less alone in this feeling.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: systemPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || 'I hear you, and I want you to know that your feelings matter. You\'re not alone in this. 💙';
  } catch (error) {
    console.error('Error generating empathetic response with Gemini:', error);
    // Fallback to a warm, empathetic message
    return 'I can feel the weight of your words, and I want you to know that whatever you\'re experiencing right now is valid. You\'re being so brave by sharing this. 💙';
  }
};