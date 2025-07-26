import React from 'react';
import { Smile, Frown, Zap, Flame, Meh } from 'lucide-react';

interface MoodVisualizationProps {
  mood: string;
  emotions: string[];
  isActive: boolean;
}

const MoodVisualization: React.FC<MoodVisualizationProps> = ({ mood, emotions, isActive }) => {
  const getMoodIcon = () => {
    switch (mood) {
      case 'happy': return <Smile className="text-yellow-500" size={32} />;
      case 'sad': return <Frown className="text-blue-500" size={32} />;
      case 'anxious': return <Zap className="text-purple-500" size={32} />;
      case 'angry': return <Flame className="text-red-500" size={32} />;
      default: return <Meh className="text-slate-400" size={32} />;
    }
  };

  const getMoodColor = () => {
    switch (mood) {
      case 'happy': return 'bg-yellow-100 border-yellow-300';
      case 'sad': return 'bg-blue-100 border-blue-300';
      case 'anxious': return 'bg-purple-100 border-purple-300';
      case 'angry': return 'bg-red-100 border-red-300';
      default: return 'bg-slate-100 border-slate-300';
    }
  };

  const getMoodDescription = () => {
    switch (mood) {
      case 'happy': return 'Radiating joy and positivity';
      case 'sad': return 'Feeling heavy and melancholic';
      case 'anxious': return 'Experiencing worry and unease';
      case 'angry': return 'Processing frustration and intensity';
      default: return 'In a neutral, reflective state';
    }
  };

  return (
    <div className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transition-all duration-500 ${isActive ? 'scale-105' : ''}`}>
      <h3 className="text-lg font-semibold text-slate-700 mb-4">Current Emotional State</h3>
      
      <div className={`rounded-xl p-4 mb-4 border-2 transition-all duration-500 ${getMoodColor()}`}>
        <div className="flex items-center justify-center mb-3">
          <div className={`transform transition-all duration-500 ${isActive ? 'animate-pulse' : ''}`}>
            {getMoodIcon()}
          </div>
        </div>
        <p className="text-center text-slate-600 font-medium capitalize">{mood}</p>
        <p className="text-center text-slate-500 text-sm mt-1">{getMoodDescription()}</p>
      </div>

      {/* Emotional Intensity Meter */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span>Emotional Intensity</span>
          <span>{isActive ? '●●●○○' : '●○○○○'}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${
              mood === 'sad' ? 'bg-blue-400' :
              mood === 'happy' ? 'bg-yellow-400' :
              mood === 'anxious' ? 'bg-purple-400' :
              mood === 'angry' ? 'bg-red-400' :
              'bg-slate-300'
            }`}
            style={{ width: isActive ? '60%' : '20%' }}
          />
        </div>
      </div>

      {/* Comfort Message */}
      <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <p className="text-sm text-slate-600 italic">
          "Every emotion you feel is a part of your beautiful human experience"
        </p>
      </div>
    </div>
  );
};

export default MoodVisualization;