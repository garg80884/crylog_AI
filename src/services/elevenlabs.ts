interface ElevenLabsResponse {
  audio_base64?: string;
}

export const generateEmpatheticVoice = async (
  text: string,
  mood: string
): Promise<string | null> => {
  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
  const voiceId = import.meta.env.VITE_ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL'; // Default to a gentle voice
  
  if (!apiKey) {
    console.warn('ElevenLabs API key not configured');
    return null;
  }

  // Adjust voice settings based on mood for emotional authenticity
  const getVoiceSettings = (mood: string) => {
    switch (mood) {
      case 'sad':
        return {
          stability: 0.3,
          similarity_boost: 0.8,
          style: 0.2,
          use_speaker_boost: true
        };
      case 'anxious':
        return {
          stability: 0.2,
          similarity_boost: 0.7,
          style: 0.3,
          use_speaker_boost: true
        };
      case 'angry':
        return {
          stability: 0.4,
          similarity_boost: 0.9,
          style: 0.1,
          use_speaker_boost: true
        };
      case 'happy':
        return {
          stability: 0.6,
          similarity_boost: 0.8,
          style: 0.4,
          use_speaker_boost: true
        };
      default:
        return {
          stability: 0.5,
          similarity_boost: 0.8,
          style: 0.3,
          use_speaker_boost: true
        };
    }
  };

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: getVoiceSettings(mood),
      }),
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    // Convert response to blob and create object URL
    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error('Error generating voice:', error);
    return null;
  }
};