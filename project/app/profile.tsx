import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, User, Phone, MapPin, Globe, Wheat, CreditCard, Shield, CreditCard as Edit3, Save, Camera, Mail, Calendar, Tractor } from 'lucide-react-native';

interface FarmerProfile {
  name: string;
  phone: string;
  email: string;
  location: string;
  landSize: string;
  language: string;
  registeredCrops: string[];
  loanStatus: string;
  insuranceStatus: string;
  farmingExperience: string;
  soilType: string;
  irrigationType: string;
}

export default function ProfileScreen() {
  const { t, language, setLanguage } = useLanguage();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const [profile, setProfile] = useState<FarmerProfile>({
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    location: 'Village Rampur, District Meerut, UP',
    landSize: '5.2 acres',
    language: 'English',
    registeredCrops: ['Rice', 'Wheat', 'Sugarcane'],
    loanStatus: 'Active - ₹1,50,000',
    insuranceStatus: 'PMFBY - Active',
    farmingExperience: '15 years',
    soilType: 'Loamy',
    irrigationType: 'Tube well + Canal',
  });

  const [editedProfile, setEditedProfile] = useState<FarmerProfile>(profile);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'te', name: 'తెలుగు' },
  ];

  const cropOptions = [
    'Rice', 'Wheat', 'Corn', 'Cotton', 'Sugarcane', 'Tomato', 
    'Potato', 'Onion', 'Soybean', 'Mustard', 'Barley', 'Pulses'
  ];

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    Alert.alert(
      'Profile Updated',
      'Your profile has been successfully updated.',
      [{ text: 'OK' }]
    );
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const updateField = (field: keyof FarmerProfile, value: string) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleCrop = (crop: string) => {
    setEditedProfile(prev => ({
      ...prev,
      registeredCrops: prev.registeredCrops.includes(crop)
        ? prev.registeredCrops.filter(c => c !== crop)
        : [...prev.registeredCrops, crop]
    }));
  };

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as any);
    updateField('language', languages.find(l => l.code === langCode)?.name || 'English');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Farmer Profile</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={isEditing ? handleSave : () => setIsEditing(true)}
            activeOpacity={0.7}
          >
            {isEditing ? (
              <Save size={24} color="#10B981" />
            ) : (
              <Edit3 size={24} color="#6B7280" />
            )}
          </TouchableOpacity>
        </View>

        {/* Profile Picture Section */}
        <View style={styles.profilePictureSection}>
          <View style={styles.profilePicture}>
            <User size={48} color="#10B981" />
          </View>
          {isEditing && (
            <TouchableOpacity style={styles.changePictureButton} activeOpacity={0.7}>
              <Camera size={16} color="#FFFFFF" />
            </TouchableOpacity>
          )}
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileSubtitle}>Farmer • {profile.farmingExperience} experience</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <User size={20} color="#10B981" />
            <Text style={styles.sectionTitle}>Personal Information</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={editedProfile.name}
                onChangeText={(value) => updateField('name', value)}
                placeholder="Enter your full name"
              />
            ) : (
              <Text style={styles.fieldValue}>{profile.name}</Text>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Phone Number</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={editedProfile.phone}
                onChangeText={(value) => updateField('phone', value)}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
              />
            ) : (
              <View style={styles.fieldWithIcon}>
                <Phone size={16} color="#6B7280" />
                <Text style={styles.fieldValue}>{profile.phone}</Text>
              </View>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={editedProfile.email}
                onChangeText={(value) => updateField('email', value)}
                placeholder="Enter email address"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            ) : (
              <View style={styles.fieldWithIcon}>
                <Mail size={16} color="#6B7280" />
                <Text style={styles.fieldValue}>{profile.email}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Farm Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Tractor size={20} color="#F59E0B" />
            <Text style={styles.sectionTitle}>Farm Information</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Location</Text>
            {isEditing ? (
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={editedProfile.location}
                onChangeText={(value) => updateField('location', value)}
                placeholder="Enter farm location"
                multiline
                numberOfLines={2}
              />
            ) : (
              <View style={styles.fieldWithIcon}>
                <MapPin size={16} color="#6B7280" />
                <Text style={styles.fieldValue}>{profile.location}</Text>
              </View>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Land Size</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={editedProfile.landSize}
                onChangeText={(value) => updateField('landSize', value)}
                placeholder="Enter land size"
              />
            ) : (
              <Text style={styles.fieldValue}>{profile.landSize}</Text>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Soil Type</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={editedProfile.soilType}
                onChangeText={(value) => updateField('soilType', value)}
                placeholder="Enter soil type"
              />
            ) : (
              <Text style={styles.fieldValue}>{profile.soilType}</Text>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Irrigation Type</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={editedProfile.irrigationType}
                onChangeText={(value) => updateField('irrigationType', value)}
                placeholder="Enter irrigation type"
              />
            ) : (
              <Text style={styles.fieldValue}>{profile.irrigationType}</Text>
            )}
          </View>
        </View>

        {/* Registered Crops */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Wheat size={20} color="#059669" />
            <Text style={styles.sectionTitle}>Registered Crops</Text>
          </View>

          {isEditing ? (
            <View style={styles.cropGrid}>
              {cropOptions.map((crop) => (
                <TouchableOpacity
                  key={crop}
                  style={[
                    styles.cropChip,
                    editedProfile.registeredCrops.includes(crop) && styles.cropChipSelected,
                  ]}
                  onPress={() => toggleCrop(crop)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.cropChipText,
                      editedProfile.registeredCrops.includes(crop) && styles.cropChipTextSelected,
                    ]}
                  >
                    {crop}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.cropList}>
              {profile.registeredCrops.map((crop, index) => (
                <View key={index} style={styles.cropTag}>
                  <Text style={styles.cropTagText}>{crop}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Financial Status */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CreditCard size={20} color="#3B82F6" />
            <Text style={styles.sectionTitle}>Financial Status</Text>
          </View>

          <View style={styles.statusCard}>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Loan Status</Text>
              <Text style={styles.statusValue}>{profile.loanStatus}</Text>
            </View>
            <View style={styles.statusDivider} />
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Insurance Status</Text>
              <Text style={styles.statusValue}>{profile.insuranceStatus}</Text>
            </View>
          </View>
        </View>

        {/* Language & Settings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Globe size={20} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>Language & Settings</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Preferred Language</Text>
            <View style={styles.languageSelector}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageOption,
                    language === lang.code && styles.languageOptionSelected,
                  ]}
                  onPress={() => handleLanguageChange(lang.code)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.languageOptionText,
                      language === lang.code && styles.languageOptionTextSelected,
                    ]}
                  >
                    {lang.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Weather Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#F3F4F6', true: '#10B981' }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#9CA3AF'}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Location Services</Text>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: '#F3F4F6', true: '#10B981' }}
              thumbColor={locationEnabled ? '#FFFFFF' : '#9CA3AF'}
            />
          </View>
        </View>

        {/* Action Buttons */}
        {isEditing && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={handleCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.saveButton]}
              onPress={handleSave}
              activeOpacity={0.7}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePictureSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    position: 'relative',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#10B981',
    marginBottom: 16,
  },
  changePictureButton: {
    position: 'absolute',
    top: 32,
    right: '35%',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 6,
  },
  fieldValue: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  fieldWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  cropGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cropChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cropChipSelected: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  cropChipText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  cropChipTextSelected: {
    color: '#FFFFFF',
  },
  cropList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cropTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  cropTagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
  statusCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  statusItem: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  statusDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  languageSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  languageOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  languageOptionSelected: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  languageOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  languageOptionTextSelected: {
    color: '#FFFFFF',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  saveButton: {
    backgroundColor: '#10B981',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});