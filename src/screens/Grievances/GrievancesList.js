import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  StatusBar,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const GRIEVANCES_DATA = [
  {
    id: '1',
    ticketId: '#GRV-001',
    subject: 'Broken Street Light',
    category: 'Electricity',
    date: '12 Dec',
    status: 'Resolved',
    description: 'Street light near Panchayat Bhavan is not working for 3 days. It causes safety issues at night.',
    location: 'Main Market Road',
    // Updated: Stable image of a street light
    image: 'https://images.unsplash.com/photo-1496564203457-11bb12075d90?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    ticketId: '#GRV-004',
    subject: 'Water Leakage',
    category: 'Water Supply',
    date: '10 Dec',
    status: 'Pending',
    description: 'Huge water leakage observed on Main Road 4 near the school.',
    location: 'Sector 4, Near School',
    // Updated: Stable image of water flow/leakage
    image: 'https://images.unsplash.com/photo-1585669060258-2dc6a3976d09?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    ticketId: '#GRV-005',
    subject: 'Road Potholes',
    category: 'Roads',
    date: '08 Dec',
    status: 'Pending',
    description: 'Deep potholes on the village entrance road causing accidents.',
    location: 'Village Entrance',
    // Image of a Damaged Road
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    ticketId: '#GRV-006',
    subject: 'Garbage Dump',
    category: 'Sanitation',
    date: '05 Dec',
    status: 'Rejected',
    description: 'Garbage not collected for 2 weeks in lane 3.',
    location: 'Lane 3, East Wing',
    // Image of Trash/Dumpster area
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=800&auto=format&fit=crop'
  }
];

const TABS = ['All', 'Pending', 'Resolved'];

export default function GrievanceList() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('All');

  const filteredData = activeTab === 'All' 
    ? GRIEVANCES_DATA 
    : GRIEVANCES_DATA.filter(item => item.status === activeTab);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Resolved': return { bg: '#F0FDF4', text: '#16A34A', icon: 'check' };
      case 'Pending': return { bg: '#FFF7ED', text: '#EA580C', icon: 'clock' };
      case 'Rejected': return { bg: '#FEF2F2', text: '#EF4444', icon: 'x' };
      default: return { bg: '#F1F5F9', text: '#64748B', icon: 'info' };
    }
  };

  const renderItem = ({ item }) => {
    const statusStyle = getStatusColor(item.status);
    return (
      <TouchableOpacity 
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('GrievanceDetails', { grievance: item })}
      >
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
          {/* Status Badge Overlaid on Image */}
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.text }]}>{item.status}</Text>
          </View>
        </View>
        
        <View style={styles.cardContent}>
          <View style={styles.headerRow}>
            <Text style={styles.categoryText}>{item.category}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
          
          <Text style={styles.subject} numberOfLines={2}>{item.subject}</Text>
          
          <View style={styles.locationRow}>
            <Feather name="map-pin" size={12} color="#94A3B8" />
            <Text style={styles.locationText} numberOfLines={1}>{item.location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Grievances</Text>
          <Text style={styles.headerSubtitle}>Track and report issues</Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {TABS.map((tab) => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Grid List */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="inbox" size={48} color="#CBD5E1" />
            <Text style={styles.emptyText}>No grievances found</Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('GrievanceCreate')}
        activeOpacity={0.8}
      >
        <Feather name="plus" size={28} color="#FFF" />
      </TouchableOpacity>
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
    paddingVertical: 20, 
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#1E293B' 
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
  },
  tabContainer: { paddingHorizontal: 24, marginBottom: 20 },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeTab: { backgroundColor: '#134E5E', borderColor: '#134E5E' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#64748B' },
  activeTabText: { color: '#FFF' },
  
  list: { paddingHorizontal: 20, paddingBottom: 100 },
  columnWrapper: { justifyContent: 'space-between', marginBottom: 16 },
  
  // Card Styles (Grid Layout)
  card: {
    backgroundColor: '#FFF',
    width: (width - 56) / 2, 
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  imageWrapper: {
    height: 120,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  statusBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardContent: {
    padding: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#134E5E',
    textTransform: 'uppercase',
  },
  dateText: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
  },
  subject: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    lineHeight: 20,
    height: 40, 
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 11,
    color: '#94A3B8',
    marginLeft: 4,
    flex: 1,
  },
  
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 50 },
  emptyText: { marginTop: 10, color: '#94A3B8', fontSize: 14 },
  
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#134E5E',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#134E5E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});