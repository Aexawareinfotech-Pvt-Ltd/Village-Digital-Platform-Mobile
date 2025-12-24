import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  StatusBar,
  Image,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const EVENTS_DATA = [
  {
    id: '1',
    title: 'Annual Village Fair (Mela)',
    category: 'Cultural',
    date: '20 Dec',
    fullDate: '20 December, 2024',
    time: '10:00 AM - 9:00 PM',
    location: 'Village Ground, Sector 2',
    organizer: 'Cultural Committee',
    description: 'Join us for the annual village fair featuring local handicrafts, food stalls, rides for children, and cultural performances in the evening.',
    // Updated: Image of a Mela/Fair with a Ferris wheel
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=800&q=80',
    status: 'Upcoming'
  },
  {
    id: '2',
    title: 'Free Eye Checkup Camp',
    category: 'Health',
    date: '22 Dec',
    fullDate: '22 December, 2024',
    time: '09:00 AM - 2:00 PM',
    location: 'Community Health Center',
    organizer: 'District Hospital Team',
    description: 'Free eye screenings for senior citizens. Cataract surgery registration will also be done on the spot.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    status: 'Registration Open'
  },
  {
    id: '3',
    title: 'Gram Sabha Meeting',
    category: 'Governance',
    date: '25 Dec',
    fullDate: '25 December, 2024',
    time: '11:00 AM',
    location: 'Panchayat Bhavan Hall',
    organizer: 'Sarpanch Office',
    description: 'Monthly Gram Sabha meeting to discuss the new road project and water supply timings. All residents are requested to attend.',
    image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80',
    status: 'Official'
  },
  {
    id: '4',
    title: 'Inter-Village Cricket Match',
    category: 'Sports',
    date: '28 Dec',
    fullDate: '28 December, 2024',
    time: '08:00 AM',
    location: 'High School Playground',
    organizer: 'Youth Club',
    description: 'The final match of the winter cricket tournament between Rampur and Dholakpur. Come support your team!',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    status: 'Sports'
  }
];

const CATEGORIES = ['All', 'Cultural', 'Health', 'Governance', 'Sports'];

export default function EventList() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('All');

  const filteredData = activeTab === 'All' 
    ? EVENTS_DATA 
    : EVENTS_DATA.filter(item => item.category === activeTab);

  const getCategoryColor = (cat) => {
    switch(cat) {
      case 'Cultural': return '#E65100'; // Orange
      case 'Health': return '#C62828';   // Red
      case 'Governance': return '#134E5E'; // Teal
      case 'Sports': return '#1565C0';   // Blue
      default: return '#64748B';
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('EventDetails', { event: item })}
      >
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
          
          {/* Category Badge */}
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>

          {/* Date Badge */}
          <View style={styles.dateBadge}>
            <Text style={styles.dateDay}>{item.date.split(' ')[0]}</Text>
            <Text style={styles.dateMonth}>{item.date.split(' ')[1]}</Text>
          </View>
        </View>
        
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          
          <View style={styles.row}>
            <Feather name="clock" size={14} color="#64748B" />
            <Text style={styles.infoText}>{item.time}</Text>
          </View>
          
          <View style={[styles.row, { marginTop: 4 }]}>
            <Feather name="map-pin" size={14} color="#64748B" />
            <Text style={styles.infoText} numberOfLines={1}>{item.location}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.footer}>
            <Text style={styles.organizer}>By {item.organizer}</Text>
            <TouchableOpacity style={styles.joinBtn}>
              <Text style={styles.joinBtnText}>Interested</Text>
            </TouchableOpacity>
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
          <Text style={styles.headerTitle}>Events</Text>
          <Text style={styles.headerSubtitle}>Community Calendar</Text>
        </View>
        <TouchableOpacity 
          style={styles.backBtnRight} 
          onPress={() => navigation.goBack()}
        >
          {/* Using 'x' icon as it's common for right-side dismissal/back actions, or you can use 'arrow-left' */}
          <Feather name="x" size={24} color="#134E5E" />
        </TouchableOpacity>
      </View>

      {/* Categories Horizontal List */}
      <View style={styles.tabsContainer}>
        <FlatList 
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === item && styles.activeTab
              ]}
              onPress={() => setActiveTab(item)}
            >
              <Text style={[
                styles.tabText, 
                activeTab === item && styles.activeTabText
              ]}>{item}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingHorizontal: 24 }}
        />
      </View>

      {/* Events List */}
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
  backBtnRight: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: '#E0F2F1',
    justifyContent: 'center', alignItems: 'center'
  },
  tabsContainer: { marginBottom: 16 },
  tab: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: '#FFF', marginRight: 10, borderWidth: 1, borderColor: '#E2E8F0',
  },
  activeTab: { backgroundColor: '#134E5E', borderColor: '#134E5E' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#64748B' },
  activeTabText: { color: '#FFF' },
  list: { paddingHorizontal: 24, paddingBottom: 40 },
  
  // Card Styles
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  imageWrapper: {
    height: 160,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  dateBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateDay: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  dateMonth: { fontSize: 10, fontWeight: '700', color: '#134E5E', textTransform: 'uppercase' },
  cardContent: { padding: 16 },
  title: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  infoText: { fontSize: 13, color: '#64748B', marginLeft: 6 },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 12 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  organizer: { fontSize: 12, color: '#94A3B8', fontWeight: '500' },
  joinBtn: {
    backgroundColor: '#F0FDFA', paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 8, borderWidth: 1, borderColor: '#CCFBF1'
  },
  joinBtnText: { color: '#134E5E', fontSize: 12, fontWeight: '700' },
});