import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity,
  StatusBar,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MY_ITEMS = [
  {
    id: '1',
    title: 'John Deere 5310 Tractor',
    price: '₹5,50,000',
    status: 'Active',
    views: 124,
    image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Organic Wheat Seeds (50kg)',
    price: '₹2,200',
    status: 'Pending',
    views: 45,
    image: 'https://images.unsplash.com/photo-1501430654243-c934cec2e1c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  }
];

export default function MyListings() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleDelete = () => {
    Alert.alert("Delete Item", "Are you sure you want to remove this listing?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive" }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <View style={[styles.statusBadge, item.status === 'Active' ? styles.activeBadge : styles.pendingBadge]}>
            <Text style={[styles.statusText, item.status === 'Active' ? styles.activeText : styles.pendingText]}>
              {item.status}
            </Text>
          </View>
        </View>
        <Text style={styles.price}>{item.price}</Text>
        
        <View style={styles.footer}>
          <View style={styles.viewsRow}>
            <Feather name="eye" size={14} color="#64748B" />
            <Text style={styles.viewsText}>{item.views} Views</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Feather name="edit-2" size={18} color="#134E5E" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={handleDelete}>
              <Feather name="trash-2" size={18} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Listings</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Feather name="plus" size={24} color="#134E5E" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={MY_ITEMS}
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
  addBtn: { width: 40, alignItems: 'flex-end' },
  list: { padding: 24 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  image: { width: 90, height: 90, borderRadius: 12, backgroundColor: '#F1F5F9' },
  content: { flex: 1, marginLeft: 12, justifyContent: 'space-between' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: 15, fontWeight: '700', color: '#1E293B', flex: 1, marginRight: 8 },
  price: { fontSize: 16, fontWeight: '800', color: '#134E5E' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  activeBadge: { backgroundColor: '#F0FDF4' },
  pendingBadge: { backgroundColor: '#FFF7ED' },
  activeText: { fontSize: 10, fontWeight: '700', color: '#16A34A' },
  pendingText: { fontSize: 10, fontWeight: '700', color: '#EA580C' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  viewsRow: { flexDirection: 'row', alignItems: 'center' },
  viewsText: { fontSize: 12, color: '#64748B', marginLeft: 4 },
  actions: { flexDirection: 'row' },
  actionBtn: { padding: 8, marginLeft: 4 },
});