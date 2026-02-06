import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  StatusBar 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'Order Delivered',
    message: 'Your order #ORD-2023-001 has been successfully delivered.',
    time: '2 hours ago',
    icon: 'package',
    color: '#134E5E',
    bg: '#F0FDFA'
  },
  {
    id: '2',
    title: 'New Event Nearby',
    message: 'Village Health Camp is starting tomorrow at 10 AM.',
    time: '5 hours ago',
    icon: 'calendar',
    color: '#E65100',
    bg: '#FFF7ED'
  },
  {
    id: '3',
    title: 'Price Drop Alert',
    message: 'The price for "Organic Wheat Seeds" has dropped.',
    time: '1 day ago',
    icon: 'tag',
    color: '#16A34A',
    bg: '#F0FDF4'
  }
];

export default function Notifications() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
        <Feather name={item.icon} size={20} color={item.color} />
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={NOTIFICATIONS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
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
    paddingVertical: 16,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  backBtn: { width: 40 },
  clearText: { color: '#134E5E', fontWeight: '600', fontSize: 14 },
  list: { padding: 24 },
  item: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: { flex: 1, justifyContent: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  title: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  time: { fontSize: 12, color: '#94A3B8' },
  message: { fontSize: 14, color: '#64748B', lineHeight: 20 },
});