import React from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface VoiceJournalingProps {
  onTranscriptUpdate: (transcript: string) => void;
}

const VoiceJournaling: React.FC<VoiceJournalingProps> = ({ onTranscriptUpdate }) => {
  const { 
    isRecording, 
    transcript, 
    error, 
    isSupported, 
    startRecording, 
    stopRecording, 
    resetTranscript 
  } = useSpeechRecognition();

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
      if (transcript.trim()) {
        onTranscriptUpdate(transcript);
      }
    } else {
      resetTranscript();
      startRecording();
    }
  };

  const handleClearTranscript = () => {
    resetTranscript();
    onTranscriptUpdate('');
  };

  if (!isSupported) {
    return (
      <div className="w-full bg-gray-50 rounded-xl p-3 border border-gray-200">
        <div className="flex items-center gap-2 text-gray-500">
          <AlertCircle size={18} />
          <span className="text-sm">Voice recording not supported in this browser</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <button
        onClick={handleToggleRecording}
        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
          isRecording
            ? 'bg-red-100 text-red-700 border-2 border-red-300 animate-pulse'
            : 'bg-pink-50 hover:bg-pink-100 text-pink-600'
        }`}
      >
        {isRecording ? (
          <MicOff size={18} />
        ) : (
          <Mic size={18} />
        )}
        <span>
          {isRecording ? 'Stop recording' : 'Voice journaling'}
        </span>
      </button>

      {error && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs text-red-600 flex items-center gap-1">
            <AlertCircle size={12} />
            {error}
          </p>
        </div>
      )}

      {transcript && (
        <div className="mt-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-pink-700">Voice Transcript:</span>
            <button
              onClick={handleClearTranscript}
              className="text-xs text-pink-500 hover:text-pink-700"
            >
              Clear
            </button>
          </div>
          <p className="text-sm text-slate-700 italic leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
            {transcript}
          </p>
          {!isRecording && transcript.trim() && (
            <button
              onClick={() => onTranscriptUpdate(transcript)}
              className="mt-2 w-full px-3 py-1 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded text-xs transition-colors"
            >
              Add to Journal Entry
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceJournaling;