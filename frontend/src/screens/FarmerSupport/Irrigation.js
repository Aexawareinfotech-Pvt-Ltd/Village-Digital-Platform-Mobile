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

export default function Irrigation() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Irrigation</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Wheat Field (North)</Text>
          <View style={styles.row}>
            <Feather name="calendar" size={16} color="#64748B" />
            <Text style={styles.text}>Next: Tomorrow, 6:00 AM</Text>
          </View>
          <View style={styles.statusBox}>
            <Text style={styles.status}>Status: Scheduled</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Vegetable Plot</Text>
          <View style={styles.row}>
            <Feather name="check-circle" size={16} color="#16A34A" />
            <Text style={styles.text}>Last: Yesterday, 5:00 PM</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.addBtn}>
          <Feather name="plus" size={24} color="#FFF" />
          <Text style={styles.addText}>Add Schedule</Text>
        </TouchableOpacity>
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
    borderWidth: 1, borderColor: '#F1F5F9', elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  text: { color: '#64748B', fontSize: 14 },
  statusBox: { backgroundColor: '#F0F9FF', padding: 8, borderRadius: 8, alignSelf: 'flex-start' },
  status: { color: '#0284C7', fontWeight: '700', fontSize: 12 },
  addBtn: {
    backgroundColor: '#134E5E', padding: 16, borderRadius: 16,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8,
    marginTop: 20,
  },
  addText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});