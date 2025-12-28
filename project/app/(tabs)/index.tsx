import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import VoiceAssistant from '@/components/VoiceAssistant';
import { 
  Camera, 
  Droplets, 
  CloudRain, 
  TrendingUp, 
  Bell,
  Leaf,
  Sun,
  Thermometer,
  Mic,
  Store,
  Calculator,
  User
} from 'lucide-react-native';

export default function HomeScreen() {
  const { t } = useLanguage();
  const router = useRouter();

  const quickActions = [
    { 
      icon: Camera, 
      title: t('crop_diagnosis'), 
      color: '#10B981',
      route: '/diagnosis',
      description: 'Upload crop images for AI diagnosis'
    },
    { 
      icon: Mic, 
      title: t('voice_assistant'), 
      color: '#8B5CF6',
      route: null, // Special handling for voice
      description: 'Ask farming questions with voice'
    },
    { 
      icon: CloudRain, 
      title: t('weather_alerts'), 
      color: '#3B82F6',
      route: '/weather',
      description: 'Get weather forecasts and alerts'
    },
    { 
      icon: Calculator, 
      title: t('fertilizer_guide'), 
      color: '#F59E0B',
      route: '/fertilizer',
      description: 'Get personalized fertilizer recommendations'
    },
    { 
      icon: TrendingUp, 
      title: t('market_insights'), 
      color: '#EF4444',
      route: '/market',
      description: 'View market prices and trends'
    },
    { 
      icon: Store, 
      title: t('nearby_stores'), 
      color: '#06B6D4',
      route: '/stores',
      description: 'Find agricultural stores nearby'
    },
  ];

  const weatherData = {
    temperature: 28,
    humidity: 65,
    rainfall: 12,
    condition: 'Partly Cloudy',
  };

  const handleQuickAction = (action: typeof quickActions[0]) => {
    try {
      if (action.route) {
        // Navigate to the specific route
        router.push(action.route as any);
      } else if (action.title === t('voice_assistant')) {
        // Special handling for voice assistant
        Alert.alert(
          t('voice_assistant'),
          t('ask_question'),
          [
            { text: t('cancel'), style: 'cancel' },
            { text: 'OK', onPress: () => console.log('Voice assistant activated') }
          ]
        );
      }
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert(
        t('error_occurred'),
        'Unable to navigate to this section. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleWeatherTap = () => {
    try {
      router.push('/weather');
    } catch (error) {
      console.error('Weather navigation error:', error);
      Alert.alert(t('error_occurred'), 'Unable to open weather section.');
    }
  };

  const handleProfileTap = () => {
    try {
      router.push('/profile');
    } catch (error) {
      console.error('Profile navigation error:', error);
      Alert.alert(t('error_occurred'), 'Unable to open profile section.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.welcomeText}>{t('welcome')}</Text>
          </View>
          <View style={styles.headerRight}>
            <LanguageSelector />
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={handleProfileTap}
              activeOpacity={0.7}
            >
              <User size={20} color="#10B981" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section */}
        <LinearGradient
          colors={['#10B981', '#059669']}
          style={styles.heroSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Image
            source={{ uri: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.heroImage}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Smart Farming Made Simple</Text>
            <Text style={styles.heroSubtitle}>
              Get AI-powered insights for better crop management
            </Text>
          </View>
        </LinearGradient>

        {/* Voice Assistant */}
        <View style={styles.voiceSection}>
          <Text style={styles.sectionTitle}>{t('voice_assistant')}</Text>
          <Text style={styles.voicePrompt}>{t('ask_question')}</Text>
          <VoiceAssistant />
        </View>

        {/* Weather Widget */}
        <TouchableOpacity style={styles.weatherWidget} onPress={handleWeatherTap} activeOpacity={0.8}>
          <View style={styles.weatherHeader}>
            <View style={styles.weatherTitleContainer}>
              <Sun size={20} color="#F59E0B" />
              <Text style={styles.weatherTitle}>{t('current_weather')}</Text>
            </View>
            <TouchableOpacity onPress={handleWeatherTap}>
              <Bell size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <View style={styles.weatherContent}>
            <View style={styles.weatherMain}>
              <Text style={styles.temperature}>{weatherData.temperature}°C</Text>
              <Text style={styles.condition}>{weatherData.condition}</Text>
            </View>
            <View style={styles.weatherStats}>
              <View style={styles.weatherStat}>
                <Droplets size={16} color="#3B82F6" />
                <Text style={styles.statValue}>{weatherData.humidity}%</Text>
                <Text style={styles.statLabel}>Humidity</Text>
              </View>
              <View style={styles.weatherStat}>
                <CloudRain size={16} color="#8B5CF6" />
                <Text style={styles.statValue}>{weatherData.rainfall}mm</Text>
                <Text style={styles.statLabel}>Rainfall</Text>
              </View>
            </View>
          </View>
          <View style={styles.tapHint}>
            <Text style={styles.tapHintText}>Tap for detailed forecast</Text>
          </View>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.quickActionCard}
                onPress={() => handleQuickAction(action)}
                activeOpacity={0.7}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <action.icon size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
                <View style={styles.actionIndicator}>
                  <View style={[styles.actionDot, { backgroundColor: action.color }]} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Updates */}
        <View style={styles.updatesSection}>
          <Text style={styles.sectionTitle}>Recent Updates</Text>
          <TouchableOpacity style={styles.updateCard} activeOpacity={0.8}>
            <View style={styles.updateIcon}>
              <Leaf size={20} color="#10B981" />
            </View>
            <View style={styles.updateContent}>
              <Text style={styles.updateTitle}>Monsoon Advisory</Text>
              <Text style={styles.updateDescription}>
                Heavy rainfall expected in next 3 days. Check your drainage systems.
              </Text>
              <Text style={styles.updateTime}>2 hours ago</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.updateCard} activeOpacity={0.8}>
            <View style={styles.updateIcon}>
              <TrendingUp size={20} color="#F59E0B" />
            </View>
            <View style={styles.updateContent}>
              <Text style={styles.updateTitle}>Market Alert</Text>
              <Text style={styles.updateDescription}>
                Rice prices increased by 12% this week. Good time to sell.
              </Text>
              <Text style={styles.updateTime}>5 hours ago</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Access Footer */}
        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>Need Help?</Text>
          <View style={styles.footerActions}>
            <TouchableOpacity 
              style={styles.footerButton}
              onPress={() => handleQuickAction({ icon: Mic, title: t('voice_assistant'), color: '#8B5CF6', route: null, description: '' })}
              activeOpacity={0.8}
            >
              <Mic size={16} color="#FFFFFF" />
              <Text style={styles.footerButtonText}>Ask Voice Assistant</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.footerButton, styles.footerButtonSecondary]}
              onPress={() => router.push('/stores')}
              activeOpacity={0.8}
            >
              <Store size={16} color="#10B981" />
              <Text style={[styles.footerButtonText, styles.footerButtonTextSecondary]}>Find Dealers</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginTop: 2,
  },
  heroSection: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    height: 160,
    position: 'relative',
  },
  heroImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  voiceSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  voicePrompt: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  weatherWidget: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  weatherTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  weatherTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  weatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  weatherMain: {
    alignItems: 'flex-start',
  },
  temperature: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
  },
  condition: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  weatherStats: {
    flexDirection: 'row',
    gap: 24,
  },
  weatherStat: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  tapHint: {
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  tapHintText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#10B981',
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    position: 'relative',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 8,
  },
  actionIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  actionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  updatesSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  updateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  updateIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  updateContent: {
    flex: 1,
  },
  updateTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  updateDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  updateTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  footerSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    marginTop: 12,
  },
  footerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  footerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  footerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  footerButtonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  footerButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  footerButtonTextSecondary: {
    color: '#10B981',
  },
});