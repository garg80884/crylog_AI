import React from 'react';
import { PenTool, Brain } from 'lucide-react';

interface JournalEditorProps {
  value: string;
  onChange: (value: string) => void;
  mood: string;
  isAnalyzing: boolean;
}

const JournalEditor: React.FC<JournalEditorProps> = ({ value, onChange, mood, isAnalyzing }) => {
  const getMoodBorder = () => {
    switch (mood) {
      case 'sad': return 'border-blue-300 shadow-blue-100';
      case 'happy': return 'border-yellow-300 shadow-yellow-100';
      case 'anxious': return 'border-purple-300 shadow-purple-100';
      case 'angry': return 'border-red-300 shadow-red-100';
      default: return 'border-slate-200 shadow-slate-100';
    }
  };

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 transition-all duration-500 ${getMoodBorder()}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <PenTool className="text-slate-600" size={20} />
          <h2 className="text-xl font-semibold text-slate-700">Pour your heart out</h2>
        </div>
        {isAnalyzing && (
          <div className="flex items-center gap-2 text-indigo-600">
            <Brain className="animate-pulse" size={18} />
            <span className="text-sm">
              {isAnalyzing ? 'Understanding your feelings...' : 'Crafting empathetic response...'}
            </span>
          </div>
        )}
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What's weighing on your heart today? I'm here to listen without judgment, to understand without trying to fix, and to hold space for whatever you're feeling..."
        className="w-full h-64 p-4 border-0 resize-none bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none text-lg leading-relaxed"
        style={{ fontFamily: 'Georgia, serif' }}
      />
      
      <div className="flex justify-between items-center text-sm text-slate-500 mt-2">
        <span>{value.length} characters</span>
        <span className="italic">Your feelings are valid and important</span>
      </div>
    </div>
  );
};

export default JournalEditor;