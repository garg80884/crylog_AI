import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

interface AIModelSelectorProps {
  selectedModel: 'openai' | 'gemini';
  onModelChange: (model: 'openai' | 'gemini') => void;
}

const AIModelSelector: React.FC<AIModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
      <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
        <Brain size={20} />
        AI Companion
      </h3>
      
      <div className="space-y-3">
        {/* OpenAI temporarily disabled */}
        <div className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-100 border-2 border-slate-200 text-slate-400 opacity-50">
          <div className="w-8 h-8 bg-slate-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <div className="text-left">
            <p className="font-medium">GPT-4o</p>
            <p className="text-xs opacity-75">Temporarily unavailable</p>
          </div>
        </div>

        <button
          onClick={() => onModelChange('gemini')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
            selectedModel === 'gemini'
              ? 'bg-purple-100 border-2 border-purple-300 text-purple-700'
              : 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent text-slate-700'
          }`}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Sparkles className="text-white" size={16} />
          </div>
          <div className="text-left">
            <p className="font-medium">Gemini 2.0 Flash</p>
            <p className="text-xs opacity-75">Google's compassionate AI</p>
          </div>
        </button>
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <p className="text-xs text-slate-600 text-center">
          Both models are trained to provide emotional support, not logical solutions
        </p>
      </div>
    </div>
  );
};

export default AIModelSelector;