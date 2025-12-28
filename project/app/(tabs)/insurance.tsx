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
import { Shield, FileText, Calendar, IndianRupee, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Clock, Download } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';

export default function InsuranceScreen() {
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState('schemes');
  const [selectedScheme, setSelectedScheme] = useState<any>(null);

  const insuranceSchemes = [
    {
      id: 1,
      name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      provider: 'Government of India',
      type: 'Crop Insurance',
      coverage: 'Natural calamities, pests, diseases',
      premium: '2% for Kharif, 1.5% for Rabi',
      maxClaim: '₹2,00,000 per hectare',
      features: [
        'Comprehensive risk coverage',
        'Technology-enabled quick assessment',
        'No upper limit on government subsidy',
        'Covers post-harvest losses',
      ],
      eligibility: [
        'All farmers including sharecroppers',
        'Notified crops in notified areas',
        'Compulsory for loanee farmers',
      ],
    },
    {
      id: 2,
      name: 'Weather Based Crop Insurance Scheme (WBCIS)',
      provider: 'Insurance Companies',
      type: 'Weather Insurance',
      coverage: 'Weather parameters (rainfall, temperature, humidity)',
      premium: '3-10% of sum insured',
      maxClaim: '₹5,00,000 per hectare',
      features: [
        'Based on weather data',
        'Quick claim settlement',
        'Covers adverse weather conditions',
        'No crop cutting experiments',
      ],
      eligibility: [
        'Individual farmers',
        'Farmer Producer Organizations',
        'Self Help Groups',
      ],
    },
  ];

  const applications = [
    {
      id: 'APP001',
      scheme: 'PMFBY',
      crop: 'Rice',
      area: '2.5 hectares',
      premium: '₹3,500',
      status: 'Approved',
      appliedDate: '2024-06-15',
      coveragePeriod: 'Kharif 2024',
    },
    {
      id: 'APP002',
      scheme: 'WBCIS',
      crop: 'Wheat',
      area: '1.8 hectares',
      premium: '₹2,800',
      status: 'Under Review',
      appliedDate: '2024-11-20',
      coveragePeriod: 'Rabi 2024-25',
    },
  ];

  const claims = [
    {
      id: 'CLM001',
      applicationId: 'APP001',
      scheme: 'PMFBY',
      crop: 'Rice',
      lossType: 'Drought',
      claimAmount: '₹45,000',
      status: 'Processing',
      submittedDate: '2024-09-15',
      expectedSettlement: '2024-10-30',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return '#10B981';
      case 'processing':
        return '#F59E0B';
      case 'under review':
        return '#3B82F6';
      case 'rejected':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Crop Insurance</Text>
          <Text style={styles.subtitle}>
            Protect your crops with comprehensive insurance coverage
          </Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'schemes' && styles.activeTab]}
            onPress={() => setSelectedTab('schemes')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'schemes' && styles.activeTabText,
              ]}
            >
              Schemes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'applications' && styles.activeTab]}
            onPress={() => setSelectedTab('applications')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'applications' && styles.activeTabText,
              ]}
            >
              My Applications
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'claims' && styles.activeTab]}
            onPress={() => setSelectedTab('claims')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'claims' && styles.activeTabText,
              ]}
            >
              Claims
            </Text>
          </TouchableOpacity>
        </View>

        {/* Insurance Schemes */}
        {selectedTab === 'schemes' && (
          <View style={styles.schemesSection}>
            {insuranceSchemes.map((scheme) => (
              <View key={scheme.id} style={styles.schemeCard}>
                <View style={styles.schemeHeader}>
                  <View style={styles.schemeTitle}>
                    <Shield size={20} color="#10B981" />
                    <View>
                      <Text style={styles.schemeName}>{scheme.name}</Text>
                      <Text style={styles.schemeProvider}>{scheme.provider}</Text>
                    </View>
                  </View>
                  <View style={styles.schemeType}>
                    <Text style={styles.schemeTypeText}>{scheme.type}</Text>
                  </View>
                </View>

                <View style={styles.schemeDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Coverage:</Text>
                    <Text style={styles.detailValue}>{scheme.coverage}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Premium:</Text>
                    <Text style={styles.detailValue}>{scheme.premium}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Max Claim:</Text>
                    <Text style={styles.detailValue}>{scheme.maxClaim}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.viewDetailsButton}
                  onPress={() => setSelectedScheme(scheme)}
                >
                  <Text style={styles.viewDetailsText}>View Details & Apply</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* My Applications */}
        {selectedTab === 'applications' && (
          <View style={styles.applicationsSection}>
            {applications.map((app) => (
              <View key={app.id} style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <View>
                    <Text style={styles.applicationId}>#{app.id}</Text>
                    <Text style={styles.applicationScheme}>{app.scheme}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(app.status) + '20' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: getStatusColor(app.status) },
                      ]}
                    >
                      {app.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.applicationDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Crop:</Text>
                    <Text style={styles.detailValue}>{app.crop}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Area:</Text>
                    <Text style={styles.detailValue}>{app.area}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Premium:</Text>
                    <Text style={styles.detailValue}>{app.premium}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Coverage Period:</Text>
                    <Text style={styles.detailValue}>{app.coveragePeriod}</Text>
                  </View>
                </View>

                <View style={styles.applicationActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <FileText size={16} color="#3B82F6" />
                    <Text style={styles.actionButtonText}>View Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Download size={16} color="#10B981" />
                    <Text style={styles.actionButtonText}>Download</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Claims */}
        {selectedTab === 'claims' && (
          <View style={styles.claimsSection}>
            {claims.map((claim) => (
              <View key={claim.id} style={styles.claimCard}>
                <View style={styles.claimHeader}>
                  <View>
                    <Text style={styles.claimId}>Claim #{claim.id}</Text>
                    <Text style={styles.claimScheme}>{claim.scheme}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(claim.status) + '20' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: getStatusColor(claim.status) },
                      ]}
                    >
                      {claim.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.claimDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Crop:</Text>
                    <Text style={styles.detailValue}>{claim.crop}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Loss Type:</Text>
                    <Text style={styles.detailValue}>{claim.lossType}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Claim Amount:</Text>
                    <Text style={styles.detailValue}>{claim.claimAmount}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Expected Settlement:</Text>
                    <Text style={styles.detailValue}>{claim.expectedSettlement}</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.trackClaimButton}>
                  <Clock size={16} color="#FFFFFF" />
                  <Text style={styles.trackClaimText}>Track Claim</Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity style={styles.newClaimButton}>
              <FileText size={20} color="#FFFFFF" />
              <Text style={styles.newClaimButtonText}>File New Claim</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Scheme Details Modal */}
        {selectedScheme && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedScheme.name}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedScheme(null)}
                >
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody}>
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Features</Text>
                  {selectedScheme.features.map((feature: string, index: number) => (
                    <View key={index} style={styles.featureItem}>
                      <CheckCircle size={16} color="#10B981" />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Eligibility</Text>
                  {selectedScheme.eligibility.map((criteria: string, index: number) => (
                    <View key={index} style={styles.featureItem}>
                      <AlertCircle size={16} color="#3B82F6" />
                      <Text style={styles.featureText}>{criteria}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>

              <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
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
  schemesSection: {
    paddingHorizontal: 20,
  },
  schemeCard: {
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
  schemeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  schemeTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  schemeName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  schemeProvider: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  schemeType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#EBF8FF',
    borderRadius: 12,
  },
  schemeTypeText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#3B82F6',
  },
  schemeDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    flex: 2,
    textAlign: 'right',
  },
  viewDetailsButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  applicationsSection: {
    paddingHorizontal: 20,
  },
  applicationCard: {
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
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  applicationId: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  applicationScheme: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  applicationDetails: {
    gap: 8,
    marginBottom: 16,
  },
  applicationActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 8,
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  claimsSection: {
    paddingHorizontal: 20,
  },
  claimCard: {
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
  claimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  claimId: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  claimScheme: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  claimDetails: {
    gap: 8,
    marginBottom: 16,
  },
  trackClaimButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  trackClaimText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  newClaimButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  newClaimButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#6B7280',
  },
  modalBody: {
    padding: 20,
    maxHeight: 300,
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    flex: 1,
    lineHeight: 20,
  },
  applyButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    margin: 20,
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});