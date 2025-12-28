import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { Mic, MicOff, Volume2, Loader } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'expo-router';

interface VoiceResponse {
  text: string;
  action?: {
    type: 'navigate' | 'info';
    route?: string;
    data?: any;
  };
}

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [hasPermission, setHasPermission] = useState(false);
  const { t, language } = useLanguage();
  const router = useRouter();

  // Mock voice commands and responses
  const voiceCommands = {
    en: {
      weather: ['weather', 'forecast', 'rain', 'temperature', 'climate'],
      fertilizer: ['fertilizer', 'nutrients', 'npk', 'organic', 'manure'],
      diagnosis: ['disease', 'pest', 'crop problem', 'plant issue', 'diagnosis'],
      market: ['price', 'market', 'sell', 'buy', 'mandi'],
      stores: ['store', 'shop', 'dealer', 'supplier', 'buy inputs'],
    },
    hi: {
      weather: ['मौसम', 'बारिश', 'तापमान', 'जलवायु'],
      fertilizer: ['खाद', 'उर्वरक', 'पोषक तत्व', 'जैविक'],
      diagnosis: ['बीमारी', 'कीट', 'फसल समस्या', 'पौधे की समस्या'],
      market: ['मूल्य', 'बाजार', 'बेचना', 'खरीदना', 'मंडी'],
      stores: ['दुकान', 'डीलर', 'आपूर्तिकर्ता'],
    },
    te: {
      weather: ['వాతావరణం', 'వర్షం', 'ఉష్ణోగ్రత', 'వాతావరణ'],
      fertilizer: ['ఎరువులు', 'పోషకాలు', 'సేంద్రీయ'],
      diagnosis: ['వ్యాధి', 'కీటకాలు', 'పంట సమస్య', 'మొక్క సమస్య'],
      market: ['ధర', 'మార్కెట్', 'అమ్మకం', 'కొనుగోలు', 'మండి'],
      stores: ['దుకాణం', 'డీలర్', 'సరఫరాదారు'],
    },
  };

  const responses = {
    en: {
      weather: "I'll show you the current weather and forecast. The weather looks good for farming activities today.",
      fertilizer: "Based on your crops and soil type, I recommend NPK fertilizer with a 10:26:26 ratio. Apply 50kg per acre during the basal stage.",
      diagnosis: "Please upload a clear photo of your crop for AI-powered disease diagnosis. I'll help identify any issues.",
      market: "Current rice prices are ₹2,800 per quintal, up 5.7% from last week. Good time to sell!",
      stores: "I found 5 agricultural stores within 10km. Green Valley Agri Store is closest at 2.3km.",
      default: "I can help you with weather updates, fertilizer recommendations, crop diagnosis, market prices, and finding nearby stores. What would you like to know?",
    },
    hi: {
      weather: "मैं आपको वर्तमान मौसम और पूर्वानुमान दिखाऊंगा। आज खेती के लिए मौसम अच्छा लग रहा है।",
      fertilizer: "आपकी फसलों और मिट्टी के प्रकार के आधार पर, मैं 10:26:26 अनुपात के साथ NPK उर्वरक की सिफारिश करता हूं।",
      diagnosis: "कृपया AI-संचालित रोग निदान के लिए अपनी फसल की स्पष्ट तस्वीर अपलोड करें।",
      market: "वर्तमान चावल की कीमत ₹2,800 प्रति क्विंटल है, पिछले सप्ताह से 5.7% अधिक।",
      stores: "मुझे 10 किमी के भीतर 5 कृषि स्टोर मिले। ग्रीन वैली एग्री स्टोर 2.3 किमी पर सबसे नजदीक है।",
      default: "मैं मौसम अपडेट, उर्वरक सिफारिशों, फसल निदान, बाजार मूल्य और आस-पास के स्टोर खोजने में आपकी मदद कर सकता हूं।",
    },
    te: {
      weather: "నేను మీకు ప్రస్తుత వాతావరణం మరియు అంచనాను చూపిస్తాను। ఈరోజు వ్యవసాయ కార్యకలాపాలకు వాతావరణం బాగుంది.",
      fertilizer: "మీ పంటలు మరియు నేల రకం ఆధారంగా, నేను 10:26:26 నిష్పత్తితో NPK ఎరువును సిఫార్సు చేస్తాను।",
      diagnosis: "AI-శక్తితో వ్యాధి నిర్ధారణ కోసం దయచేసి మీ పంట యొక్క స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి।",
      market: "ప్రస్తుత బియ్యం ధరలు క్వింటల్‌కు ₹2,800, గత వారంతో పోలిస్తే 5.7% పెరుగుదల.",
      stores: "నేను 10 కిమీ పరిధిలో 5 వ్యవసాయ దుకాణాలను కనుగొన్నాను। గ్రీన్ వ్యాలీ అగ్రి స్టోర్ 2.3 కిమీ దూరంలో అత్యంత దగ్గరగా ఉంది.",
      default: "నేను వాతావరణ అప్‌డేట్‌లు, ఎరువుల సిఫార్సులు, పంట నిర్ధారణ, మార్కెట్ ధరలు మరియు సమీప దుకాణాలను కనుగొనడంలో మీకు సహాయం చేయగలను।",
    },
  };

  useEffect(() => {
    checkMicrophonePermission();
  }, []);

  const checkMicrophonePermission = async () => {
    if (Platform.OS === 'web') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        setHasPermission(true);
      } catch (error) {
        setHasPermission(false);
      }
    } else {
      // For mobile platforms, you would use expo-av or react-native-voice here
      setHasPermission(true);
    }
  };

  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'web') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        setHasPermission(true);
        return true;
      } catch (error) {
        Alert.alert(
          t('microphone_permission_required'),
          'Please allow microphone access to use voice features.',
          [{ text: 'OK' }]
        );
        return false;
      }
    }
    return true;
  };

  const startListening = async () => {
    if (!hasPermission) {
      const granted = await requestMicrophonePermission();
      if (!granted) return;
    }

    setIsListening(true);
    setTranscript('');

    if (Platform.OS === 'web') {
      // Web Speech API simulation
      setTimeout(() => {
        const mockTranscripts = [
          'What is the weather today?',
          'Show me fertilizer recommendations for rice',
          'Check market prices for wheat',
          'Find nearby agricultural stores',
          'Diagnose my crop disease',
        ];
        const randomTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
        setTranscript(randomTranscript);
        setIsListening(false);
        processVoiceCommand(randomTranscript);
      }, 2000);
    } else {
      // For mobile platforms, integrate with react-native-voice or expo-speech
      setTimeout(() => {
        setIsListening(false);
        processVoiceCommand('What is the weather today?');
      }, 3000);
    }
  };

  const processVoiceCommand = (text: string) => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const response = analyzeCommand(text.toLowerCase());
      setIsProcessing(false);
      playResponse(response);
    }, 1000);
  };

  const analyzeCommand = (text: string): VoiceResponse => {
    const commands = voiceCommands[language] || voiceCommands.en;
    const responseTexts = responses[language] || responses.en;

    // Check for weather-related keywords
    if (commands.weather.some(keyword => text.includes(keyword))) {
      return {
        text: responseTexts.weather,
        action: { type: 'navigate', route: '/weather' }
      };
    }

    // Check for fertilizer-related keywords
    if (commands.fertilizer.some(keyword => text.includes(keyword))) {
      return {
        text: responseTexts.fertilizer,
        action: { type: 'navigate', route: '/fertilizer' }
      };
    }

    // Check for diagnosis-related keywords
    if (commands.diagnosis.some(keyword => text.includes(keyword))) {
      return {
        text: responseTexts.diagnosis,
        action: { type: 'navigate', route: '/diagnosis' }
      };
    }

    // Check for market-related keywords
    if (commands.market.some(keyword => text.includes(keyword))) {
      return {
        text: responseTexts.market,
        action: { type: 'navigate', route: '/market' }
      };
    }

    // Check for store-related keywords
    if (commands.stores.some(keyword => text.includes(keyword))) {
      return {
        text: responseTexts.stores,
        action: { type: 'navigate', route: '/stores' }
      };
    }

    return {
      text: responseTexts.default,
      action: { type: 'info' }
    };
  };

  const playResponse = (response: VoiceResponse) => {
    setIsPlaying(true);

    // Simulate text-to-speech
    setTimeout(() => {
      setIsPlaying(false);
      
      Alert.alert(
        'Voice Assistant',
        response.text,
        [
          { text: 'Cancel', style: 'cancel' },
          response.action?.route ? {
            text: 'Open',
            onPress: () => {
              try {
                router.push(response.action!.route as any);
              } catch (error) {
                console.error('Navigation error:', error);
              }
            }
          } : { text: 'OK' }
        ]
      );
    }, 2000);
  };

  const getStatusText = () => {
    if (isListening) return 'Listening...';
    if (isProcessing) return 'Processing...';
    if (isPlaying) return 'Speaking...';
    return t('tap_to_speak');
  };

  const getButtonStyle = () => {
    if (isListening) return [styles.voiceButton, styles.listening];
    if (isProcessing) return [styles.voiceButton, styles.processing];
    if (isPlaying) return [styles.voiceButton, styles.speaking];
    return styles.voiceButton;
  };

  const getButtonIcon = () => {
    if (isListening) return <MicOff size={24} color="#FFFFFF" />;
    if (isProcessing) return <Loader size={24} color="#FFFFFF" />;
    if (isPlaying) return <Volume2 size={24} color="#FFFFFF" />;
    return <Mic size={24} color="#FFFFFF" />;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={startListening}
        disabled={isListening || isProcessing || isPlaying}
        activeOpacity={0.8}
      >
        {getButtonIcon()}
      </TouchableOpacity>
      
      <Text style={styles.statusText}>
        {getStatusText()}
      </Text>

      {transcript && (
        <View style={styles.transcriptContainer}>
          <Text style={styles.transcriptLabel}>You said:</Text>
          <Text style={styles.transcriptText}>"{transcript}"</Text>
        </View>
      )}

      {(isListening || isProcessing) && (
        <View style={styles.activityIndicator}>
          <View style={[styles.pulse, isListening && styles.pulseListening]} />
          <View style={[styles.pulse, styles.pulseDelay, isListening && styles.pulseListening]} />
          <View style={[styles.pulse, styles.pulseDelay2, isListening && styles.pulseListening]} />
        </View>
      )}

      <Text style={styles.hintText}>
        Try: "What's the weather?" or "Fertilizer for rice"
      </Text>

      {!hasPermission && (
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={requestMicrophonePermission}
          activeOpacity={0.7}
        >
          <Text style={styles.permissionButtonText}>
            {t('grant_permission')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  voiceButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  listening: {
    backgroundColor: '#EF4444',
  },
  processing: {
    backgroundColor: '#F59E0B',
  },
  speaking: {
    backgroundColor: '#3B82F6',
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  transcriptContainer: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    maxWidth: 280,
  },
  transcriptLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#059669',
    marginBottom: 4,
  },
  transcriptText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    fontStyle: 'italic',
  },
  hintText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 4,
  },
  activityIndicator: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulse: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981',
    opacity: 0.3,
  },
  pulseListening: {
    backgroundColor: '#EF4444',
  },
  pulseDelay: {
    animationDelay: '0.5s',
  },
  pulseDelay2: {
    animationDelay: '1s',
  },
  permissionButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  permissionButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});