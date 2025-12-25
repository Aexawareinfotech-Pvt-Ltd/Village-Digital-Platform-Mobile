import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar,
  ScrollView,
  TextInput,
  Linking
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SERVICES = [
  {
    category: 'Health Services',
    icon: 'heart',
    color: '#C62828', // Red
    bg: '#FFEBEE',
    description: 'Hospitals, clinics, doctors, ambulance services',
    items: [
      { name: 'Village Community Health Center', info: 'Sector 2 • Open 24/7', phone: '108' },
      { name: 'Dr. Sharma Clinic', info: 'Main Market • 10 AM - 6 PM', phone: '9876543210' },
      { name: 'Ambulance Service', info: 'Emergency Rapid Response', phone: '102' },
      { name: 'Asha Worker Helpline', info: 'Maternal & Child Care', phone: '9876500001' },
    ]
  },
  {
    category: 'Police & Safety',
    icon: 'shield',
    color: '#1E40AF', // Blue
    bg: '#DBEAFE',
    description: 'Station details, helpline numbers',
    items: [
      { name: 'Rampur Police Station', info: 'Near Bus Stand • 24/7', phone: '100' },
      { name: 'Women Helpline', info: 'Domestic Violence & Safety', phone: '1091' },
      { name: 'Fire Station', info: 'District HQ Rapid Action', phone: '101' },
      { name: 'Cyber Crime Cell', info: 'Report Online Frauds', phone: '1930' },
    ]
  },
  {
    category: 'Education',
    icon: 'book-open',
    color: '#15803D', // Green
    bg: '#F0FDF4',
    description: 'Schools, colleges, scholarships',
    items: [
      { name: 'Govt High School', info: 'Sector 4 • 8 AM - 2 PM', phone: '011-987654' },
      { name: 'Village Digital Library', info: 'Community Hall • Free Wi-Fi', phone: 'N/A' },
      { name: 'Scholarship Info Desk', info: 'Panchayat Office • Mon-Fri', phone: '9876500002' },
      { name: 'Online Classes Center', info: 'Skill Development Hall', phone: '9876500003' },
    ]
  },
  {
    category: 'Government Offices',
    icon: 'briefcase',
    color: '#B45309', // Orange/Brown
    bg: '#FFFBEB',
    description: 'Panchayat, revenue, post office',
    items: [
      { name: 'Gram Panchayat Office', info: 'Village Square • Sarpanch', phone: '9876500004' },
      { name: 'Revenue Office (Patwari)', info: 'Land Records & Tax', phone: '9876500005' },
      { name: 'Post Office', info: 'Main Road • Speed Post/Banking', phone: '011-234567' },
      { name: 'E-Seva Kendra', info: 'Aadhaar/Ration Card Updates', phone: '9876500006' },
    ]
  },
  {
    category: 'Utilities',
    icon: 'zap',
    color: '#E65100', // Deep Orange
    bg: '#FFF7ED',
    description: 'Water supply, electricity, sanitation',
    items: [
      { name: 'Electricity Department', info: 'Bill Payment & Complaints', phone: '1912' },
      { name: 'Water Supply Tanker', info: 'Emergency Booking', phone: '9876500007' },
      { name: 'Sanitation Dept', info: 'Garbage Collection Issues', phone: '9876500008' },
      { name: 'Street Light Maintenance', info: 'Report Broken Lights', phone: '9876500009' },
    ]
  }
];

export default function ServiceDirectory() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');

  const handleCall = (number) => {
    if (number && number !== 'N/A') {
      Linking.openURL(`tel:${number}`);
    }
  };

  // Filter logic for Search
  const filteredServices = SERVICES.map(section => {
    const filteredItems = section.items.filter(item => 
      item.name.toLowerCase().includes(searchText.toLowerCase()) || 
      section.category.toLowerCase().includes(searchText.toLowerCase())
    );
    return { ...section, items: filteredItems };
  }).filter(section => section.items.length > 0);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Local Services</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#94A3B8" />
        <TextInput 
          style={styles.input}
          placeholder="Search hospitals, police, schools..."
          placeholderTextColor="#94A3B8"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {filteredServices.map((section, index) => (
          <View key={index} style={styles.section}>
            {/* Section Header */}
            <View style={styles.sectionHeader}>
              <View style={[styles.iconCircle, { backgroundColor: section.bg }]}>
                <Feather name={section.icon} size={20} color={section.color} />
              </View>
              <View style={styles.headerTextContainer}>
                <Text style={styles.sectionTitle}>{section.category}</Text>
                <Text style={styles.sectionDesc} numberOfLines={1}>{section.description}</Text>
              </View>
            </View>
            
            {/* List Items */}
            {section.items.map((item, idx) => (
              <View key={idx} style={[styles.itemRow, idx !== section.items.length - 1 && styles.divider]}>
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemInfo}>{item.info}</Text>
                </View>
                <TouchableOpacity 
                  style={[styles.callBtn, item.phone === 'N/A' && styles.disabledBtn]} 
                  onPress={() => handleCall(item.phone)}
                  disabled={item.phone === 'N/A'}
                >
                  <Feather name="phone" size={18} color={item.phone === 'N/A' ? '#CBD5E1' : '#134E5E'} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
        
        {filteredServices.length === 0 && (
          <View style={styles.emptyState}>
            <Feather name="search" size={40} color="#CBD5E1" />
            <Text style={styles.emptyText}>No services found matching "{searchText}"</Text>
          </View>
        )}

        <View style={{height: 40}} />
      </ScrollView>
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
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    marginHorizontal: 24, marginBottom: 20, paddingHorizontal: 16, height: 50,
    borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0',
  },
  input: { flex: 1, marginLeft: 10, fontSize: 15, color: '#1E293B', height: '100%' },
  content: { paddingHorizontal: 24 },
  section: {
    backgroundColor: '#FFF', borderRadius: 16, marginBottom: 20,
    borderWidth: 1, borderColor: '#F1F5F9', overflow: 'hidden',
    shadowColor: '#64748B', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#F8FAFC',
    borderBottomWidth: 1, borderBottomColor: '#F1F5F9',
  },
  iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  headerTextContainer: { flex: 1 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  sectionDesc: { fontSize: 12, color: '#64748B', marginTop: 2 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  divider: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  itemName: { fontSize: 15, fontWeight: '600', color: '#334155', marginBottom: 4 },
  itemInfo: { fontSize: 12, color: '#64748B' },
  callBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0F2F1',
    justifyContent: 'center', alignItems: 'center',
  },
  disabledBtn: { backgroundColor: '#F1F5F9' },
  emptyState: { alignItems: 'center', marginTop: 40 },
  emptyText: { color: '#94A3B8', marginTop: 10, fontSize: 14 },
});