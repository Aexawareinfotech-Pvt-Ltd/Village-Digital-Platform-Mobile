import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const APPLIED_JOBS = [
  {
    id: '1',
    title: 'Assistant Clerk',
    organization: 'Gram Panchayat Office',
    appliedDate: '15 Nov, 2024',
    status: 'Shortlisted',
    location: 'Rampur',
    salary: '₹12,000/mo',
    logo: 'https://ui-avatars.com/api/?name=G+P&background=134E5E&color=fff' // Placeholder Logo
  },
  {
    id: '2',
    title: 'Field Coordinator',
    organization: 'District Agriculture Dept',
    appliedDate: '01 Nov, 2024',
    status: 'Under Review',
    location: 'District HQ',
    salary: '₹15,000/mo',
    logo: 'https://ui-avatars.com/api/?name=A+D&background=2E7D32&color=fff'
  }
];

export default function MyJobs() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const getStatusColor = (status) => {
    switch(status) {
      case 'Shortlisted': return { bg: '#F0FDF4', text: '#16A34A' };
      case 'Under Review': return { bg: '#EFF6FF', text: '#2563EB' };
      case 'Rejected': return { bg: '#FEF2F2', text: '#EF4444' };
      default: return { bg: '#F1F5F9', text: '#64748B' };
    }
  };

  const renderItem = ({ item }) => {
    const statusStyle = getStatusColor(item.status);
    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Image source={{ uri: item.logo }} style={styles.logo} />
          <View style={styles.jobInfo}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.orgName}>{item.organization}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Feather name="map-pin" size={12} color="#94A3B8" />
                <Text style={styles.metaText}>{item.location}</Text>
              </View>
              <View style={styles.dot} />
              <View style={styles.metaItem}>
                 <Feather name="credit-card" size={12} color="#94A3B8" />
                 <Text style={styles.metaText}>{item.salary}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardBottom}>
          <View>
            <Text style={styles.label}>Applied On</Text>
            <Text style={styles.value}>{item.appliedDate}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.badgeText, { color: statusStyle.text }]}>{item.status}</Text>
          </View>
        </View>
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
        <Text style={styles.headerTitle}>Job Applications</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Feather name="filter" size={24} color="#134E5E" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={APPLIED_JOBS}
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
  filterBtn: { width: 40, alignItems: 'flex-end' },
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
  cardTop: { flexDirection: 'row', alignItems: 'flex-start' },
  logo: { width: 48, height: 48, borderRadius: 12, marginRight: 16 },
  jobInfo: { flex: 1 },
  jobTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
  orgName: { fontSize: 14, fontWeight: '600', color: '#134E5E', marginBottom: 6 },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  metaItem: { flexDirection: 'row', alignItems: 'center' },
  metaText: { fontSize: 12, color: '#64748B', marginLeft: 4 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#CBD5E1', marginHorizontal: 8 },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 14 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 11, color: '#94A3B8', marginBottom: 2 },
  value: { fontSize: 13, fontWeight: '600', color: '#334155' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: '700' },
});