import React, { useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';

const AffirmationDisplay: React.FC = () => {
  const affirmations = [
    "You are enough, exactly as you are right now.",
    "Your feelings are valid and deserve to be acknowledged.",
    "It's okay to not be okay sometimes.",
    "You are stronger than you know, even in your vulnerability.",
    "Your emotions are messengers, not enemies.",
    "You deserve compassion, especially from yourself.",
    "Every feeling you have is part of your beautiful human experience.",
    "You are worthy of love and understanding.",
    "It's brave to feel deeply in a world that often asks us not to.",
    "Your sensitivity is a superpower, not a weakness.",
    "You don't have to carry everything alone.",
    "Your heart knows how to heal, give it time.",
    "You are allowed to take up space with your emotions.",
    "Progress isn't always linear, and that's perfectly okay.",
    "You are doing better than you think you are."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const showAffirmation = () => {
    if (!isVisible) {
      setIsVisible(true);
    } else {
      // Cycle to next affirmation
      setCurrentIndex((prev) => (prev + 1) % affirmations.length);
    }
  };

  const hideAffirmation = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return (
      <button
        onClick={showAffirmation}
        className="w-full flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
      >
        <Sparkles size={18} className="text-purple-600" />
        <span className="text-slate-700">Gentle affirmations</span>
      </button>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-purple-600" />
          <span className="text-sm font-medium text-purple-700">Gentle Affirmation</span>
        </div>
        <button
          onClick={hideAffirmation}
          className="text-purple-400 hover:text-purple-600 text-sm"
        >
          ✕
        </button>
      </div>
      
      <p className="text-slate-700 leading-relaxed mb-4 italic" style={{ fontFamily: 'Georgia, serif' }}>
        "{affirmations[currentIndex]}"
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-purple-500">
          {currentIndex + 1} of {affirmations.length}
        </span>
        <button
          onClick={showAffirmation}
          className="flex items-center gap-2 px-3 py-1 bg-purple-100 hover:bg-purple-200 rounded-lg text-purple-700 text-sm transition-colors"
        >
          <RefreshCw size={14} />
          Next
        </button>
      </div>
    </div>
  );
};

export default AffirmationDisplay;