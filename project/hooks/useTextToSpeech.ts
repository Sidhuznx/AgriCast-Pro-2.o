import { useState } from 'react';
import { Platform } from 'react-native';

interface TextToSpeechHook {
  isSpeaking: boolean;
  isSupported: boolean;
  speak: (text: string, language?: string) => Promise<void>;
  stop: () => void;
}

export function useTextToSpeech(): TextToSpeechHook {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported] = useState(() => {
    if (Platform.OS === 'web') {
      return 'speechSynthesis' in window;
    }
    return true; // Assume supported on mobile platforms
  });

  const speak = async (text: string, language: string = 'en-US'): Promise<void> => {
    if (!isSupported) {
      console.warn('Text-to-speech not supported');
      return;
    }

    try {
      setIsSpeaking(true);

      if (Platform.OS === 'web') {
        // Use Web Speech API
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onend = () => {
          setIsSpeaking(false);
        };

        utterance.onerror = () => {
          setIsSpeaking(false);
        };

        // Stop any ongoing speech
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
      } else {
        // For mobile platforms, you would use expo-speech
        // import * as Speech from 'expo-speech';
        // await Speech.speak(text, { language });
        
        // Mock implementation for demo
        setTimeout(() => {
          setIsSpeaking(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Text-to-speech error:', error);
      setIsSpeaking(false);
    }
  };

  const stop = () => {
    if (Platform.OS === 'web') {
      speechSynthesis.cancel();
    } else {
      // For mobile platforms
      // Speech.stop();
    }
    setIsSpeaking(false);
  };

  return {
    isSpeaking,
    isSupported,
    speak,
    stop,
  };
}