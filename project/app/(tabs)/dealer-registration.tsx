import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Store, MapPin, Phone, Mail, Package, CircleCheck as CheckCircle, User, Building } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';

interface DealerFormData {
  ownerName: string;
  storeName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  businessType: string;
  products: string[];
  experience: string;
  licenseNumber: string;
}

export default function DealerRegistrationScreen() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<DealerFormData>({
    ownerName: '',
    storeName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    businessType: '',
    products: [],
    experience: '',
    licenseNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const businessTypes = [
    'Retailer',
    'Wholesaler',
    'Distributor',
    'Manufacturer',
    'Cooperative Society',
  ];

  const productCategories = [
    'Seeds',
    'Fertilizers',
    'Pesticides',
    'Farm Equipment',
    'Irrigation Systems',
    'Organic Products',
    'Animal Feed',
    'Farm Tools',
  ];

  const updateFormData = (field: keyof DealerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleProduct = (product: string) => {
    setSelectedProducts(prev => {
      const updated = prev.includes(product)
        ? prev.filter(p => p !== product)
        : [...prev, product];
      
      setFormData(prevForm => ({ ...prevForm, products: updated }));
      return updated;
    });
  };

  const validateForm = (): boolean => {
    const required = ['ownerName', 'storeName', 'email', 'phone', 'address', 'city', 'businessType'];
    for (const field of required) {
      if (!formData[field as keyof DealerFormData]) {
        Alert.alert('Validation Error', `${field} is required`);
        return false;
      }
    }

    if (selectedProducts.length === 0) {
      Alert.alert('Validation Error', 'Please select at least one product category');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return false;
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      Alert.alert('Validation Error', 'Please enter a valid 10-digit phone number');
      return false;
    }

    return true;
  };

  const submitRegistration = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      Alert.alert(
        'Registration Successful!',
        'Your dealer registration has been submitted. You will receive a confirmation email within 24 hours.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setFormData({
                ownerName: '',
                storeName: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                state: '',
                pincode: '',
                businessType: '',
                products: [],
                experience: '',
                licenseNumber: '',
              });
              setSelectedProducts([]);
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Store size={24} color="#10B981" />
          </View>
          <Text style={styles.title}>{t('dealer_registration')}</Text>
          <Text style={styles.subtitle}>
            Join our network of agricultural dealers and reach more farmers
          </Text>
        </View>

        {/* Registration Form */}
        <View style={styles.formSection}>
          {/* Personal Information */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <User size={20} color="#3B82F6" />
              <Text style={styles.sectionTitle}>Personal Information</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Owner Name *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter owner's full name"
                value={formData.ownerName}
                onChangeText={(value) => updateFormData('ownerName', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter email address"
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter 10-digit phone number"
                value={formData.phone}
                onChangeText={(value) => updateFormData('phone', value)}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          </View>

          {/* Business Information */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Building size={20} color="#10B981" />
              <Text style={styles.sectionTitle}>Business Information</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Store Name *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter store/business name"
                value={formData.storeName}
                onChangeText={(value) => updateFormData('storeName', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Type *</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.optionContainer}>
                  {businessTypes.map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.optionButton,
                        formData.businessType === type && styles.selectedOption,
                      ]}
                      onPress={() => updateFormData('businessType', type)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          formData.businessType === type && styles.selectedOptionText,
                        ]}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Years of Experience</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter years of experience"
                value={formData.experience}
                onChangeText={(value) => updateFormData('experience', value)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>License Number</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter business license number"
                value={formData.licenseNumber}
                onChangeText={(value) => updateFormData('licenseNumber', value)}
              />
            </View>
          </View>

          {/* Location Information */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <MapPin size={20} color="#F59E0B" />
              <Text style={styles.sectionTitle}>Location Information</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Enter complete address"
                value={formData.address}
                onChangeText={(value) => updateFormData('address', value)}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>City *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter city"
                  value={formData.city}
                  onChangeText={(value) => updateFormData('city', value)}
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>State</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter state"
                  value={formData.state}
                  onChangeText={(value) => updateFormData('state', value)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>PIN Code</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter PIN code"
                value={formData.pincode}
                onChangeText={(value) => updateFormData('pincode', value)}
                keyboardType="numeric"
                maxLength={6}
              />
            </View>
          </View>

          {/* Product Categories */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Package size={20} color="#8B5CF6" />
              <Text style={styles.sectionTitle}>Product Categories *</Text>
            </View>
            <Text style={styles.sectionDescription}>
              Select all product categories you deal with
            </Text>

            <View style={styles.productGrid}>
              {productCategories.map((product) => (
                <TouchableOpacity
                  key={product}
                  style={[
                    styles.productCard,
                    selectedProducts.includes(product) && styles.selectedProductCard,
                  ]}
                  onPress={() => toggleProduct(product)}
                >
                  {selectedProducts.includes(product) && (
                    <CheckCircle size={16} color="#10B981" style={styles.checkIcon} />
                  )}
                  <Text
                    style={[
                      styles.productText,
                      selectedProducts.includes(product) && styles.selectedProductText,
                    ]}
                  >
                    {product}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.disabledButton]}
            onPress={submitRegistration}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            By submitting this form, you agree to our terms and conditions{'\n'}
            Your registration will be reviewed within 24-48 hours
          </Text>
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
    alignItems: 'center',
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
    textAlign: 'center',
  },
  formSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 6,
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
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
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  productCard: {
    width: '48%',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    position: 'relative',
  },
  selectedProductCard: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  productText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  selectedProductText: {
    color: '#10B981',
  },
  submitButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  disclaimer: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
});