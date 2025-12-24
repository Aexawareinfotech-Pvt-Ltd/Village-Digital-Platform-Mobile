import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, TextInput, Dimensions, Platform, Alert, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient'; 

const { width } = Dimensions.get('window');

// Synced Data from NewsList.js to ensure consistency
const RECENT_NEWS = [
  {
    id: '1',
    title: 'New Irrigation Canal Project Approved',
    category: 'Panchayat',
    date: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    description: 'The village council has approved the construction of a new canal to support farmers in the northern sector. This project aims to improve water availability during the dry season.'
  },
  {
    id: '2',
    title: 'Monsoon Crop Sowing Guidelines',
    category: 'Agriculture',
    date: '5 hours ago',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    description: 'Experts suggest specific sowing techniques for this monsoon season to maximize yield. Farmers are advised to use the new seed varieties provided by the agricultural center.'
  },
  {
    id: '3',
    title: 'Free Vaccination Camp this Sunday',
    category: 'Health',
    date: '1 day ago',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    description: 'A team of doctors will visit the community hall for free checkups and vaccinations. All villagers are encouraged to bring their children for polio drops.'
  }
];

export default function Home() {
  const navigation = useNavigation();


  const handleProfile = () => {
    Alert.alert("Profile", "Profile section coming soon!");
  };

  const handleServicePress = (serviceName) => {
    switch(serviceName) {
      case 'News': navigation.navigate('News'); break;
      case 'Market': navigation.navigate('Market'); break;
      case 'Events': navigation.navigate('Event'); break; 
      default: console.log(`Clicked on ${serviceName}`);
    }
  };

  // Helper for tag colors (Consistent with NewsList)
  const getCategoryColor = (cat) => {
    switch(cat) {
      case 'Agriculture': return '#2E7D32';
      case 'Health': return '#C62828';
      case 'Panchayat': return '#134E5E';
      default: return '#64748B';
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
          <TouchableOpacity onPress={handleProfile} style={[styles.iconButton, {marginLeft: 8}]}>
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
            <TextInput 
              style={styles.searchInput}
              placeholder="Search services, products..."
              placeholderTextColor="#94A3B8"
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
          {[
            { name: 'Organic Mangoes', price: '₹150/kg', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
            { name: 'Clay Pottery', price: '₹250', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
            { name: 'Pure Honey', price: '₹400', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
            { name: 'Handwoven Shawls', price: '₹800', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
          ].map((item, index) => (
            <View key={index} style={styles.productCard}>
              <Image 
                source={{ uri: item.image }} 
                style={styles.productImage} 
                resizeMode="cover"
              />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* 6. Upcoming Events */}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    // Dynamic top padding for seamless Android look
    paddingTop: Platform.OS === 'android' ? 45 : 15,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    // Modern soft shadow
    shadowColor: '#134E5E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
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
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 20,
  },
  appName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#134E5E',
    letterSpacing: -0.5,
  },
  iconButton: {
    padding: 6,
    position: 'relative',
    backgroundColor: '#F1F5F9',
    borderRadius: 50,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroSection: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    // Modern card shadow

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
    lineHeight: 30,
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
    height: 50,




  },
  searchInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingHorizontal: 16,
    height: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRightWidth: 0,
    color: '#0F172A',
    fontSize: 15,
  },
  searchButton: {
    width: 50,
    height: '100%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 5,
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
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 25,
    backgroundColor: '#CBD5E1',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
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
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: (width - 60) / 3, // Precise calculation for 3 columns with spacing
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    // Subtle inner shadow effect via border
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',


  },
  serviceTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
  },
  horizontalScroll: {
    paddingHorizontal: 20,
    paddingBottom: 10, // Avoid clipping shadow
  },
  newsCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
    // Soft shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  newsImage: {
    height: 140,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)', // Light overlay for contrast
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
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
    fontWeight: '500',
  },
  productCard: {
    width: 150,
    marginRight: 15,
    backgroundColor: '#FFF',
    borderRadius: 16,

    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 110,
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 15,
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  dateBox: {
    backgroundColor: '#F0FDFA', // Minty background
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#CCFBF1',
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
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
  },
  joinBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
});