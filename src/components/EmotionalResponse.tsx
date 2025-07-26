import React, { useState } from 'react';
import { Heart, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { generateEmpatheticVoice } from '../services/elevenlabs';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

interface EmotionalResponseProps {
  response: string;
  mood: string;
  emotions: string[];
  aiModel?: 'openai' | 'gemini';
  isGenerating?: boolean;
}

const EmotionalResponse: React.FC<EmotionalResponseProps> = ({ 
  response, 
  mood, 
  emotions, 
  aiModel = 'openai',
  isGenerating = false 
}) => {
  const { isPlaying, isLoading: isVoiceLoading, playAudio, stopAudio } = useAudioPlayer();
  const [voiceError, setVoiceError] = useState(false);

  const getMoodGradient = () => {
    switch (mood) {
      case 'sad': return 'from-blue-100 to-blue-200';
      case 'happy': return 'from-yellow-100 to-yellow-200';
      case 'anxious': return 'from-purple-100 to-purple-200';
      case 'angry': return 'from-red-100 to-red-200';
      default: return 'from-slate-100 to-slate-200';
    }
  };

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

  return (
    <div className={`bg-gradient-to-br ${getMoodGradient()} rounded-2xl p-6 shadow-lg border border-white/50 animate-fade-in`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Heart className="text-rose-500" size={20} />
          <div>
            <h3 className="text-lg font-semibold text-slate-700">I hear you</h3>
            <p className="text-xs text-slate-500">
              via {aiModel === 'openai' ? 'GPT-4o' : 'Gemini 2.0 Flash'}
            </p>
          </div>
        </div>
        <button
          onClick={handleVoicePlayback}
          disabled={isGenerating || isVoiceLoading || !response.trim()}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isPlaying
              ? 'bg-blue-500 text-white'
              : 'bg-white/70 text-slate-600 hover:bg-white disabled:hover:bg-white/70'
          }`}
        >
          {isVoiceLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : isPlaying ? (
            <VolumeX size={16} />
          ) : (
            <Volume2 size={16} />
          )}
          <span className="text-sm">
            {isVoiceLoading ? 'Loading...' : isPlaying ? 'Stop' : 'Listen'}
          </span>
        </button>
      </div>
      
      {isGenerating ? (
        <div className="flex items-center gap-3 text-slate-600 mb-4">
          <Loader2 size={20} className="animate-spin" />
          <p className="italic">Crafting a heartfelt response just for you...</p>
        </div>
      ) : (
        <p className="text-slate-700 leading-relaxed mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          {response}
        </p>
      )}
      
      {voiceError && (
        <p className="text-sm text-amber-600 mb-2 italic">
          Voice unavailable, but the words still carry the same warmth 💙
        </p>
      )}
      
      {emotions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {emotions.map((emotion, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-white/60 text-slate-600 rounded-full text-sm font-medium"
            >
              {emotion}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmotionalResponse;