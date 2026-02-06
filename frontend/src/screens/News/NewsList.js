import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity, Image, TextInput, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const CATEGORIES = ['All', 'Agriculture', 'Panchayat', 'Health', 'Education', 'Events'];

const NEWS_DATA = [
  {
    id: '1',
    title: 'New Irrigation Canal Project Approved',
    category: 'Panchayat',
    date: '2 hours ago',
    // Construction image (Excavator)
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    description: 'The village council has approved the construction of a new canal to support farmers in the northern sector. This project aims to improve water availability during the dry season.'
  },
  {
    id: '2',
    title: 'Monsoon Crop Sowing Guidelines',
    category: 'Agriculture',
    date: '5 hours ago',
    // Agriculture image (Wheat Field)
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    description: 'Experts suggest specific sowing techniques for this monsoon season to maximize yield. Farmers are advised to use the new seed varieties provided by the agricultural center.'
  },
  {
    id: '3',
    title: 'Free Vaccination Camp this Sunday',
    category: 'Health',
    date: '1 day ago',
    // Health image (Stethoscope/Medical)
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    description: 'A team of doctors will visit the community hall for free checkups and vaccinations. All villagers are encouraged to bring their children for polio drops.'
  },
  {
    id: '4',
    title: 'New Books Added to Village Library',
    category: 'Education',
    date: '2 days ago',
    // Education image (Books)
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    description: 'Over 500 new educational books have been donated to the public library. The collection includes science, history, and literature books for students of all ages.'
  },
];

export default function NewsList() {
  const navigation = useNavigation(); 
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Filter Logic
  const filteredNews = NEWS_DATA.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderCategoryItem = ({ item }) => {
    const isSelected = item === selectedCategory;
    return (
      <TouchableOpacity 
        onPress={() => setSelectedCategory(item)}
        style={[
          styles.categoryChip, 
          isSelected && styles.categoryChipSelected
        ]}
      >
        <Text style={[
          styles.categoryText, 
          isSelected && styles.categoryTextSelected
        ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.newsCard} 
      activeOpacity={0.9}
      // Navigate to NewsDetails
      onPress={() => navigation.navigate('NewsDetails', { article: item })} 
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={[styles.tag, { backgroundColor: getCategoryColor(item.category) }]}>
            <Text style={styles.tagText}>{item.category}</Text>
          </View>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
        
        <View style={styles.cardFooter}>
          <Text style={styles.readMore}>Read full story</Text>
          <Feather name="arrow-right" size={16} color="#134E5E" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const getCategoryColor = (cat) => {
    switch(cat) {
      case 'Agriculture': return '#2E7D32';
      case 'Health': return '#C62828';
      case 'Panchayat': return '#134E5E';
      case 'Education': return '#F59E0B';
      default: return '#64748B';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Village News</Text>
          <Text style={styles.headerSubtitle}>Latest updates & announcements</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
           <Feather name="filter" size={20} color="#134E5E" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBox}>
          <Feather name="search" size={20} color="#94A3B8" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search news..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Categories Horizontal Scroll */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategoryItem}
          keyExtractor={item => item}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* News List */}
      <FlatList
        data={filteredNews} // Use filtered data
        renderItem={renderNewsItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#134E5E',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  iconButton: {
    padding: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
  },
  searchSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingBottom: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#1E293B',
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 15,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  categoryChipSelected: {
    backgroundColor: '#134E5E',
    borderColor: '#134E5E',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 20,
    paddingBottom: 100, // Space for bottom tab bar
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  dateText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    lineHeight: 24,
  },
  cardDesc: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#134E5E',
    marginRight: 5,
  },
});