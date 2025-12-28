import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, TrendingDown, ChartBar as BarChart3, Target, Calendar, MapPin, IndianRupee } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';

export default function MarketScreen() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('grains');

  const categories = [
    { id: 'grains', name: 'Grains', icon: '🌾' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥕' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'pulses', name: 'Pulses', icon: '🫘' },
  ];

  const marketData = {
    grains: [
      {
        name: 'Rice',
        currentPrice: 2800,
        previousPrice: 2650,
        change: 5.7,
        trend: 'up',
        unit: 'per quintal',
        market: 'Delhi Mandi',
      },
      {
        name: 'Wheat',
        currentPrice: 2200,
        previousPrice: 2350,
        change: -6.4,
        trend: 'down',
        unit: 'per quintal',
        market: 'Punjab Mandi',
      },
      {
        name: 'Corn',
        currentPrice: 1800,
        previousPrice: 1750,
        change: 2.9,
        trend: 'up',
        unit: 'per quintal',
        market: 'UP Mandi',
      },
    ],
    vegetables: [
      {
        name: 'Tomato',
        currentPrice: 45,
        previousPrice: 38,
        change: 18.4,
        trend: 'up',
        unit: 'per kg',
        market: 'Mumbai Mandi',
      },
      {
        name: 'Onion',
        currentPrice: 35,
        previousPrice: 42,
        change: -16.7,
        trend: 'down',
        unit: 'per kg',
        market: 'Pune Mandi',
      },
    ],
  };

  const recommendations = [
    {
      crop: 'Soybean',
      reason: 'Demand increasing, good monsoon forecast',
      profitability: 'High',
      season: 'Kharif',
      investment: '₹25,000/acre',
      expectedReturn: '₹45,000/acre',
    },
    {
      crop: 'Cotton',
      reason: 'Export demand strong, favorable weather',
      profitability: 'Medium',
      season: 'Kharif',
      investment: '₹30,000/acre',
      expectedReturn: '₹48,000/acre',
    },
  ];

  const priceAlerts = [
    {
      crop: 'Rice',
      targetPrice: 3000,
      currentPrice: 2800,
      percentage: 7.1,
    },
    {
      crop: 'Wheat',
      targetPrice: 2500,
      currentPrice: 2200,
      percentage: 13.6,
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const currentData = marketData[selectedCategory as keyof typeof marketData] || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Market Insights</Text>
          <Text style={styles.subtitle}>
            Live market prices and profitable crop recommendations
          </Text>
        </View>

        {/* Categories */}
        <View style={styles.categorySection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    selectedCategory === category.id && styles.selectedCategory,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text
                    style={[
                      styles.categoryName,
                      selectedCategory === category.id && styles.selectedCategoryText,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Current Prices */}
        <View style={styles.pricesSection}>
          <Text style={styles.sectionTitle}>Current Market Prices</Text>
          {currentData.map((item, index) => (
            <View key={index} style={styles.priceCard}>
              <View style={styles.priceHeader}>
                <View>
                  <Text style={styles.cropName}>{item.name}</Text>
                  <Text style={styles.marketLocation}>
                    <MapPin size={12} color="#6B7280" /> {item.market}
                  </Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.currentPrice}>
                    {formatPrice(item.currentPrice)}
                  </Text>
                  <Text style={styles.priceUnit}>{item.unit}</Text>
                </View>
              </View>
              <View style={styles.priceChange}>
                <View
                  style={[
                    styles.changeIndicator,
                    item.trend === 'up' ? styles.priceUp : styles.priceDown,
                  ]}
                >
                  {item.trend === 'up' ? (
                    <TrendingUp size={14} color="#10B981" />
                  ) : (
                    <TrendingDown size={14} color="#EF4444" />
                  )}
                  <Text
                    style={[
                      styles.changePercent,
                      item.trend === 'up' ? styles.changeUp : styles.changeDown,
                    ]}
                  >
                    {Math.abs(item.change).toFixed(1)}%
                  </Text>
                </View>
                <Text style={styles.previousPrice}>
                  from {formatPrice(item.previousPrice)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Price Alerts */}
        <View style={styles.alertsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Price Alerts</Text>
            <TouchableOpacity style={styles.addAlertButton}>
              <Text style={styles.addAlertText}>+ Add Alert</Text>
            </TouchableOpacity>
          </View>
          {priceAlerts.map((alert, index) => (
            <View key={index} style={styles.alertCard}>
              <View style={styles.alertInfo}>
                <Text style={styles.alertCrop}>{alert.crop}</Text>
                <Text style={styles.alertTarget}>
                  Target: {formatPrice(alert.targetPrice)}
                </Text>
              </View>
              <View style={styles.alertProgress}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.min(
                          (alert.currentPrice / alert.targetPrice) * 100,
                          100
                        )}%`,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.alertPercentage}>
                  {alert.percentage.toFixed(1)}% to go
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Crop Recommendations */}
        <View style={styles.recommendationsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Profitable Crops</Text>
            <BarChart3 size={20} color="#6B7280" />
          </View>
          {recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationCard}>
              <View style={styles.recHeader}>
                <View>
                  <Text style={styles.recCropName}>{rec.crop}</Text>
                  <Text style={styles.recSeason}>
                    <Calendar size={12} color="#6B7280" /> {rec.season} Season
                  </Text>
                </View>
                <View
                  style={[
                    styles.profitabilityBadge,
                    rec.profitability === 'High'
                      ? styles.highProfit
                      : styles.mediumProfit,
                  ]}
                >
                  <Text
                    style={[
                      styles.profitabilityText,
                      rec.profitability === 'High'
                        ? styles.highProfitText
                        : styles.mediumProfitText,
                    ]}
                  >
                    {rec.profitability}
                  </Text>
                </View>
              </View>
              <Text style={styles.recReason}>{rec.reason}</Text>
              <View style={styles.recFinancials}>
                <View style={styles.financial}>
                  <Text style={styles.financialLabel}>Investment</Text>
                  <Text style={styles.financialValue}>{rec.investment}</Text>
                </View>
                <View style={styles.financial}>
                  <Text style={styles.financialLabel}>Expected Return</Text>
                  <Text style={styles.financialValue}>{rec.expectedReturn}</Text>
                </View>
              </View>
            </View>
          ))}
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
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 80,
  },
  selectedCategory: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  selectedCategoryText: {
    color: '#10B981',
  },
  pricesSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  priceCard: {
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
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cropName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  marketLocation: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
  },
  priceUnit: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  priceChange: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceUp: {
    backgroundColor: '#ECFDF5',
  },
  priceDown: {
    backgroundColor: '#FEF2F2',
  },
  changePercent: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  changeUp: {
    color: '#10B981',
  },
  changeDown: {
    color: '#EF4444',
  },
  previousPrice: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  alertsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addAlertButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#10B981',
    borderRadius: 8,
  },
  addAlertText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
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
  alertInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  alertCrop: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  alertTarget: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
  alertProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
  },
  alertPercentage: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  recommendationsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  recommendationCard: {
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
  recHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recCropName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  recSeason: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profitabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  highProfit: {
    backgroundColor: '#ECFDF5',
  },
  mediumProfit: {
    backgroundColor: '#FEF3C7',
  },
  profitabilityText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  highProfitText: {
    color: '#10B981',
  },
  mediumProfitText: {
    color: '#F59E0B',
  },
  recReason: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  recFinancials: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  financial: {
    flex: 1,
  },
  financialLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  financialValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginTop: 2,
  },
});