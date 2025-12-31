import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FarmingTips() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const TIPS = [
    {
      title: 'Pest Control for Wheat',
      desc: 'Identify termites early. Use Chlorpyrifos 20 EC mixed with sand during sowing.',
      tag: 'Pest Control',
      color: '#C62828', bg: '#FFEBEE'
    },
    {
      title: 'Organic Fertilizer Guide',
      desc: 'How to make Vermicompost at home using farm waste and earthworms.',
      tag: 'Organic',
      color: '#15803D', bg: '#F0FDF4'
    },
    {
      title: 'Summer Crop Selection',
      desc: 'Best crops to grow in May-June: Moong, Urad, and Fodder crops.',
      tag: 'Seasonal',
      color: '#E65100', bg: '#FFF7ED'
    }
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crop Advisory</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {TIPS.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card} activeOpacity={0.9}>
            <View style={styles.cardHeader}>
              <View style={[styles.tagBadge, { backgroundColor: item.bg }]}>
                <Text style={[styles.tagText, { color: item.color }]}>{item.tag}</Text>
              </View>
              <Feather name="bookmark" size={20} color="#94A3B8" />
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
            <View style={styles.readMore}>
              <Text style={styles.readText}>Read Article</Text>
              <Feather name="chevron-right" size={16} color="#134E5E" />
            </View>
          </TouchableOpacity>
        ))}
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
  content: { padding: 24 },
  card: {
    backgroundColor: '#FFF', borderRadius: 16, padding: 20, marginBottom: 16,
    borderWidth: 1, borderColor: '#F1F5F9',
    shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05, shadowRadius: 12, elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  tagBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  tagText: { fontSize: 12, fontWeight: '700' },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 8 },
  cardDesc: { fontSize: 14, color: '#64748B', lineHeight: 22, marginBottom: 16 },
  readMore: { flexDirection: 'row', alignItems: 'center' },
  readText: { color: '#134E5E', fontWeight: '700', fontSize: 14, marginRight: 4 },
});