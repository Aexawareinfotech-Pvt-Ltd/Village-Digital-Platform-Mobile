import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  StatusBar 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SoilTesting() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Soil Testing</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.banner}>
          <Feather name="layers" size={40} color="#8D6E63" />
          <Text style={styles.bannerText}>Healthy Soil = Better Yield</Text>
          <Text style={styles.bannerSub}>Test your soil every 2 years for best results.</Text>
        </View>

        <Text style={styles.sectionTitle}>Nearby Labs</Text>
        <View style={styles.card}>
          <Text style={styles.labName}>District Soil Testing Lab</Text>
          <Text style={styles.address}>Near Agriculture Office, District HQ</Text>
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.callBtn}>
              <Feather name="phone" size={18} color="#FFF" />
              <Text style={styles.btnText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mapBtn}>
              <Feather name="map" size={18} color="#134E5E" />
              <Text style={styles.mapText}>Directions</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>How to Collect Sample?</Text>
        <View style={styles.stepCard}>
          <Text style={styles.step}>1. Clear surface weeds/litter.</Text>
          <Text style={styles.step}>2. Dig a V-shape cut (6-8 inches deep).</Text>
          <Text style={styles.step}>3. Take slice of soil from top to bottom.</Text>
          <Text style={styles.step}>4. Mix samples from 5-6 spots in the field.</Text>
          <Text style={styles.step}>5. Pack 500g in a clean bag.</Text>
        </View>
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
  banner: {
    backgroundColor: '#EFEBE9', borderRadius: 16, padding: 24,
    alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: '#D7CCC8'
  },
  bannerText: { fontSize: 18, fontWeight: '800', color: '#5D4037', marginTop: 12 },
  bannerSub: { fontSize: 14, color: '#8D6E63', marginTop: 4, textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 12 },
  card: {
    backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 24,
    borderWidth: 1, borderColor: '#F1F5F9', elevation: 2,
  },
  labName: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
  address: { fontSize: 14, color: '#64748B', marginBottom: 16 },
  btnRow: { flexDirection: 'row', gap: 12 },
  callBtn: {
    flex: 1, backgroundColor: '#134E5E', padding: 12, borderRadius: 10,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8,
  },
  btnText: { color: '#FFF', fontWeight: '700' },
  mapBtn: {
    flex: 1, backgroundColor: '#F0FDFA', padding: 12, borderRadius: 10,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8,
    borderWidth: 1, borderColor: '#CCFBF1',
  },
  mapText: { color: '#134E5E', fontWeight: '700' },
  stepCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, gap: 12 },
  step: { fontSize: 14, color: '#475569', lineHeight: 22 },
});