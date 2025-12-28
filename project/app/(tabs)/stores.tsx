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
import {
  MapPin,
  Search,
  Store,
  Phone,
  Clock,
  Star,
  Navigation,
  Filter,
} from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';

export default function StoresScreen() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Stores', icon: Store },
    { id: 'seeds', name: 'Seeds', icon: '🌱' },
    { id: 'fertilizers', name: 'Fertilizers', icon: '🧪' },
    { id: 'pesticides', name: 'Pesticides', icon: '🚿' },
    { id: 'equipment', name: 'Equipment', icon: '🚜' },
  ];

  const stores = [
    {
      id: 1,
      name: 'Green Valley Agri Store',
      category: 'seeds',
      rating: 4.5,
      distance: 2.3,
      address: 'Main Market Road, Village Rampur',
      phone: '+91 98765 43210',
      timing: '9:00 AM - 7:00 PM',
      speciality: 'Organic seeds and fertilizers',
      products: ['Seeds', 'Fertilizers', 'Organic products'],
      verified: true,
    },
    {
      id: 2,
      name: 'Kisan Seva Kendra',
      category: 'fertilizers',
      rating: 4.2,
      distance: 3.8,
      address: 'Gandhi Chowk, Near Bank',
      phone: '+91 87654 32109',
      timing: '8:30 AM - 8:00 PM',
      speciality: 'Government authorized dealer',
      products: ['Fertilizers', 'Pesticides', 'Seeds'],
      verified: true,
    },
    {
      id: 3,
      name: 'Modern Farm Equipment',
      category: 'equipment',
      rating: 4.0,
      distance: 5.2,
      address: 'Industrial Area, Sector 12',
      phone: '+91 76543 21098',
      timing: '10:00 AM - 6:00 PM',
      speciality: 'Tractors and farm machinery',
      products: ['Tractors', 'Implements', 'Spare parts'],
      verified: false,
    },
    {
      id: 4,
      name: 'Organic Crop Solutions',
      category: 'pesticides',
      rating: 4.7,
      distance: 1.5,
      address: 'New Colony, Behind School',
      phone: '+91 65432 10987',
      timing: '9:00 AM - 6:30 PM',
      speciality: 'Organic pesticides and bio-fertilizers',
      products: ['Bio-pesticides', 'Organic fertilizers', 'Micronutrients'],
      verified: true,
    },
  ];

  const filteredStores = stores.filter((store) => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.products.some(product => 
                           product.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    const matchesCategory = selectedCategory === 'all' || store.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={12} color="#F59E0B" fill="#F59E0B" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" size={12} color="#F59E0B" fill="#F59E0B" />);
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={12} color="#D1D5DB" />);
    }
    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Nearby Agri Stores</Text>
          <Text style={styles.subtitle}>
            Find agricultural inputs and equipment near you
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search stores or products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
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
                  {typeof category.icon === 'string' ? (
                    <Text style={styles.categoryEmoji}>{category.icon}</Text>
                  ) : (
                    <category.icon 
                      size={20} 
                      color={selectedCategory === category.id ? '#10B981' : '#6B7280'} 
                    />
                  )}
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

        {/* Stores List */}
        <View style={styles.storesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {filteredStores.length} stores found
            </Text>
            <TouchableOpacity style={styles.mapButton}>
              <MapPin size={16} color="#10B981" />
              <Text style={styles.mapButtonText}>Map View</Text>
            </TouchableOpacity>
          </View>

          {filteredStores.map((store) => (
            <View key={store.id} style={styles.storeCard}>
              <View style={styles.storeHeader}>
                <View style={styles.storeTitle}>
                  <Text style={styles.storeName}>{store.name}</Text>
                  {store.verified && (
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>✓</Text>
                    </View>
                  )}
                </View>
                <View style={styles.ratingContainer}>
                  <View style={styles.stars}>
                    {renderStars(store.rating)}
                  </View>
                  <Text style={styles.ratingText}>{store.rating}</Text>
                </View>
              </View>

              <Text style={styles.storeSpeciality}>{store.speciality}</Text>

              <View style={styles.storeInfo}>
                <View style={styles.infoRow}>
                  <MapPin size={14} color="#6B7280" />
                  <Text style={styles.infoText}>{store.address}</Text>
                  <Text style={styles.distanceText}>{store.distance} km</Text>
                </View>
                <View style={styles.infoRow}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.infoText}>{store.timing}</Text>
                </View>
              </View>

              <View style={styles.productTags}>
                {store.products.map((product, index) => (
                  <View key={index} style={styles.productTag}>
                    <Text style={styles.productTagText}>{product}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.storeActions}>
                <TouchableOpacity style={styles.callButton}>
                  <Phone size={16} color="#FFFFFF" />
                  <Text style={styles.callButtonText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.directionButton}>
                  <Navigation size={16} color="#10B981" />
                  <Text style={styles.directionButtonText}>Directions</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Add New Store */}
        <View style={styles.addStoreSection}>
          <TouchableOpacity style={styles.addStoreButton}>
            <Store size={20} color="#FFFFFF" />
            <Text style={styles.addStoreButtonText}>Add Your Store</Text>
          </TouchableOpacity>
          <Text style={styles.addStoreText}>
            Are you a dealer? Register your store to reach more farmers
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
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  filterButton: {
    padding: 4,
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
  categoryEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#10B981',
  },
  storesSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  mapButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
  storeCard: {
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
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  storeTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  verifiedBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stars: {
    flexDirection: 'row',
    gap: 1,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  storeSpeciality: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#10B981',
    marginBottom: 12,
  },
  storeInfo: {
    gap: 8,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    flex: 1,
  },
  distanceText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  productTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  productTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  productTagText: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  storeActions: {
    flexDirection: 'row',
    gap: 12,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 10,
  },
  callButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  directionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 10,
  },
  directionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  addStoreSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  addStoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 8,
  },
  addStoreButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  addStoreText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
});