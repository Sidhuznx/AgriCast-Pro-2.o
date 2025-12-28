import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Droplets, Leaf, Calculator, Clock, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';

export default function FertilizerScreen() {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('');
  const [soilType, setSoilType] = useState('');
  const [landSize, setLandSize] = useState('');
  const [growthStage, setGrowthStage] = useState('');
  const [recommendation, setRecommendation] = useState<any>(null);

  const crops = ['Rice', 'Wheat', 'Corn', 'Cotton', 'Sugarcane', 'Tomato'];
  const soilTypes = ['Clay', 'Sandy', 'Loam', 'Silt', 'Peat'];
  const growthStages = ['Seedling', 'Vegetative', 'Flowering', 'Fruiting', 'Maturity'];

  const generateRecommendation = () => {
    if (!selectedCrop || !soilType || !landSize || !growthStage) {
      return;
    }

    const mockRecommendation = {
      crop: selectedCrop,
      area: landSize,
      primaryNutrients: {
        nitrogen: { amount: '120 kg', timing: 'Split in 3 doses' },
        phosphorus: { amount: '60 kg', timing: 'At sowing' },
        potassium: { amount: '40 kg', timing: 'At flowering' },
      },
      micronutrients: [
        { name: 'Zinc', amount: '5 kg/acre', method: 'Soil application' },
        { name: 'Iron', amount: '2 kg/acre', method: 'Foliar spray' },
      ],
      organicOptions: [
        { name: 'Compost', amount: '5 tons/acre', benefit: 'Improves soil structure' },
        { name: 'Vermicompost', amount: '2 tons/acre', benefit: 'Rich in nutrients' },
        { name: 'Green Manure', amount: '3 tons/acre', benefit: 'Nitrogen fixation' },
      ],
      schedule: [
        { stage: 'Basal', timing: 'At sowing', fertilizer: 'NPK 10:26:26', amount: '50 kg' },
        { stage: 'First dose', timing: '21 days', fertilizer: 'Urea', amount: '30 kg' },
        { stage: 'Second dose', timing: '45 days', fertilizer: 'Urea + MOP', amount: '25 kg each' },
      ],
      precautions: [
        'Apply fertilizers in cool weather (morning/evening)',
        'Ensure adequate soil moisture before application',
        'Mix fertilizers with soil to prevent burning',
        'Avoid application during flowering if using foliar spray',
      ],
    };

    setRecommendation(mockRecommendation);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Fertilizer Recommendation</Text>
          <Text style={styles.subtitle}>
            Get personalized fertilizer recommendations for optimal crop growth
          </Text>
        </View>

        {/* Input Form */}
        <View style={styles.formSection}>
          {/* Crop Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Crop</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.optionContainer}>
                {crops.map((crop) => (
                  <TouchableOpacity
                    key={crop}
                    style={[
                      styles.optionButton,
                      selectedCrop === crop && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedCrop(crop)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedCrop === crop && styles.selectedOptionText,
                      ]}
                    >
                      {crop}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Soil Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Soil Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.optionContainer}>
                {soilTypes.map((soil) => (
                  <TouchableOpacity
                    key={soil}
                    style={[
                      styles.optionButton,
                      soilType === soil && styles.selectedOption,
                    ]}
                    onPress={() => setSoilType(soil)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        soilType === soil && styles.selectedOptionText,
                      ]}
                    >
                      {soil}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Land Size */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Land Size (acres)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter land size in acres"
              value={landSize}
              onChangeText={setLandSize}
              keyboardType="numeric"
            />
          </View>

          {/* Growth Stage */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Growth Stage</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.optionContainer}>
                {growthStages.map((stage) => (
                  <TouchableOpacity
                    key={stage}
                    style={[
                      styles.optionButton,
                      growthStage === stage && styles.selectedOption,
                    ]}
                    onPress={() => setGrowthStage(stage)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        growthStage === stage && styles.selectedOptionText,
                      ]}
                    >
                      {stage}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Generate Button */}
          <TouchableOpacity
            style={[
              styles.generateButton,
              (!selectedCrop || !soilType || !landSize || !growthStage) &&
                styles.disabledButton,
            ]}
            onPress={generateRecommendation}
            disabled={!selectedCrop || !soilType || !landSize || !growthStage}
          >
            <Calculator size={20} color="#FFFFFF" />
            <Text style={styles.generateButtonText}>Generate Recommendation</Text>
          </TouchableOpacity>
        </View>

        {/* Recommendation Results */}
        {recommendation && (
          <View style={styles.recommendationSection}>
            <Text style={styles.sectionTitle}>Fertilizer Recommendation</Text>

            {/* Primary Nutrients */}
            <View style={styles.nutrientCard}>
              <View style={styles.cardHeader}>
                <Droplets size={20} color="#10B981" />
                <Text style={styles.cardTitle}>Primary Nutrients (NPK)</Text>
              </View>
              <View style={styles.nutrientGrid}>
                <View style={styles.nutrientItem}>
                  <Text style={styles.nutrientName}>Nitrogen (N)</Text>
                  <Text style={styles.nutrientAmount}>
                    {recommendation.primaryNutrients.nitrogen.amount}
                  </Text>
                  <Text style={styles.nutrientTiming}>
                    {recommendation.primaryNutrients.nitrogen.timing}
                  </Text>
                </View>
                <View style={styles.nutrientItem}>
                  <Text style={styles.nutrientName}>Phosphorus (P)</Text>
                  <Text style={styles.nutrientAmount}>
                    {recommendation.primaryNutrients.phosphorus.amount}
                  </Text>
                  <Text style={styles.nutrientTiming}>
                    {recommendation.primaryNutrients.phosphorus.timing}
                  </Text>
                </View>
                <View style={styles.nutrientItem}>
                  <Text style={styles.nutrientName}>Potassium (K)</Text>
                  <Text style={styles.nutrientAmount}>
                    {recommendation.primaryNutrients.potassium.amount}
                  </Text>
                  <Text style={styles.nutrientTiming}>
                    {recommendation.primaryNutrients.potassium.timing}
                  </Text>
                </View>
              </View>
            </View>

            {/* Application Schedule */}
            <View style={styles.scheduleCard}>
              <View style={styles.cardHeader}>
                <Clock size={20} color="#3B82F6" />
                <Text style={styles.cardTitle}>Application Schedule</Text>
              </View>
              {recommendation.schedule.map((item: any, index: number) => (
                <View key={index} style={styles.scheduleItem}>
                  <View style={styles.scheduleStage}>
                    <Text style={styles.stageTitle}>{item.stage}</Text>
                    <Text style={styles.stageTiming}>{item.timing}</Text>
                  </View>
                  <View style={styles.scheduleDetails}>
                    <Text style={styles.fertilizerName}>{item.fertilizer}</Text>
                    <Text style={styles.fertilizerAmount}>{item.amount}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Organic Options */}
            <View style={styles.organicCard}>
              <View style={styles.cardHeader}>
                <Leaf size={20} color="#059669" />
                <Text style={styles.cardTitle}>Organic Alternatives</Text>
              </View>
              {recommendation.organicOptions.map((option: any, index: number) => (
                <View key={index} style={styles.organicItem}>
                  <View>
                    <Text style={styles.organicName}>{option.name}</Text>
                    <Text style={styles.organicAmount}>{option.amount}</Text>
                  </View>
                  <Text style={styles.organicBenefit}>{option.benefit}</Text>
                </View>
              ))}
            </View>

            {/* Precautions */}
            <View style={styles.precautionsCard}>
              <View style={styles.cardHeader}>
                <AlertTriangle size={20} color="#F59E0B" />
                <Text style={styles.cardTitle}>Application Precautions</Text>
              </View>
              {recommendation.precautions.map((precaution: string, index: number) => (
                <View key={index} style={styles.precautionItem}>
                  <Text style={styles.precautionText}>• {precaution}</Text>
                </View>
              ))}
            </View>
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
  },
  formSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  optionContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedOption: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    backgroundColor: '#FFFFFF',
  },
  generateButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  recommendationSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  nutrientCard: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  nutrientGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutrientItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  nutrientName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  nutrientAmount: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#10B981',
    marginBottom: 4,
  },
  nutrientTiming: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  scheduleCard: {
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
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  scheduleStage: {
    flex: 1,
  },
  stageTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  stageTiming: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  scheduleDetails: {
    alignItems: 'flex-end',
  },
  fertilizerName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
  },
  fertilizerAmount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  organicCard: {
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
  organicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  organicName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  organicAmount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  organicBenefit: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#059669',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  precautionsCard: {
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
  precautionItem: {
    paddingVertical: 4,
  },
  precautionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
});