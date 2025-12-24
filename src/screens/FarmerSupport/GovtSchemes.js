import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SCHEMES = [
  {
    title: 'PM Kisan Samman Nidhi',
    benefit: '₹6,000 per year income support',
    eligibility: 'All landholding farmers',
    deadline: 'Ongoing'
  },
  {
    title: 'Kisan Credit Card (KCC)',
    benefit: 'Short term loans at low interest',
    eligibility: 'Farmers, Tenant Farmers',
    deadline: 'Apply Anytime'
  },
  {
    title: 'PM Fasal Bima Yojana',
    benefit: 'Crop insurance coverage',
    eligibility: 'Loanee & Non-loanee farmers',
    deadline: '31st July'
  }
];

export default function GovtSchemes() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Govt. Schemes</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {SCHEMES.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.row}>
              <Feather name="gift" size={16} color="#16A34A" />
              <Text style={styles.infoText}>{item.benefit}</Text>
            </View>
            <View style={styles.row}>
              <Feather name="users" size={16} color="#2563EB" />
              <Text style={styles.infoText}>{item.eligibility}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.footer}>
              <Text style={styles.deadline}>Deadline: {item.deadline}</Text>
              <TouchableOpacity style={styles.applyBtn}>
                <Text style={styles.applyText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    borderWidth: 1, borderColor: '#F1F5F9', elevation: 2, shadowOpacity: 0.05,
  },
  title: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  infoText: { fontSize: 14, color: '#475569', marginLeft: 10 },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 12 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  deadline: { fontSize: 12, color: '#EF4444', fontWeight: '600' },
  applyBtn: { backgroundColor: '#F0FDF4', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  applyText: { color: '#16A34A', fontSize: 12, fontWeight: '700' },
});