import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sun, Cloud, CloudRain, Droplets, Wind, Thermometer, Eye, Calendar, Bell, TriangleAlert as AlertTriangle, MapPin, Clock, RefreshCw, Gauge, Sunrise, Sunset } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';
import { useWeather } from '@/hooks/useWeather';

export default function WeatherScreen() {
  const { t } = useLanguage();
  const { weatherData, loading, error, refreshWeather } = useWeather();
  const [selectedTab, setSelectedTab] = useState('current');

  const alerts = [
    {
      type: 'warning',
      title: 'Heavy Rainfall Alert',
      message: 'Heavy rain expected tomorrow. Postpone spraying activities.',
      time: '2 hours ago',
    },
    {
      type: 'info',
      title: 'Irrigation Advisory',
      message: 'Optimal irrigation time: 6 AM - 8 AM due to low humidity.',
      time: '5 hours ago',
    },
  ];

  const farmingTips = [
    'Good time for field preparation due to clear weather',
    'Apply foliar fertilizers in the evening when humidity is higher',
    'Monitor crops for pest activity as temperature is favorable',
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return Sun;
      case 'clouds':
        return Cloud;
      case 'rain':
      case 'drizzle':
        return CloudRain;
      default:
        return Sun;
    }
  };

  const WeatherIcon = ({ condition, size = 24, color = '#F59E0B' }) => {
    const IconComponent = getWeatherIcon(condition);
    return <IconComponent size={size} color={color} />;
  };

  if (error && !weatherData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <AlertTriangle size={48} color="#EF4444" />
          <Text style={styles.errorTitle}>{t('error_occurred')}</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refreshWeather}>
            <RefreshCw size={16} color="#FFFFFF" />
            <Text style={styles.retryButtonText}>{t('retry')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshWeather} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('weather_alerts')}</Text>
          <Text style={styles.subtitle}>
            Stay updated with weather conditions and farming advisories
          </Text>
          
          {/* Current Date & Time */}
          {weatherData && (
            <View style={styles.dateTimeCard}>
              <View style={styles.dateTimeHeader}>
                <Clock size={16} color="#10B981" />
                <Text style={styles.dateTimeTitle}>{t('current_date_time')}</Text>
                {error && (
                  <View style={styles.offlineIndicator}>
                    <Text style={styles.offlineText}>Offline</Text>
                  </View>
                )}
              </View>
              <Text style={styles.currentDateTime}>{weatherData.currentDateTime}</Text>
              <View style={styles.locationRow}>
                <MapPin size={12} color="#6B7280" />
                <Text style={styles.location}>{weatherData.location}</Text>
                <Text style={styles.lastUpdated}>
                  {t('last_updated')}: {weatherData.lastUpdated}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'current' && styles.activeTab]}
            onPress={() => setSelectedTab('current')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'current' && styles.activeTabText,
              ]}
            >
              Current
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'forecast' && styles.activeTab]}
            onPress={() => setSelectedTab('forecast')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'forecast' && styles.activeTabText,
              ]}
            >
              Forecast
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'alerts' && styles.activeTab]}
            onPress={() => setSelectedTab('alerts')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'alerts' && styles.activeTabText,
              ]}
            >
              Alerts
            </Text>
          </TouchableOpacity>
        </View>

        {/* Current Weather */}
        {selectedTab === 'current' && weatherData && (
          <View style={styles.currentWeatherSection}>
            <View style={styles.currentWeatherCard}>
              <View style={styles.mainWeather}>
                <View style={styles.temperatureSection}>
                  <Text style={styles.temperature}>{weatherData.temperature}°C</Text>
                  <Text style={styles.condition}>{weatherData.condition}</Text>
                  <Text style={styles.feelsLike}>Feels like {weatherData.feelsLike}°C</Text>
                </View>
                <WeatherIcon condition={weatherData.condition} size={64} />
              </View>

              <View style={styles.weatherDetails}>
                <View style={styles.detailItem}>
                  <Droplets size={16} color="#3B82F6" />
                  <Text style={styles.detailLabel}>Humidity</Text>
                  <Text style={styles.detailValue}>{weatherData.humidity}%</Text>
                </View>
                <View style={styles.detailItem}>
                  <Wind size={16} color="#10B981" />
                  <Text style={styles.detailLabel}>Wind</Text>
                  <Text style={styles.detailValue}>{weatherData.windSpeed} km/h</Text>
                </View>
                <View style={styles.detailItem}>
                  <Eye size={16} color="#8B5CF6" />
                  <Text style={styles.detailLabel}>Visibility</Text>
                  <Text style={styles.detailValue}>{weatherData.visibility} km</Text>
                </View>
                <View style={styles.detailItem}>
                  <Gauge size={16} color="#F59E0B" />
                  <Text style={styles.detailLabel}>Pressure</Text>
                  <Text style={styles.detailValue}>{weatherData.pressure} hPa</Text>
                </View>
              </View>

              <View style={styles.sunTimes}>
                <View style={styles.sunTimeItem}>
                  <Sunrise size={16} color="#F59E0B" />
                  <Text style={styles.sunTimeLabel}>Sunrise</Text>
                  <Text style={styles.sunTimeValue}>{weatherData.sunrise}</Text>
                </View>
                <View style={styles.sunTimeItem}>
                  <Sunset size={16} color="#EF4444" />
                  <Text style={styles.sunTimeLabel}>Sunset</Text>
                  <Text style={styles.sunTimeValue}>{weatherData.sunset}</Text>
                </View>
              </View>
            </View>

            {/* Farming Tips */}
            <View style={styles.tipsCard}>
              <View style={styles.cardHeader}>
                <Sun size={20} color="#F59E0B" />
                <Text style={styles.cardTitle}>Today's Farming Tips</Text>
              </View>
              {farmingTips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <Text style={styles.tipText}>• {tip}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Forecast */}
        {selectedTab === 'forecast' && weatherData && (
          <View style={styles.forecastSection}>
            {/* Hourly Forecast */}
            <View style={styles.forecastCard}>
              <Text style={styles.forecastTitle}>Hourly Forecast</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.hourlyContainer}>
                  {weatherData.hourlyForecast.map((hour, index) => (
                    <View key={index} style={styles.hourlyItem}>
                      <Text style={styles.hourlyTime}>{hour.time}</Text>
                      <WeatherIcon condition={hour.condition} size={32} />
                      <Text style={styles.hourlyTemp}>{hour.temperature}°</Text>
                      <View style={styles.rainChance}>
                        <Droplets size={12} color="#3B82F6" />
                        <Text style={styles.rainPercent}>{hour.precipitation}%</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Weekly Forecast */}
            <View style={styles.forecastCard}>
              <Text style={styles.forecastTitle}>7-Day Forecast</Text>
              {weatherData.forecast.map((day, index) => (
                <View key={index} style={styles.weeklyItem}>
                  <Text style={styles.dayName}>{day.date}</Text>
                  <View style={styles.dayWeather}>
                    <WeatherIcon condition={day.condition} size={24} />
                    <View style={styles.temperatureRange}>
                      <Text style={styles.highTemp}>{day.high}°</Text>
                      <Text style={styles.lowTemp}>{day.low}°</Text>
                    </View>
                    <View style={styles.rainChance}>
                      <Droplets size={12} color="#3B82F6" />
                      <Text style={styles.rainPercent}>{day.precipitation}%</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Alerts */}
        {selectedTab === 'alerts' && (
          <View style={styles.alertsSection}>
            {alerts.map((alert, index) => (
              <View key={index} style={styles.alertCard}>
                <View style={styles.alertHeader}>
                  <AlertTriangle
                    size={20}
                    color={alert.type === 'warning' ? '#F59E0B' : '#3B82F6'}
                  />
                  <View style={styles.alertTitleContainer}>
                    <Text style={styles.alertTitle}>{alert.title}</Text>
                    <Text style={styles.alertTime}>{alert.time}</Text>
                  </View>
                </View>
                <Text style={styles.alertMessage}>{alert.message}</Text>
              </View>
            ))}

            {/* Subscribe to Alerts */}
            <TouchableOpacity style={styles.subscribeButton}>
              <Bell size={20} color="#FFFFFF" />
              <Text style={styles.subscribeButtonText}>
                Subscribe to Weather Alerts
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 16,
  },
  dateTimeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  dateTimeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  dateTimeTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
    flex: 1,
  },
  offlineIndicator: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  offlineText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#F59E0B',
  },
  currentDateTime: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    flex: 1,
  },
  lastUpdated: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#1F2937',
  },
  currentWeatherSection: {
    paddingHorizontal: 20,
  },
  currentWeatherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mainWeather: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  temperatureSection: {
    flex: 1,
  },
  temperature: {
    fontSize: 48,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
  },
  condition: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  feelsLike: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 4,
  },
  weatherDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  detailItem: {
    alignItems: 'center',
    gap: 4,
    width: '48%',
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  sunTimes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  sunTimeItem: {
    alignItems: 'center',
    gap: 4,
  },
  sunTimeLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  sunTimeValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  tipsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  tipItem: {
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  forecastSection: {
    paddingHorizontal: 20,
  },
  forecastCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  forecastTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  hourlyContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  hourlyItem: {
    alignItems: 'center',
    paddingVertical: 8,
    minWidth: 60,
  },
  hourlyTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  hourlyTemp: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginVertical: 8,
  },
  rainChance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rainPercent: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#3B82F6',
  },
  weeklyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dayName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    flex: 1,
  },
  dayWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  temperatureRange: {
    flexDirection: 'row',
    gap: 8,
  },
  highTemp: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  lowTemp: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  alertsSection: {
    paddingHorizontal: 20,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  alertTitleContainer: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  alertTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  alertMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginLeft: 32,
  },
  subscribeButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});