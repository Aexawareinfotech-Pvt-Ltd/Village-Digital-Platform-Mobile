import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity, 
  Image,
  Dimensions
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function GrievanceDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { grievance } = route.params;
  const insets = useSafeAreaInsets();

  const getStatusColor = (status) => {
    switch(status) {
      case 'Resolved': return { bg: '#F0FDF4', text: '#16A34A', label: 'Completed' };
      case 'Pending': return { bg: '#FFF7ED', text: '#EA580C', label: 'In Progress' };
      default: return { bg: '#FEF2F2', text: '#EF4444', label: 'Rejected' };
    }
  };

  const statusStyle = getStatusColor(grievance.status);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Header Image Area */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: grievance.image }} style={styles.image} />
        <View style={styles.overlay} />
        
        {/* Absolute Header with Back Button */}
        <View style={[styles.headerActions, { paddingTop: (insets.top || 20) + 10 }]}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="share-2" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Sheet */}
      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.topRow}>
            <View style={[styles.tag, { backgroundColor: '#E0F2F1' }]}>
              <Text style={styles.tagText}>{grievance.category}</Text>
            </View>
            <Text style={styles.dateText}>{grievance.date}</Text>
          </View>

          <Text style={styles.title}>{grievance.subject}</Text>
          
          {/* Status Box */}
          <View style={styles.statusBox}>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Status</Text>
              <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                <Text style={[styles.statusText, { color: statusStyle.text }]}>{grievance.status}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Ticket ID</Text>
              <Text style={styles.ticketValue}>{grievance.ticketId}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{grievance.description}</Text>

          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.locationBox}>
            <Feather name="map-pin" size={20} color="#134E5E" />
            <Text style={styles.locationText}>{grievance.location}</Text>
          </View>

          <Text style={styles.sectionTitle}>Admin Remarks</Text>
          <View style={styles.adminRemarkBox}>
            <Text style={styles.adminText}>
              {grievance.status === 'Resolved' 
                ? 'Work has been completed by the electrical department.' 
                : 'Your request has been forwarded to the concerned department. Expected resolution in 2 days.'}
            </Text>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  imageContainer: { height: 300, width: '100%' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  headerActions: {
    position: 'absolute', top: 0, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, zIndex: 10,
  },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  contentContainer: {
    flex: 1, marginTop: -30, backgroundColor: '#FFF',
    borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingTop: 30,
  },
  scrollContent: { paddingHorizontal: 24 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  tagText: { color: '#134E5E', fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  dateText: { color: '#94A3B8', fontSize: 14, fontWeight: '500' },
  title: { fontSize: 24, fontWeight: '800', color: '#1E293B', marginBottom: 24 },
  statusBox: {
    backgroundColor: '#F8FAFC', borderRadius: 16, padding: 16, marginBottom: 24,
    borderWidth: 1, borderColor: '#F1F5F9'
  },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusLabel: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 12, fontWeight: '700' },
  ticketValue: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 12 },
  description: { fontSize: 16, color: '#475569', lineHeight: 26, marginBottom: 24 },
  locationBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0FDFA',
    padding: 16, borderRadius: 12, marginBottom: 24,
  },
  locationText: { marginLeft: 12, fontSize: 15, color: '#134E5E', fontWeight: '600' },
  adminRemarkBox: {
    backgroundColor: '#FFF7ED', padding: 16, borderRadius: 12,
    borderLeftWidth: 4, borderLeftColor: '#F97316'
  },
  adminText: { fontSize: 14, color: '#9A3412', lineHeight: 22, fontStyle: 'italic' },
});