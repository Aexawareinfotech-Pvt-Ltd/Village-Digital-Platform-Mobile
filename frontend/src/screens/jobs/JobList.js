import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  StatusBar,
  TextInput,
  Image,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const JOBS_DATA = [
  {
    id: '1',
    title: 'Panchayat Assistant',
    organization: 'Gram Panchayat Office',
    type: 'Government',
    salary: '₹12,000/mo',
    location: 'Rampur Village',
    posted: '2 days ago',
    description: 'Assist the Sarpanch in daily administrative tasks, record keeping, and digital data entry.',
    requirements: ['12th Pass', 'Basic Computer Skills', 'Local Resident'],
    logo: 'https://ui-avatars.com/api/?name=G+P&background=134E5E&color=fff&size=128'
  },
  {
    id: '2',
    title: 'Tractor Driver',
    organization: 'Sharma Farms',
    type: 'Private',
    salary: '₹15,000/mo',
    location: 'Sector 4 Fields',
    posted: '1 day ago',
    description: 'Experienced tractor driver needed for the sowing season. Must know basic vehicle maintenance.',
    requirements: ['Valid Driving License', '2+ Years Experience'],
    logo: 'https://ui-avatars.com/api/?name=S+F&background=E65100&color=fff&size=128'
  },
  {
    id: '3',
    title: 'Field Supervisor',
    organization: 'AgriTech Solutions',
    type: 'Contract',
    salary: '₹18,000/mo',
    location: 'District HQ',
    posted: '5 days ago',
    description: 'Supervise crop health monitoring and guide farmers on using organic fertilizers.',
    requirements: ['Diploma in Agriculture', 'Willing to travel'],
    logo: 'https://ui-avatars.com/api/?name=A+S&background=2E7D32&color=fff&size=128'
  },
  {
    id: '4',
    title: 'Anganwadi Helper',
    organization: 'Women & Child Dept',
    type: 'Government',
    salary: '₹10,500/mo',
    location: 'Community Center',
    posted: 'Just now',
    description: 'Help with meal distribution and basic education for children at the local Anganwadi center.',
    requirements: ['10th Pass', 'Female Candidates Only'],
    logo: 'https://ui-avatars.com/api/?name=W+C&background=C62828&color=fff&size=128'
  }
];

const CATEGORIES = ['All', 'Government', 'Private', 'Contract'];

export default function JobList() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('All');

  const filteredData = activeTab === 'All' 
    ? JOBS_DATA 
    : JOBS_DATA.filter(item => item.type === activeTab);

  const getBadgeColor = (type) => {
    switch(type) {
      case 'Government': return { bg: '#E0F2F1', text: '#00695C' };
      case 'Private': return { bg: '#FFF3E0', text: '#E65100' };
      case 'Contract': return { bg: '#F3E5F5', text: '#7B1FA2' };
      default: return { bg: '#F1F5F9', text: '#64748B' };
    }
  };

  const renderItem = ({ item }) => {
    const badgeStyle = getBadgeColor(item.type);
    return (
      <TouchableOpacity 
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('JobDetails', { job: item })}
      >
        <View style={styles.cardHeader}>
          <Image source={{ uri: item.logo }} style={styles.logo} />
          <View style={styles.headerInfo}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.orgName}>{item.organization}</Text>
          </View>
          <Feather name="bookmark" size={20} color="#94A3B8" />
        </View>

        <View style={styles.divider} />

        <View style={styles.tagsRow}>
          <View style={[styles.badge, { backgroundColor: badgeStyle.bg }]}>
            <Text style={[styles.badgeText, { color: badgeStyle.text }]}>{item.type}</Text>
          </View>
          <View style={styles.locationBadge}>
            <Feather name="map-pin" size={12} color="#64748B" style={{marginRight: 4}} />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.salary}>{item.salary}</Text>
          <Text style={styles.postedTime}>{item.posted}</Text>
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
          <Text style={styles.headerTitle}>Jobs</Text>
          <Text style={styles.headerSubtitle}>Find local opportunities</Text>
        </View>
        {/* Optional Right Action, e.g. Profile or Back */}
        <TouchableOpacity 
          style={styles.iconBtn} 
          onPress={() => navigation.goBack()}
        >
          <Feather name="x" size={24} color="#134E5E" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search roles, companies..."
            placeholderTextColor="#94A3B8"
          />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.tabsContainer}>
        <FlatList 
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.tab, activeTab === item && styles.activeTab]}
              onPress={() => setActiveTab(item)}
            >
              <Text style={[styles.tabText, activeTab === item && styles.activeTabText]}>{item}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingHorizontal: 24 }}
        />
      </View>

      {/* Job List */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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
    paddingVertical: 20,
  },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#1E293B' },
  headerSubtitle: { fontSize: 14, color: '#64748B', marginTop: 4, fontWeight: '500' },
  iconBtn: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: '#E0F2F1',
    justifyContent: 'center', alignItems: 'center'
  },
  searchWrapper: { paddingHorizontal: 24, marginBottom: 20 },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    borderRadius: 12, paddingHorizontal: 16, height: 50,
    borderWidth: 1, borderColor: '#E2E8F0',
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: '#1E293B', height: '100%' },
  tabsContainer: { marginBottom: 16 },
  tab: {
    paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20,
    backgroundColor: '#FFF', marginRight: 10, borderWidth: 1, borderColor: '#E2E8F0',
  },
  activeTab: { backgroundColor: '#134E5E', borderColor: '#134E5E' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#64748B' },
  activeTabText: { color: '#FFF' },
  list: { paddingHorizontal: 24, paddingBottom: 40 },
  card: {
    backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 16,
    borderWidth: 1, borderColor: '#F1F5F9',
    shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05, shadowRadius: 12, elevation: 3,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  logo: { width: 48, height: 48, borderRadius: 12, marginRight: 12 },
  headerInfo: { flex: 1 },
  jobTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
  orgName: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 12 },
  tagsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginRight: 10 },
  badgeText: { fontSize: 11, fontWeight: '700' },
  locationBadge: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 12, color: '#64748B', fontWeight: '500' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  salary: { fontSize: 16, fontWeight: '800', color: '#134E5E' },
  postedTime: { fontSize: 12, color: '#94A3B8' },
});