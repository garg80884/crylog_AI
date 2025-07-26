import React, { useState, useEffect } from 'react';
import { Heart, Droplets, Mic, Volume2, Save, Calendar, Sparkles } from 'lucide-react';
import JournalEditor from './components/JournalEditor';
import EmotionalResponse from './components/EmotionalResponse';
import MoodVisualization from './components/MoodVisualization';
import JournalHistory from './components/JournalHistory';
import AIModelSelector from './components/AIModelSelector';
import AnimatedTears from './components/AnimatedTears';
import ComfortVoicePlayer from './components/ComfortVoicePlayer';
import AffirmationDisplay from './components/AffirmationDisplay';
import VoiceJournaling from './components/VoiceJournaling';
import { generateEmpatheticResponse } from './services/openai';
import { generateEmpatheticResponseGemini } from './services/gemini';
import { JournalEntry, saveEntriesToStorage, loadEntriesFromStorage } from './services/storage';

function App() {
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentMood, setCurrentMood] = useState('neutral');
  const [currentEmotions, setCurrentEmotions] = useState<string[]>([]);
  const [aiResponse, setAiResponse] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>(() => loadEntriesFromStorage());
  const [selectedAIModel, setSelectedAIModel] = useState<'openai' | 'gemini'>('gemini');
  const [showHistory, setShowHistory] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [showTears, setShowTears] = useState(false);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    saveEntriesToStorage(entries);
  }, [entries]);

  // Mock mood detection based on text content
  const analyzeMood = (text: string) => {
    const sadWords = ['sad', 'depressed', 'hurt', 'pain', 'crying', 'lonely', 'empty', 'broken', 'hopeless'];
    const happyWords = ['happy', 'joy', 'excited', 'love', 'amazing', 'wonderful', 'great', 'fantastic'];
    const anxiousWords = ['anxious', 'worried', 'stress', 'fear', 'nervous', 'overwhelmed', 'panic'];
    const angryWords = ['angry', 'mad', 'furious', 'hate', 'frustrated', 'annoyed'];

    const lowerText = text.toLowerCase();
    
    let mood = 'neutral';
    let emotions: string[] = [];

    if (sadWords.some(word => lowerText.includes(word))) {
      mood = 'sad';
      emotions = ['sadness', 'melancholy'];
      setShowTears(true);
    } else if (happyWords.some(word => lowerText.includes(word))) {
      mood = 'happy';
      emotions = ['joy', 'contentment'];
      setShowTears(false);
    } else if (anxiousWords.some(word => lowerText.includes(word))) {
      mood = 'anxious';
      emotions = ['anxiety', 'worry'];
      setShowTears(false);
    } else if (angryWords.some(word => lowerText.includes(word))) {
      mood = 'angry';
      emotions = ['anger', 'frustration'];
      setShowTears(false);
    } else {
      setShowTears(false);
    }

    return { mood, emotions };
  };

  const handleEntryChange = (text: string) => {
    setCurrentEntry(text);
    
    if (text.length > 50) {
      setIsAnalyzing(true);
      
      setTimeout(() => {
        const { mood, emotions } = analyzeMood(text);
        setCurrentMood(mood);
        setCurrentEmotions(emotions);
        
        // Generate AI response
        setIsGeneratingResponse(true);
        
        // Force use of Gemini since OpenAI is temporarily disabled
        const generateResponse = generateEmpatheticResponseGemini;
          
        generateResponse(text, mood, emotions)
          .then(response => {
            setAiResponse(response);
          })
          .catch(error => {
            console.error('Error generating response:', error);
            setAiResponse("I can feel the emotion in your words, and I want you to know that I'm here with you. Your feelings are valid and important. 💙");
          })
          .finally(() => {
            setIsGeneratingResponse(false);
          });
        
        setIsAnalyzing(false);
      }, 1000);
    }
  };

  const saveEntry = () => {
    if (currentEntry.trim()) {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        content: currentEntry,
        mood: currentMood,
        emotions: currentEmotions,
        timestamp: new Date(),
        aiResponse
      };
      
      setEntries([newEntry, ...entries]);
      setCurrentEntry('');
      setCurrentMood('neutral');
      setCurrentEmotions([]);
      setAiResponse('');
      setIsGeneratingResponse(false);
      setShowTears(false);
    }
  };

  const deleteEntry = (entryId: string) => {
    setEntries(entries.filter(entry => entry.id !== entryId));
  };

  const handleVoiceTranscript = (transcript: string) => {
    if (transcript.trim()) {
      // Append voice transcript to current entry
      setCurrentEntry(prev => {
        const newContent = prev ? `${prev} ${transcript}` : transcript;
        // Trigger mood analysis for the new content
        setTimeout(() => handleEntryChange(newContent), 100);
        return newContent;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {showTears && <AnimatedTears />}
      
      {/* Header */}
      <header className="relative z-10 p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Droplets className="text-blue-400" size={32} />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Crylog
          </h1>
        </div>
        <p className="text-slate-600 text-lg font-medium">The journal that feels with you</p>
        <p className="text-slate-500 text-sm mt-1">A safe space for your emotions to exist and be understood</p>
      </header>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Journal Section */}
          <div className="lg:col-span-2 space-y-6">
            <JournalEditor
              value={currentEntry}
              onChange={handleEntryChange}
              mood={currentMood}
              isAnalyzing={isAnalyzing || isGeneratingResponse}
            />
            
            {(aiResponse || isGeneratingResponse) && (
              <EmotionalResponse
                response={aiResponse}
                mood={currentMood}
                emotions={currentEmotions}
                aiModel={selectedAIModel}
                isGenerating={isGeneratingResponse}
              />
            )}
            
            {currentEntry.trim() && (
              <button
                onClick={saveEntry}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Save Entry
              </button>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AIModelSelector
              selectedModel={selectedAIModel}
              onModelChange={setSelectedAIModel}
            />
            
            <MoodVisualization
              mood={currentMood}
              emotions={currentEmotions}
              isActive={currentEntry.length > 50}
            />
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                  <Calendar size={20} />
                  Your Journey
                </h3>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  {showHistory ? 'Hide' : 'Show'} History
                </button>
              </div>
              
              {entries.length > 0 && (
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <p className="text-2xl font-bold text-indigo-600">{entries.length}</p>
                  <p className="text-sm text-slate-600">entries written</p>
                </div>
              )}
            </div>

            {/* Comfort Features */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <Heart size={20} />
                Comfort Zone
              </h3>
              <div className="space-y-3">
                <ComfortVoicePlayer 
                  response={aiResponse} 
                  mood={currentMood} 
                />
                <AffirmationDisplay />
                <VoiceJournaling onTranscriptUpdate={handleVoiceTranscript} />
              </div>
            </div>
          </div>
        </div>

        {showHistory && (
          <div className="mt-8">
            <JournalHistory entries={entries} onDeleteEntry={deleteEntry} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;