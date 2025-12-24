import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity,
  StatusBar 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SAVED_ITEMS = [
  {
    id: '3',
    title: 'Solar Water Pump',
    price: '₹25,000',
    location: 'Sonpur',
    image: 'https://plus.unsplash.com/premium_photo-1679917152960-b9e43b214150?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Jersey Cow (Milking)',
    price: '₹45,000',
    location: 'Bopal',
    image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  }
];

export default function SavedItems() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <TouchableOpacity style={styles.heartBtn}>
        <Feather name="heart" size={18} color="#FFF" fill="#FFF" />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <View style={styles.locationRow}>
          <Feather name="map-pin" size={12} color="#94A3B8" />
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Items</Text>
        <View style={{ width: 40 }} />
      </View>
      <FlatList
        data={SAVED_ITEMS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  backBtn: { width: 40 },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  columnWrapper: { justifyContent: 'space-between', marginBottom: 16 },
  card: {
    backgroundColor: '#FFF',
    width: '48%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
  },
  image: { width: '100%', height: 140 },
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 6,
  },
  content: { padding: 12 },
  price: { fontSize: 16, fontWeight: '800', color: '#134E5E', marginBottom: 4 },
  title: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 6, height: 40 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  location: { fontSize: 12, color: '#94A3B8', marginLeft: 4 },
});