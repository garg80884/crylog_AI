import React, { useState } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { generateEmpatheticVoice } from '../services/elevenlabs';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

interface ComfortVoicePlayerProps {
  response: string;
  mood: string;
}

const ComfortVoicePlayer: React.FC<ComfortVoicePlayerProps> = ({ response, mood }) => {
  const { isPlaying, isLoading: isVoiceLoading, playAudio, stopAudio } = useAudioPlayer();
  const [voiceError, setVoiceError] = useState(false);

  const handleVoicePlayback = async () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    if (!response.trim()) return;

    try {
      setVoiceError(false);
      const audioUrl = await generateEmpatheticVoice(response, mood);
      
      if (audioUrl) {
        await playAudio(audioUrl);
      } else {
        setVoiceError(true);
      }
    } catch (error) {
      console.error('Voice generation error:', error);
      setVoiceError(true);
    }
  };

  if (!response.trim()) {
    return (
      <button 
        disabled
        className="w-full flex items-center gap-3 p-3 bg-gray-100 rounded-xl opacity-50 cursor-not-allowed"
      >
        <Volume2 size={18} className="text-gray-400" />
        <span className="text-gray-500">Write something to hear it spoken</span>
      </button>
    );
  }

  return (
    <div className="w-full">
      <button
        onClick={handleVoicePlayback}
        disabled={isVoiceLoading}
        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
          isPlaying
            ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
            : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isVoiceLoading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : isPlaying ? (
          <VolumeX size={18} />
        ) : (
          <Volume2 size={18} />
        )}
        <span>
          {isVoiceLoading ? 'Generating voice...' : isPlaying ? 'Stop empathetic voice' : 'Hear empathetic voice'}
        </span>
      </button>
      
      {voiceError && (
        <p className="text-xs text-amber-600 mt-2 px-3 italic">
          Voice unavailable, but the words still carry warmth 💙
        </p>
      )}
    </div>
  );
};

export default ComfortVoicePlayer;