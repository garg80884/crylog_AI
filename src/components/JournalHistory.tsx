import React from 'react';
import { Calendar, Heart, Trash2 } from 'lucide-react';
import { JournalEntry } from '../services/storage';

interface JournalHistoryProps {
  entries: JournalEntry[];
  onDeleteEntry: (entryId: string) => void;
}

const JournalHistory: React.FC<JournalHistoryProps> = ({ entries, onDeleteEntry }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy': return 'bg-yellow-100 border-yellow-300 text-yellow-700';
      case 'sad': return 'bg-blue-100 border-blue-300 text-blue-700';
      case 'anxious': return 'bg-purple-100 border-purple-300 text-purple-700';
      case 'angry': return 'bg-red-100 border-red-300 text-red-700';
      default: return 'bg-slate-100 border-slate-300 text-slate-700';
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (entries.length === 0) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 text-center">
        <Heart className="mx-auto text-slate-400 mb-4" size={48} />
        <h3 className="text-xl font-semibold text-slate-600 mb-2">Your Journey Begins Here</h3>
        <p className="text-slate-500">Start writing to see your emotional journey unfold</p>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="text-indigo-600" size={24} />
        <h3 className="text-xl font-semibold text-slate-700">Your Emotional Journey</h3>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {entries.map((entry) => (
          <div key={entry.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getMoodColor(entry.mood)}`}>
                  {entry.mood}
                </span>
                <span className="text-xs text-slate-500">
                  {formatDate(entry.timestamp)}
                </span>
              </div>
              <button 
                onClick={() => onDeleteEntry(entry.id)}
                className="text-slate-400 hover:text-red-500 transition-colors"
                title="Delete entry"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="mb-3">
              <p className="text-slate-700 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                {truncateText(entry.content, 200)}
              </p>
            </div>

            {entry.emotions.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {entry.emotions.map((emotion, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs"
                  >
                    {emotion}
                  </span>
                ))}
              </div>
            )}

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3">
              <p className="text-sm text-slate-600 italic">
                💙 {truncateText(entry.aiResponse, 150)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalHistory;