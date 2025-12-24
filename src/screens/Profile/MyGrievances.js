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

const GRIEVANCES = [
  {
    id: 'GRV-2024-001',
    subject: 'Broken Street Light',
    category: 'Electricity',
    date: '12 Dec, 2024',
    status: 'Resolved',
    description: 'Street light near Panchayat Bhavan is not working for 3 days.'
  },
  {
    id: 'GRV-2024-004',
    subject: 'Water Leakage in Main Pipe',
    category: 'Water Supply',
    date: '10 Dec, 2024',
    status: 'Pending',
    description: 'Huge water leakage observed on Main Road 4.'
  }
];

export default function MyGrievances() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const getStatusColor = (status) => {
    switch(status) {
      case 'Resolved': return { bg: '#F0FDF4', text: '#16A34A' };
      case 'Pending': return { bg: '#FFF7ED', text: '#EA580C' };
      case 'Rejected': return { bg: '#FEF2F2', text: '#EF4444' };
      default: return { bg: '#F1F5F9', text: '#64748B' };
    }
  };

  const renderItem = ({ item }) => {
    const statusStyle = getStatusColor(item.status);
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.idText}>{item.id}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.badgeText, { color: statusStyle.text }]}>{item.status}</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.category}>Category: {item.category}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        
        <TouchableOpacity style={styles.detailsBtn}>
          <Text style={styles.detailsBtnText}>View Details</Text>
          <Feather name="chevron-right" size={16} color="#134E5E" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Grievances</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Feather name="plus" size={24} color="#134E5E" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={GRIEVANCES}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  backBtn: { width: 40 },
  addBtn: { width: 40, alignItems: 'flex-end' },
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  idText: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  dateText: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 12 },
  subject: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
  category: { fontSize: 12, fontWeight: '600', color: '#64748B', marginBottom: 8 },
  description: { fontSize: 14, color: '#475569', lineHeight: 20, marginBottom: 12 },
  detailsBtn: { flexDirection: 'row', alignItems: 'center' },
  detailsBtnText: { fontSize: 14, fontWeight: '600', color: '#134E5E', marginRight: 4 },
});