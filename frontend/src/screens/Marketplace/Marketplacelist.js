import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  StatusBar,
  Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Synced Market Data with Proper Images
const MARKET_ITEMS = [
  {
    id: '1',
    title: 'John Deere 5310 Tractor',
    price: '₹5,50,000',
    category: 'Vehicles',
    location: 'Rampur Village',
    // Updated Tractor Image (Green Tractor)
    image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?q=80&w=800&auto=format&fit=crop',
    seller: 'Ramesh Kumar',
    description: '2021 Model, 55HP. Excellent condition, new tires installed last month. Servicing done recently.',
    contact: '9876543210'
  },
  {
    id: '2',
    title: 'Organic Wheat Seeds (50kg)',
    price: '₹2,200',
    category: 'Seeds',
    location: 'Dholakpur',
    // Updated Wheat Image
    image: 'https://images.unsplash.com/photo-1501430654243-c934cec2e1c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    seller: 'Kisan Kendra',
    description: 'High yield organic wheat seeds. Certified by state agriculture board. Best for winter sowing.',
    contact: '9876543210'
  },
  {
    id: '3',
    title: 'Solar Water Pump',
    price: '₹25,000',
    category: 'Equipment',
    location: 'Sonpur',
    // Updated Solar/Irrigation Image (Solar panels in farm)
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop',
    seller: 'Green Energy Sol',
    description: '3HP Solar submersible pump. 5 year warranty included. Installation free within 20km.',
    contact: '9876543210'
  },
  {
    id: '4',
    title: 'Jersey Cow (Milking)',
    price: '₹45,000',
    category: 'Livestock',
    location: 'Bopal',
    // Updated Cow Image
    image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    seller: 'Suresh Yadav',
    description: 'Healthy Jersey cow, 15L milk capacity per day. 2nd lactation. Very gentle temperament.',
    contact: '9876543210'
  }
];

const CATEGORIES = ['All', 'Vehicles', 'Seeds', 'Equipment', 'Livestock'];

export default function MarketPlaceList() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('All');

  // Helper for tag color
  const getCategoryColor = (cat) => {
    switch(cat) {
      case 'Vehicles': return '#134E5E';
      case 'Seeds': return '#2E7D32';
      case 'Equipment': return '#F59E0B';
      case 'Livestock': return '#C62828';
      default: return '#64748B';
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('MarketPlaceDetails', { item })}
      activeOpacity={0.9}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={[styles.badge, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.badgeText}>{item.category}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.cardPrice}>{item.price}</Text>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        
        <View style={styles.locationRow}>
          <Feather name="map-pin" size={12} color="#94A3B8" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );


  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Marketplace</Text>
          <Text style={styles.headerSubtitle}>Buy & sell local goods</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Feather name="plus" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput 
          placeholder="Search tractors, seeds..." 
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoryContainer}>
        <FlatList 
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[
                styles.categoryChip, 
                activeCategory === item && styles.activeChip
              ]}
              onPress={() => setActiveCategory(item)}
            >
              <Text style={[
                styles.categoryText, 
                activeCategory === item && styles.activeChipText
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Grid List */}
      <FlatList
        data={MARKET_ITEMS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#134E5E',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: "#134E5E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  searchContainer: {
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeChip: {
    backgroundColor: '#134E5E',
    borderColor: '#134E5E',
  },
  categoryText: {
    fontWeight: '600',
    color: '#64748B',
  },
  activeChipText: {
    color: '#FFF',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFF',
    width: (width - 48) / 2, // split width minus padding
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  imageWrapper: {
    height: 140,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardContent: {
    padding: 12,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#134E5E', // Using primary brand color for price
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
    lineHeight: 20,
    height: 40, 
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 4,
  },
});