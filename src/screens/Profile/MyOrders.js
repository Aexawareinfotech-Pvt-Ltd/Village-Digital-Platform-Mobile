import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  StatusBar 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ORDERS = [
  {
    id: '#ORD-2023-001',
    date: '10 Dec, 2024',
    items: 'Organic Fertilizer (x2 bags)',
    total: '₹1,200',
    status: 'Delivered'
  },
  {
    id: '#ORD-2023-002',
    date: '08 Dec, 2024',
    items: 'Pest Control Spray (x1)',
    total: '₹450',
    status: 'Processing'
  }
];

export default function MyOrders() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.orderId}>{item.id}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <View style={[styles.badge, item.status === 'Delivered' ? styles.successBadge : styles.processBadge]}>
          <Text style={[styles.badgeText, item.status === 'Delivered' ? styles.successText : styles.processText]}>
            {item.status}
          </Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <Text style={styles.itemsLabel}>Items:</Text>
      <Text style={styles.items}>{item.items}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.total}>{item.total}</Text>
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
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 40 }} />
      </View>
      <FlatList
        data={ORDERS}
        renderItem={renderOrder}
        keyExtractor={item => item.id}
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
  list: { padding: 24 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  orderId: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
  date: { fontSize: 12, color: '#94A3B8' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  successBadge: { backgroundColor: '#F0FDF4' },
  processBadge: { backgroundColor: '#EFF6FF' },
  successText: { fontSize: 12, fontWeight: '700', color: '#16A34A' },
  processText: { fontSize: 12, fontWeight: '700', color: '#2563EB' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 12 },
  itemsLabel: { fontSize: 12, color: '#64748B', marginBottom: 2 },
  items: { fontSize: 14, color: '#334155', fontWeight: '500', marginBottom: 12 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  totalLabel: { fontSize: 14, color: '#64748B' },
  total: { fontSize: 18, fontWeight: '800', color: '#134E5E' },
});