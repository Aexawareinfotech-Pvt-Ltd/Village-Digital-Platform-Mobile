import React from 'react';
import { 
    View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity, 
  TextInput, 
  Dimensions, 
  Platform, 
  Image, 
  ImageBackground 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Synced Data from NewsList.js to ensure consistency
const RECENT_NEWS = [
  {
    id: '1',
    title: 'New Irrigation Canal Project Approved',
    category: 'Panchayat',
    date: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    description: 'The village council has approved the construction of a new canal to support farmers in the northern sector.'
},
  {
    id: '2',
    title: 'Monsoon Crop Sowing Guidelines',
    category: 'Agriculture',
    date: '5 hours ago',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    description: 'Experts suggest specific sowing techniques for this monsoon season to maximize yield.'
},
  {
    id: '3',
    title: 'Free Vaccination Camp this Sunday',
    category: 'Health',
    date: '1 day ago',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    description: 'A team of doctors will visit the community hall for free checkups and vaccinations.'    
 }
];

// Synced Market Data (Same as MarketPlaceList.js)
const MARKET_ITEMS = [
  {
    id: '1',
    title: 'John Deere 5310 Tractor',
    price: '₹5,50,000',
    category: 'Vehicles',
    location: 'Rampur Village',
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=800&auto=format&fit=crop',
    seller: 'Ramesh Kumar',
    description: '2021 Model, 55HP. Excellent condition, new tires installed last month.',
    contact: '9876543210'
  },
  {
    id: '2',
    title: 'Organic Wheat Seeds (50kg)',
    price: '₹2,200',
    category: 'Seeds',
    location: 'Dholakpur',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop',
    seller: 'Kisan Kendra',
    description: 'High yield organic wheat seeds. Certified by state agriculture board.',
    contact: '9876543210'
  },
  {
    id: '3',
    title: 'Solar Water Pump',
    price: '₹25,000',
    category: 'Equipment',
    location: 'Sonpur',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop',
    seller: 'Green Energy Sol',
    description: '3HP Solar submersible pump. 5 year warranty included.',
    contact: '9876543210'
  },
  {
    id: '4',
    title: 'Jersey Cow (Milking)',
    price: '₹45,000',
    category: 'Livestock',
    location: 'Bopal',
    image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=800&auto=format&fit=crop',
    seller: 'Suresh Yadav',
    description: 'Healthy Jersey cow, 15L milk capacity per day. 2nd lactation.',
    contact: '9876543210'
}
];

export default function Home() {
  const navigation = useNavigation();

  const insets = useSafeAreaInsets();

  const handleProfile = () => {
    navigation.navigate('Profile')
  };

  const handlenotifications = () => {
    navigation.navigate('Notifications')
};

  const handleServicePress = (serviceName) => {
    switch(serviceName) {
      case 'News': navigation.navigate('News'); break;
      case 'Market': navigation.navigate('Market'); break;
      case 'Grievance': navigation.navigate('Grievance'); break; 
      case 'Events': navigation.navigate('EventList'); break;
      default: console.log(`Clicked on ${serviceName}`);
    }
  };

  // Helper for tag colors (Consistent with NewsList)
  const getCategoryColor = (cat) => {
    switch(cat) {
      case 'Agriculture': return '#2E7D32';
      case 'Health': return '#C62828';
      case 'Panchayat': return '#134E5E';
   // Market Categories
      case 'Vehicles': return '#134E5E';
      case 'Seeds': return '#2E7D32';
      case 'Equipment': return '#F59E0B';
      case 'Livestock': return '#C62828';
      default: return '#64748B';
    }
  };

 return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* 1. Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <LinearGradient
            colors={['#134E5E', '#71B280']}
            style={styles.logoBox}
          >
            <Text style={styles.logoText}>V</Text>
          </LinearGradient>
          <View>
             <Text style={styles.welcomeText}>Welcome back,</Text>
             <Text style={styles.appName}>Village Digital</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handlenotifications} style={styles.iconButton}>
             <Feather name="bell" size={24} color="#134E5E" />
             <View style={styles.badge} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfile} style={[styles.iconButton, {marginLeft: 12}]}>
            <Feather name="user" size={24} color="#134E5E" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* 2. Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Connect, Grow, & Thrive</Text>
          <Text style={styles.heroSubtitle}>
            Your digital gateway to village services and community support.
          </Text>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search services, products..."
              placeholderTextColor="#94A3B8"
            />
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1.2k+</Text>
              <Text style={styles.statLabel}>Active Villagers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Services Listed</Text>
            </View>
          </View>
        </View>

        {/* 3. Services Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
        </View>

        <View style={styles.servicesGrid}>
          {[
            { name: 'News', icon: 'file-text', color: '#134E5E', bg: '#E0F2F1' },
            { name: 'Market', icon: 'shopping-bag', color: '#2E7D32', bg: '#E8F5E9' },
            { name: 'Events', icon: 'calendar', color: '#E65100', bg: '#FFF3E0' },
            { name: 'Grievance', icon: 'message-square', color: '#EF4444', bg: '#FEF2F2' },
            { name: 'Jobs', icon: 'briefcase', color: '#1565C0', bg: '#E3F2FD' },
            { name: 'More', icon: 'grid', color: '#455A64', bg: '#ECEFF1' },
          ].map((service, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.serviceCard}
              onPress={() => handleServicePress(service.name)}
              activeOpacity={0.7}
            >
              <View style={[styles.serviceIcon, { backgroundColor: service.bg }]}>
                <Feather name={service.icon} size={22} color={service.color} />
              </View>
              <Text style={styles.serviceTitle}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 4. Latest News Scroll (Dynamically Mapped) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest Updates</Text>
          <TouchableOpacity onPress={() => navigation.navigate('News')}>
                <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {RECENT_NEWS.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={styles.newsCard}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('NewsDetails', { article: item })}
            >
              <ImageBackground 
                source={{ uri: item.image }} 
                style={styles.newsImage}
                imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
              >
                <View style={styles.overlay} />
                <View style={[styles.tag, {backgroundColor: getCategoryColor(item.category)}]}>
                  <Text style={styles.tagText}>{item.category}</Text>
                </View>
              </ImageBackground>
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
                <View style={styles.newsMeta}>
                  <Feather name="clock" size={12} color="#94A3B8" />
                  <Text style={styles.newsDate}>{item.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* 5. Marketplace Scroll */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Fresh from Market</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Market')}>
            <Text style={styles.seeAllText}>Browse</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {MARKET_ITEMS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.productCard}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('MarketPlaceDetails', { item })}
            >
              <View style={styles.imageWrapper}>
                <Image 
                  source={{ uri: item.image }} 
                  style={styles.productImage} 
                  resizeMode="cover"
                />
                <View style={[styles.marketBadge, { backgroundColor: getCategoryColor(item.category) }]}>
                  <Text style={styles.marketBadgeText}>{item.category}</Text>
                </View>
              </View>
              

              <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                
                <View style={styles.locationRow}>
                  <Feather name="map-pin" size={10} color="#94A3B8" />
                  <Text style={styles.locationText}>{item.location}</Text>
                </View>
                </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 6. Upcoming Events */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EventList')}>
             <Text style={styles.seeAllText}>Calendar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.eventsContainer}>
          <View style={styles.eventRow}>
            <View style={styles.dateBox}>
              <Text style={styles.dateDay}>15</Text>
              <Text style={styles.dateMonth}>DEC</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>Village Health Camp</Text>
              <Text style={styles.eventLoc}>Community Hall • 10:00 AM</Text>
            </View>
            <TouchableOpacity style={styles.joinBtn}>
              <Text style={styles.joinBtnText}>Join</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.eventRow, {marginTop: 12}]}>
            <View style={[styles.dateBox, {backgroundColor: '#FFF7ED', borderColor: '#FFEDD5'}]}>
              <Text style={[styles.dateDay, {color: '#EA580C'}]}>20</Text>
              <Text style={[styles.dateMonth, {color: '#C2410C'}]}>DEC</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>Annual Cultural Fest</Text>
              <Text style={styles.eventLoc}>Village Square • 6:00 PM</Text>
            </View>
            <TouchableOpacity style={[styles.joinBtn, {backgroundColor: '#EA580C'}]}>
              <Text style={styles.joinBtnText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Padding for Tab Bar */}
        <View style={{height: 120}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#F8FAFC',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 20,
  },
  welcomeText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  appName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#134E5E',
    letterSpacing: -0.5,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroSection: {
    margin: 24,
    marginTop: 8,
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 8,
    lineHeight: 32,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
    lineHeight: 22,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
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
    fontSize: 15,
    color: '#1E293B',
    height: '100%',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#134E5E',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#CBD5E1',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  seeAllText: {
    color: '#134E5E',
    fontWeight: '600',
    fontSize: 14,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: (width - 48 - 32) / 3, 
    alignItems: 'center',
    marginBottom: 24,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    textAlign: 'center',
  },
  horizontalScroll: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  newsCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
  },
  newsImage: {
    height: 150,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  newsContent: {
    padding: 16,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    lineHeight: 24,
  },
  newsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsDate: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 6,
    fontWeight: '500',
  },
  
  // Updated Product Card Styles to match MarketPlaceList
  productCard: {
    width: 180, // Slightly wider to accommodate real data
    marginRight: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
  },
  imageWrapper: {
    height: 120,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  marketBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  marketBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  productInfo: {
    padding: 12,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#134E5E', // Primary Color for price
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 11,
    color: '#94A3B8',
    marginLeft: 4,
  },

  eventsContainer: {
    paddingHorizontal: 24,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  dateBox: {
    backgroundColor: '#F0FDFA',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#CCFBF1',
    minWidth: 50,
  },
  dateDay: {
    fontSize: 18,
    fontWeight: '800',
    color: '#134E5E',
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F766E',
    marginTop: -2,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  eventLoc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
  },
  joinBtn: {
    backgroundColor: '#134E5E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  }
});