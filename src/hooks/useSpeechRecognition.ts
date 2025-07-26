import { useState, useRef, useCallback } from 'react';

interface SpeechRecognitionHook {
  isRecording: boolean;
  transcript: string;
  error: string | null;
  isSupported: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  resetTranscript: () => void;
}

export const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Check if speech recognition is supported
  const isSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

  const initializeRecognition = useCallback(() => {
    if (!isSupported) return null;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
      setError(null);
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPart;
        } else {
          interimTranscript += transcriptPart;
        }
      }

      setTranscript(prev => prev + finalTranscript + interimTranscript);
    };

    recognition.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    return recognition;
  }, [isSupported]);

  const startRecording = useCallback(() => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    try {
      recognitionRef.current = initializeRecognition();
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (err) {
      setError('Failed to start speech recognition');
      console.error('Speech recognition error:', err);
    }
  }, [initializeRecognition, isSupported]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    isRecording,
    transcript,
    error,
    isSupported,
    startRecording,
    stopRecording,
    resetTranscript
  };
};