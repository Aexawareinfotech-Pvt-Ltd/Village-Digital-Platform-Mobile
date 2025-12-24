import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  StatusBar, 
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  Alert,
  Image, // Import Image
  ImageBackground // Import ImageBackground for text over images
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient'; 

const { width } = Dimensions.get('window');

export default function Home() {
  const navigation = useNavigation();

  // Navigation Handlers
  const handleProfile = () => {
    Alert.alert("Profile", "Profile section coming soon!");
  };

  const handleServicePress = (serviceName) => {
    switch(serviceName) {
      case 'News': navigation.navigate('News'); break;
      case 'Market': navigation.navigate('Market'); break;
      case 'Events': navigation.navigate('Event'); break; // Navigate to Event Tab
      default: console.log(`Clicked on ${serviceName}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* 1. Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <LinearGradient
            colors={['#134E5E', '#71B280']}
            style={styles.logoBox}
          >
            <Text style={styles.logoText}>V</Text>
          </LinearGradient>
          <Text style={styles.appName}>Village Digital</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
             <Feather name="bell" size={24} color="#134E5E" />
             <View style={styles.badge} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfile} style={[styles.iconButton, {marginLeft: 10}]}>
            <Feather name="user" size={24} color="#134E5E" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 2. Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Connect, Grow, and Thrive</Text>
          <Text style={styles.heroSubtitle}>
            Your digital gateway to village services and community support.
          </Text>
          
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput 
              style={styles.searchInput}
              placeholder="Search for services, products..."
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity activeOpacity={0.8}>
              <LinearGradient
                colors={['#134E5E', '#71B280']}
                style={styles.searchButton}
              >
                <Feather name="search" size={20} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>
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
            { name: 'Health', icon: 'heart', color: '#C62828', bg: '#FFEBEE' },
            { name: 'Jobs', icon: 'briefcase', color: '#1565C0', bg: '#E3F2FD' },
            { name: 'More', icon: 'grid', color: '#455A64', bg: '#ECEFF1' },
          ].map((service, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.serviceCard}
              onPress={() => handleServicePress(service.name)}
            >
              <View style={[styles.serviceIcon, { backgroundColor: service.bg }]}>
                <Feather name={service.icon} size={24} color={service.color} />
              </View>
              <Text style={styles.serviceTitle}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 4. Latest News Scroll */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest Updates</Text>
          <TouchableOpacity onPress={() => navigation.navigate('News')}>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {/* News Card 1 */}
          <View style={styles.newsCard}>
            <ImageBackground 
              source={{ uri: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' }} 
              style={styles.newsImage}
            >
              <View style={[styles.tag, {backgroundColor: 'rgba(19, 78, 94, 0.9)'}]}>
                <Text style={styles.tagText}>Panchayat</Text>
              </View>
            </ImageBackground>
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle} numberOfLines={2}>New Road Project Approved for Sector 4</Text>
              <View style={styles.newsMeta}>
                <Feather name="clock" size={12} color="#94A3B8" />
                <Text style={styles.newsDate}>2h ago</Text>
              </View>
            </View>
          </View>

          {/* News Card 2 */}
          <View style={styles.newsCard}>
            <ImageBackground 
              source={{ uri: 'https://images.unsplash.com/photo-1625246333195-58197bd47d26?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' }} 
              style={styles.newsImage}
            >
               <View style={[styles.tag, {backgroundColor: 'rgba(46, 125, 50, 0.9)'}]}>
                <Text style={styles.tagText}>Agriculture</Text>
              </View>
            </ImageBackground>
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle} numberOfLines={2}>Monsoon Crop Guidelines Released</Text>
              <View style={styles.newsMeta}>
                <Feather name="clock" size={12} color="#94A3B8" />
                <Text style={styles.newsDate}>5h ago</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* 5. Marketplace Scroll */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Fresh from Market</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Market')}>
            <Text style={styles.seeAllText}>Browse</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {[
            { name: 'Organic Mangoes', price: '₹150/kg', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
            { name: 'Clay Pottery', price: '₹250', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
            { name: 'Pure Honey', price: '₹400', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
          ].map((item, index) => (
            <View key={index} style={styles.productCard}>
              <Image 
                source={{ uri: item.image }} 
                style={styles.productImage} 
                resizeMode="cover"
              />
              <Text style={styles.productTitle}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </View>
          ))}
        </ScrollView>

        {/* 6. Upcoming Events (Preview) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Event')}>
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
              <Text style={styles.eventLoc}>Community Hall • 10 AM</Text>
            </View>
            <TouchableOpacity style={styles.joinBtn}>
              <Text style={styles.joinBtnText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Padding for Tab Bar */}
        <View style={{height: 100}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    // Removed paddingTop for Android here to prevent the "gray gap"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    // Add top padding inside header for Android to cover status bar area seamlessly
    paddingTop: Platform.OS === 'android' ? 40 : 15,
    backgroundColor: '#FFFFFF',
    // Curves at the bottom
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10,
    marginBottom: 5,
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
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#134E5E',
  },
  iconButton: {
    padding: 4,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C62828',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#134E5E',
    marginBottom: 8,
    lineHeight: 32,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
    lineHeight: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRightWidth: 0,
    color: '#1E293B',
  },
  searchButton: {
    width: 50,
    height: 50,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#134E5E',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
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
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
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
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceIcon: {
    width: 55,
    height: 55,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  serviceTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  horizontalScroll: {
    paddingHorizontal: 20,
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
    height: 120,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  tag: {
    paddingHorizontal: 8,
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
    padding: 12,
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
    lineHeight: 22,
  },
  newsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsDate: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 4,
  },
  productCard: {
    width: 140,
    marginRight: 15,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#134E5E',
  },
  eventsContainer: {
    paddingHorizontal: 20,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  dateBox: {
    backgroundColor: '#E0F2F1',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginRight: 12,
  },
  dateDay: {
    fontSize: 18,
    fontWeight: '700',
    color: '#134E5E',
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: '700',
    color: '#004D40',
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
    marginTop: 2,
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
    fontWeight: '600',
  },
});