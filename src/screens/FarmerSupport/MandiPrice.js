import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  StatusBar, 
  TouchableOpacity,
  TextInput 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PRICES_DATA = [
  { id: '1', crop: 'Wheat (Gehu)', market: 'Rampur Mandi', price: '₹2,200', unit: 'Quintal', trend: 'up' },
  { id: '2', crop: 'Rice (Basmati)', market: 'District HQ', price: '₹3,400', unit: 'Quintal', trend: 'stable' },
  { id: '3', crop: 'Mustard', market: 'Rampur Mandi', price: '₹5,450', unit: 'Quintal', trend: 'down' },
  { id: '4', crop: 'Potato', market: 'Local Yard', price: '₹1,200', unit: 'Quintal', trend: 'up' },
  { id: '5', crop: 'Cotton', market: 'District HQ', price: '₹6,100', unit: 'Quintal', trend: 'up' },
];

export default function MandiPrices() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.cropName}>{item.crop}</Text>
          <Text style={styles.marketName}>{item.market}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.unit}>/ {item.unit}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.trendRow}>
        <View style={[styles.trendBadge, 
          item.trend === 'up' ? styles.trendUp : 
          item.trend === 'down' ? styles.trendDown : styles.trendStable]}>
          <Feather 
            name={item.trend === 'up' ? 'trending-up' : item.trend === 'down' ? 'trending-down' : 'minus'} 
            size={14} 
            color={item.trend === 'up' ? '#16A34A' : item.trend === 'down' ? '#EF4444' : '#64748B'} 
          />
          <Text style={[styles.trendText, 
            { color: item.trend === 'up' ? '#16A34A' : item.trend === 'down' ? '#EF4444' : '#64748B' }]}>
            {item.trend === 'up' ? 'Price Rising' : item.trend === 'down' ? 'Price Falling' : 'Stable'}
          </Text>
        </View>
        <Text style={styles.date}>Updated: Today</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mandi Prices</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.searchBox}>
        <Feather name="search" size={20} color="#94A3B8" />
        <TextInput 
          style={styles.input} 
          placeholder="Search crop or mandi..." 
          placeholderTextColor="#94A3B8"
        />
      </View>

      <FlatList
        data={PRICES_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, paddingVertical: 16,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  backBtn: { width: 40 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    marginHorizontal: 24, marginBottom: 16, paddingHorizontal: 16, height: 50,
    borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0',
  },
  input: { flex: 1, marginLeft: 10, fontSize: 16, color: '#1E293B' },
  list: { paddingHorizontal: 24, paddingBottom: 24 },
  card: {
    backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 12,
    borderWidth: 1, borderColor: '#F1F5F9',
    shadowColor: '#64748B', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cropName: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 2 },
  marketName: { fontSize: 12, color: '#64748B', fontWeight: '500' },
  priceContainer: { alignItems: 'flex-end' },
  price: { fontSize: 18, fontWeight: '800', color: '#15803D' },
  unit: { fontSize: 11, color: '#64748B' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 12 },
  trendRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  trendBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  trendUp: { backgroundColor: '#F0FDF4' },
  trendDown: { backgroundColor: '#FEF2F2' },
  trendStable: { backgroundColor: '#F8FAFC' },
  trendText: { fontSize: 12, fontWeight: '700', marginLeft: 6 },
  date: { fontSize: 11, color: '#94A3B8' },
});