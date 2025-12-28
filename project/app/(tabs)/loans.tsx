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
import { CreditCard, TrendingUp, Users, Calculator, Clock, CircleCheck as CheckCircle, IndianRupee, FileText, Handshake } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';

export default function LoansScreen() {
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState('loans');
  const [loanAmount, setLoanAmount] = useState('');
  const [duration, setDuration] = useState('');

  const loanOptions = [
    {
      id: 1,
      name: 'Kisan Credit Card (KCC)',
      provider: 'Banks & NBFCs',
      interestRate: '7-9%',
      maxAmount: '₹3,00,000',
      tenure: '1 year (renewable)',
      purpose: 'Crop production, maintenance',
      features: [
        'Flexible repayment',
        'No collateral up to ₹1.6 lakh',
        'Insurance coverage',
        'ATM facility',
      ],
      eligibility: [
        'Farmers (owner/tenant)',
        'Age: 18-75 years',
        'Valid land documents',
      ],
    },
    {
      id: 2,
      name: 'Agriculture Term Loan',
      provider: 'Commercial Banks',
      interestRate: '8.5-11%',
      maxAmount: '₹25,00,000',
      tenure: '5-7 years',
      purpose: 'Farm equipment, land development',
      features: [
        'Long-term financing',
        'Subsidized interest rates',
        'Flexible EMI options',
        'Government schemes available',
      ],
      eligibility: [
        'Farmers with land ownership',
        'Good credit history',
        'Project viability',
      ],
    },
  ];

  const investmentOpportunities = [
    {
      id: 1,
      title: 'Organic Rice Farming Project',
      location: 'Punjab',
      investmentRequired: '₹5,00,000',
      expectedReturn: '18-22%',
      duration: '6 months',
      riskLevel: 'Medium',
      farmerProfile: {
        name: 'Rajesh Kumar',
        experience: '15 years',
        landSize: '10 acres',
        previousYield: '95% success rate',
      },
      projectDetails: {
        cropType: 'Basmati Rice',
        season: 'Kharif 2024',
        marketDemand: 'High',
        certifications: 'Organic certified',
      },
    },
    {
      id: 2,
      title: 'Vegetable Greenhouse Setup',
      location: 'Maharashtra',
      investmentRequired: '₹8,00,000',
      expectedReturn: '25-30%',
      duration: '12 months',
      riskLevel: 'Low',
      farmerProfile: {
        name: 'Priya Sharma',
        experience: '8 years',
        landSize: '2 acres',
        previousYield: '98% success rate',
      },
      projectDetails: {
        cropType: 'Tomato, Cucumber, Capsicum',
        season: 'Year-round',
        marketDemand: 'Very High',
        certifications: 'GAP certified',
      },
    },
  ];

  const myLoans = [
    {
      id: 'KCC001',
      type: 'Kisan Credit Card',
      amount: '₹1,50,000',
      disbursed: '₹1,20,000',
      outstanding: '₹85,000',
      nextEMI: '₹12,500',
      dueDate: '2024-02-15',
      status: 'Active',
    },
  ];

  const myInvestments = [
    {
      id: 'INV001',
      project: 'Organic Rice Farming',
      farmer: 'Rajesh Kumar',
      invested: '₹2,00,000',
      currentValue: '₹2,35,000',
      returns: '+17.5%',
      status: 'Active',
      maturityDate: '2024-04-30',
    },
  ];

  const calculateEMI = () => {
    if (!loanAmount || !duration) return 0;
    const principal = parseFloat(loanAmount);
    const rate = 0.09 / 12; // 9% annual rate
    const months = parseInt(duration) * 12;
    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    return Math.round(emi);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Loans & Investment</Text>
          <Text style={styles.subtitle}>
            Access credit and investment opportunities for farming
          </Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'loans' && styles.activeTab]}
            onPress={() => setSelectedTab('loans')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'loans' && styles.activeTabText,
              ]}
            >
              Loans
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'investment' && styles.activeTab]}
            onPress={() => setSelectedTab('investment')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'investment' && styles.activeTabText,
              ]}
            >
              Investment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'portfolio' && styles.activeTab]}
            onPress={() => setSelectedTab('portfolio')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'portfolio' && styles.activeTabText,
              ]}
            >
              My Portfolio
            </Text>
          </TouchableOpacity>
        </View>

        {/* Loan Options */}
        {selectedTab === 'loans' && (
          <View style={styles.loansSection}>
            {/* EMI Calculator */}
            <View style={styles.calculatorCard}>
              <View style={styles.calculatorHeader}>
                <Calculator size={20} color="#3B82F6" />
                <Text style={styles.calculatorTitle}>EMI Calculator</Text>
              </View>
              <View style={styles.calculatorInputs}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Loan Amount (₹)</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter amount"
                    value={loanAmount}
                    onChangeText={setLoanAmount}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Duration (years)</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter years"
                    value={duration}
                    onChangeText={setDuration}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              {loanAmount && duration && (
                <View style={styles.emiResult}>
                  <Text style={styles.emiLabel}>Monthly EMI:</Text>
                  <Text style={styles.emiAmount}>₹{calculateEMI().toLocaleString()}</Text>
                </View>
              )}
            </View>

            {/* Loan Options */}
            {loanOptions.map((loan) => (
              <View key={loan.id} style={styles.loanCard}>
                <View style={styles.loanHeader}>
                  <View style={styles.loanTitle}>
                    <CreditCard size={20} color="#10B981" />
                    <View>
                      <Text style={styles.loanName}>{loan.name}</Text>
                      <Text style={styles.loanProvider}>{loan.provider}</Text>
                    </View>
                  </View>
                  <View style={styles.interestRate}>
                    <Text style={styles.rateText}>{loan.interestRate}</Text>
                    <Text style={styles.rateLabel}>Interest Rate</Text>
                  </View>
                </View>

                <View style={styles.loanDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Max Amount:</Text>
                    <Text style={styles.detailValue}>{loan.maxAmount}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Tenure:</Text>
                    <Text style={styles.detailValue}>{loan.tenure}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Purpose:</Text>
                    <Text style={styles.detailValue}>{loan.purpose}</Text>
                  </View>
                </View>

                <View style={styles.featuresSection}>
                  <Text style={styles.featuresTitle}>Key Features:</Text>
                  {loan.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <CheckCircle size={12} color="#10B981" />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity style={styles.applyButton}>
                  <FileText size={16} color="#FFFFFF" />
                  <Text style={styles.applyButtonText}>Apply Now</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Investment Opportunities */}
        {selectedTab === 'investment' && (
          <View style={styles.investmentSection}>
            <Text style={styles.sectionTitle}>Investment Opportunities</Text>
            {investmentOpportunities.map((investment) => (
              <View key={investment.id} style={styles.investmentCard}>
                <View style={styles.investmentHeader}>
                  <Text style={styles.investmentTitle}>{investment.title}</Text>
                  <View style={styles.locationBadge}>
                    <Text style={styles.locationText}>{investment.location}</Text>
                  </View>
                </View>

                <View style={styles.investmentMetrics}>
                  <View style={styles.metric}>
                    <Text style={styles.metricValue}>{investment.expectedReturn}</Text>
                    <Text style={styles.metricLabel}>Expected Return</Text>
                  </View>
                  <View style={styles.metric}>
                    <Text style={styles.metricValue}>{investment.duration}</Text>
                    <Text style={styles.metricLabel}>Duration</Text>
                  </View>
                  <View style={styles.metric}>
                    <Text style={styles.metricValue}>{investment.riskLevel}</Text>
                    <Text style={styles.metricLabel}>Risk Level</Text>
                  </View>
                </View>

                <View style={styles.farmerProfile}>
                  <View style={styles.profileHeader}>
                    <Users size={16} color="#6B7280" />
                    <Text style={styles.profileTitle}>Farmer Profile</Text>
                  </View>
                  <View style={styles.profileDetails}>
                    <Text style={styles.farmerName}>{investment.farmerProfile.name}</Text>
                    <Text style={styles.farmerExperience}>
                      {investment.farmerProfile.experience} experience • {investment.farmerProfile.landSize}
                    </Text>
                    <Text style={styles.successRate}>
                      Success Rate: {investment.farmerProfile.previousYield}
                    </Text>
                  </View>
                </View>

                <View style={styles.investmentAmount}>
                  <Text style={styles.amountLabel}>Investment Required:</Text>
                  <Text style={styles.amountValue}>{investment.investmentRequired}</Text>
                </View>

                <TouchableOpacity style={styles.investButton}>
                  <Handshake size={16} color="#FFFFFF" />
                  <Text style={styles.investButtonText}>Invest Now</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* My Portfolio */}
        {selectedTab === 'portfolio' && (
          <View style={styles.portfolioSection}>
            {/* My Loans */}
            <View style={styles.portfolioCard}>
              <Text style={styles.portfolioTitle}>My Loans</Text>
              {myLoans.map((loan) => (
                <View key={loan.id} style={styles.loanItem}>
                  <View style={styles.loanItemHeader}>
                    <Text style={styles.loanItemType}>{loan.type}</Text>
                    <Text style={styles.loanItemId}>#{loan.id}</Text>
                  </View>
                  <View style={styles.loanItemDetails}>
                    <View style={styles.loanItemRow}>
                      <Text style={styles.loanItemLabel}>Sanctioned:</Text>
                      <Text style={styles.loanItemValue}>{loan.amount}</Text>
                    </View>
                    <View style={styles.loanItemRow}>
                      <Text style={styles.loanItemLabel}>Outstanding:</Text>
                      <Text style={styles.loanItemValue}>{loan.outstanding}</Text>
                    </View>
                    <View style={styles.loanItemRow}>
                      <Text style={styles.loanItemLabel}>Next EMI:</Text>
                      <Text style={styles.loanItemValue}>{loan.nextEMI}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.payEMIButton}>
                    <IndianRupee size={14} color="#FFFFFF" />
                    <Text style={styles.payEMIText}>Pay EMI</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* My Investments */}
            <View style={styles.portfolioCard}>
              <Text style={styles.portfolioTitle}>My Investments</Text>
              {myInvestments.map((investment) => (
                <View key={investment.id} style={styles.investmentItem}>
                  <View style={styles.investmentItemHeader}>
                    <Text style={styles.investmentItemProject}>{investment.project}</Text>
                    <Text style={styles.investmentItemReturns}>{investment.returns}</Text>
                  </View>
                  <Text style={styles.investmentItemFarmer}>Farmer: {investment.farmer}</Text>
                  <View style={styles.investmentItemDetails}>
                    <View style={styles.investmentItemRow}>
                      <Text style={styles.investmentItemLabel}>Invested:</Text>
                      <Text style={styles.investmentItemValue}>{investment.invested}</Text>
                    </View>
                    <View style={styles.investmentItemRow}>
                      <Text style={styles.investmentItemLabel}>Current Value:</Text>
                      <Text style={styles.investmentItemValue}>{investment.currentValue}</Text>
                    </View>
                    <View style={styles.investmentItemRow}>
                      <Text style={styles.investmentItemLabel}>Maturity:</Text>
                      <Text style={styles.investmentItemValue}>{investment.maturityDate}</Text>
                    </View>
                  </View>
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
  loansSection: {
    paddingHorizontal: 20,
  },
  calculatorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  calculatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  calculatorTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  calculatorInputs: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  emiResult: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 8,
  },
  emiLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#059669',
  },
  emiAmount: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#059669',
  },
  loanCard: {
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
  loanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  loanTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  loanName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  loanProvider: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  interestRate: {
    alignItems: 'flex-end',
  },
  rateText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#10B981',
  },
  rateLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  loanDetails: {
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
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  featuresSection: {
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  applyButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  applyButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  investmentSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  investmentCard: {
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
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  investmentTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    flex: 1,
  },
  locationBadge: {
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  locationText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#3B82F6',
  },
  investmentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
  },
  metricLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  farmerProfile: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  profileTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  profileDetails: {
    gap: 2,
  },
  farmerName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  farmerExperience: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  successRate: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
  investmentAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  amountLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  amountValue: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
  },
  investButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  investButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  portfolioSection: {
    paddingHorizontal: 20,
  },
  portfolioCard: {
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
  portfolioTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  loanItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 12,
    marginBottom: 12,
  },
  loanItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  loanItemType: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  loanItemId: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  loanItemDetails: {
    gap: 4,
    marginBottom: 12,
  },
  loanItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loanItemLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  loanItemValue: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  payEMIButton: {
    backgroundColor: '#10B981',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  payEMIText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  investmentItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 12,
    marginBottom: 12,
  },
  investmentItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  investmentItemProject: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    flex: 1,
  },
  investmentItemReturns: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
  },
  investmentItemFarmer: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  investmentItemDetails: {
    gap: 4,
  },
  investmentItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  investmentItemLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  investmentItemValue: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
});