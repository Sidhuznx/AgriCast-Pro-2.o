import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Modal, ScrollView, TextInput } from 'react-native';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Search, Download, Check, X } from 'lucide-react-native';

export default function LanguageSelector() {
  const { language, setLanguage, isLoading, availableLanguages } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = availableLanguages.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularLanguages = ['en', 'hi', 'te', 'es', 'fr', 'de', 'pt', 'ru', 'ja', 'ko', 'zh', 'ar'];
  const otherLanguages = filteredLanguages.filter(lang => !popularLanguages.includes(lang.code));
  const popularFiltered = filteredLanguages.filter(lang => popularLanguages.includes(lang.code));

  const handleLanguageSelect = async (langCode: string) => {
    await setLanguage(langCode as any);
    setShowModal(false);
    setSearchQuery('');
  };

  const currentLanguage = availableLanguages.find(lang => lang.code === language);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setShowModal(true)}
        disabled={isLoading}
        activeOpacity={0.7}
      >
        <Globe size={16} color="#6B7280" />
        {isLoading ? (
          <ActivityIndicator size="small" color="#10B981" />
        ) : (
          <Text style={styles.currentLanguage}>
            {currentLanguage?.nativeName || 'EN'}
          </Text>
        )}
      </TouchableOpacity>

      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
              activeOpacity={0.7}
            >
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search languages..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
            />
          </View>

          <ScrollView style={styles.languageList} showsVerticalScrollIndicator={false}>
            {/* Popular Languages */}
            {popularFiltered.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Popular Languages</Text>
                {popularFiltered.map((lang) => (
                  <TouchableOpacity
                    key={lang.code}
                    style={[
                      styles.languageItem,
                      language === lang.code && styles.selectedLanguageItem,
                    ]}
                    onPress={() => handleLanguageSelect(lang.code)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.languageInfo}>
                      <Text style={styles.languageName}>{lang.name}</Text>
                      <Text style={styles.languageNative}>{lang.nativeName}</Text>
                    </View>
                    <View style={styles.languageActions}>
                      {language === lang.code && (
                        <Check size={20} color="#10B981" />
                      )}
                      {!['en', 'hi', 'te'].includes(lang.code) && (
                        <TouchableOpacity style={styles.downloadButton} activeOpacity={0.7}>
                          <Download size={16} color="#6B7280" />
                        </TouchableOpacity>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Other Languages */}
            {otherLanguages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>All Languages</Text>
                {otherLanguages.map((lang) => (
                  <TouchableOpacity
                    key={lang.code}
                    style={[
                      styles.languageItem,
                      language === lang.code && styles.selectedLanguageItem,
                    ]}
                    onPress={() => handleLanguageSelect(lang.code)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.languageInfo}>
                      <Text style={styles.languageName}>{lang.name}</Text>
                      <Text style={styles.languageNative}>{lang.nativeName}</Text>
                    </View>
                    <View style={styles.languageActions}>
                      {language === lang.code && (
                        <Check size={20} color="#10B981" />
                      )}
                      <TouchableOpacity style={styles.downloadButton} activeOpacity={0.7}>
                        <Download size={16} color="#6B7280" />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* No Results */}
            {filteredLanguages.length === 0 && (
              <View style={styles.noResults}>
                <Text style={styles.noResultsText}>No languages found</Text>
                <Text style={styles.noResultsSubtext}>Try a different search term</Text>
              </View>
            )}
          </ScrollView>

          {/* Footer */}
          <View style={styles.modalFooter}>
            <Text style={styles.footerText}>
              Translation powered by AI • 100+ languages supported
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  currentLanguage: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
    minWidth: 24,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  languageList: {
    flex: 1,
  },
  section: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    paddingHorizontal: 20,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  selectedLanguageItem: {
    backgroundColor: '#F0FDF4',
    borderBottomColor: '#10B981',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  languageNative: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  languageActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  downloadButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  noResultsText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginBottom: 4,
  },
  noResultsSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
});