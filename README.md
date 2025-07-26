# 🧠 Crylog: The Emotional Journal That Cries With You

An empathetic journaling web app that reads your mood from your writing and responds with genuine comfort and understanding. Built to prioritize emotional support over logical solutions.

## ✨ Features

- **Emotional Intelligence**: Real-time mood detection from your writing
- **Empathetic AI Responses**: GPT-4o powered responses focused on comfort, not advice
- **Emotional Voice**: ElevenLabs integration for AI voice that adapts to your emotional state
- **Visual Empathy**: Animated tears and mood-responsive interface
- **Persistent Journaling**: Local storage keeps your entries safe
- **Beautiful Design**: Calming, production-ready interface built with React and Tailwind

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- OpenAI API key (for GPT-4o) OR Google AI API key (for Gemini 2.0 Flash)
- ElevenLabs API key (for voice generation)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
4. Add your API keys to `.env`:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
    VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   VITE_ELEVENLABS_VOICE_ID=your_preferred_voice_id_here
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 🔑 API Setup

### AI Models

#### OpenAI (GPT-4o)
1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Ensure you have access to GPT-4o model
3. Add the key to your `.env` file

#### Google AI (Gemini 2.0 Flash) - Alternative
1. Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Ensure you have access to Gemini 2.0 Flash model
3. Add the key to your `.env` file

*Note: You can use either OpenAI or Gemini - both are trained to provide empathetic responses*

### ElevenLabs (Voice)
1. Sign up at [ElevenLabs](https://elevenlabs.io/)
2. Get your API key from the profile section
3. Choose a voice ID from your available voices
4. Add both to your `.env` file

## 🎯 Philosophy

Crylog challenges the expectation that AI should provide logical solutions. Instead, it offers what humans often need most: genuine empathy, validation, and emotional comfort. Sometimes we don't need to be fixed - we need to be understood.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **AI**: OpenAI GPT-4o for empathetic text generation
- **Voice**: ElevenLabs for emotional voice synthesis
- **Icons**: Lucide React
- **Build**: Vite
- **Storage**: Browser localStorage

## 📱 Features in Detail

### Mood Detection
- Analyzes your writing for emotional keywords
- Detects sadness, happiness, anxiety, anger, and neutral states
- Triggers appropriate visual and audio responses

### Empathetic AI
- GPT-4o trained to provide comfort over solutions
- Responses adapt to detected emotional state
- Focus on validation and emotional support

### Emotional Voice
- ElevenLabs voice synthesis with mood-based adjustments
- Voice settings change based on detected emotions
- Provides auditory comfort and connection

### Visual Empathy
- Animated tears appear during sad moments
- Mood-responsive color schemes and animations
- Gentle, calming interface design

## 🤝 Contributing

This project represents a new paradigm in human-AI interaction. Contributions that enhance emotional intelligence and empathetic responses are especially welcome.

## 📄 License

MIT License - Feel free to use this to bring more empathy into the world.

---

*"Why do we expect logic from machines, not comfort?"* - This app proves that technology can learn to hold space for our most human moments.