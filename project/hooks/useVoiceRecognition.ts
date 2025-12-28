import { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';

interface VoiceRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

interface VoiceRecognitionHook {
  isListening: boolean;
  isSupported: boolean;
  hasPermission: boolean;
  transcript: string;
  error: string | null;
  startListening: () => Promise<void>;
  stopListening: () => void;
  requestPermission: () => Promise<boolean>;
}

export function useVoiceRecognition(): VoiceRecognitionHook {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    initializeVoiceRecognition();
  }, []);

  const initializeVoiceRecognition = () => {
    if (Platform.OS === 'web') {
      // Check for Web Speech API support
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        setIsSupported(true);
        const recognitionInstance = new SpeechRecognition();
        
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onstart = () => {
          setIsListening(true);
          setError(null);
        };

        recognitionInstance.onresult = (event: any) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          setTranscript(finalTranscript || interimTranscript);
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        recognitionInstance.onerror = (event: any) => {
          setError(event.error);
          setIsListening(false);
        };

        setRecognition(recognitionInstance);
      } else {
        setIsSupported(false);
        setError('Speech recognition not supported in this browser');
      }
    } else {
      // For mobile platforms, you would integrate with react-native-voice
      setIsSupported(true);
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'web') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        setHasPermission(true);
        return true;
      } catch (error) {
        setHasPermission(false);
        setError('Microphone permission denied');
        return false;
      }
    } else {
      // For mobile platforms, handle permissions using expo-av or react-native-permissions
      setHasPermission(true);
      return true;
    }
  };

  const startListening = async () => {
    if (!isSupported) {
      setError('Voice recognition not supported');
      return;
    }

    if (!hasPermission) {
      const granted = await requestPermission();
      if (!granted) return;
    }

    try {
      setTranscript('');
      setError(null);
      
      if (Platform.OS === 'web' && recognition) {
        recognition.start();
      } else {
        // For mobile platforms, start voice recognition
        setIsListening(true);
        // Mock implementation for demo
        setTimeout(() => {
          setTranscript('What is the weather today?');
          setIsListening(false);
        }, 2000);
      }
    } catch (error) {
      setError('Failed to start voice recognition');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (Platform.OS === 'web' && recognition) {
      recognition.stop();
    } else {
      // For mobile platforms, stop voice recognition
      setIsListening(false);
    }
  };

  return {
    isListening,
    isSupported,
    hasPermission,
    transcript,
    error,
    startListening,
    stopListening,
    requestPermission,
  };
}