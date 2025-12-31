import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EventDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { event } = route.params;
  const insets = useSafeAreaInsets();

  const handleRegister = () => {
    Alert.alert("Registration", `You have successfully registered for ${event.title}!`);
  };

  const getCategoryColor = (cat) => {
    switch(cat) {
      case 'Cultural': return '#E65100'; 
      case 'Health': return '#C62828';
      case 'Governance': return '#134E5E';
      case 'Sports': return '#1565C0';
      default: return '#64748B';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Hero Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: event.image }} style={styles.image} />
        <View style={styles.overlay} />
        
        {/* Header Actions */}
        <View style={[styles.headerActions, { paddingTop: (insets.top || 20) + 10 }]}>
          <TouchableOpacity 
            style={styles.iconBtn} 
            onPress={() => navigation.goBack()}
          >
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
          
          <View style={styles.metaRow}>
            <View style={[styles.tag, { backgroundColor: getCategoryColor(event.category) }]}>
              <Text style={styles.tagText}>{event.category}</Text>
            </View>
            <View style={styles.statusRow}>
              <View style={styles.dot} />
              <Text style={styles.statusText}>{event.status}</Text>
            </View>
          </View>

          <Text style={styles.title}>{event.title}</Text>

          {/* Info Grid */}
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <View style={styles.iconCircle}>
                <Feather name="calendar" size={20} color="#134E5E" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoValue}>{event.fullDate}</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <View style={[styles.iconCircle, { backgroundColor: '#FFF7ED' }]}>
                <Feather name="clock" size={20} color="#E65100" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Time</Text>
                <Text style={styles.infoValue}>{event.time}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={[styles.iconCircle, { backgroundColor: '#E0F2F1' }]}>
                <Feather name="map-pin" size={20} color="#00695C" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>{event.location}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>About Event</Text>
          <Text style={styles.description}>{event.description}</Text>

          <Text style={styles.sectionTitle}>Organizer</Text>
          <View style={styles.organizerRow}>
            <View style={styles.orgAvatar}>
              <Text style={styles.orgInitial}>{event.organizer.charAt(0)}</Text>
            </View>
            <View>
              <Text style={styles.orgName}>{event.organizer}</Text>
              <Text style={styles.orgRole}>Official Organizer</Text>
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </View>

      {/* Bottom Action Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.registerBtnText}>Register Now</Text>
          <Feather name="arrow-right" size={20} color="#FFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  imageContainer: { height: 350, width: '100%' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.2)' },
  headerActions: {
    position: 'absolute', top: 0, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, zIndex: 10,
  },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center',
  },
  contentContainer: {
    flex: 1, marginTop: -40, backgroundColor: '#FFF',
    borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingTop: 30,
  },
  scrollContent: { paddingHorizontal: 24 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  tagText: { color: '#FFF', fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#16A34A', marginRight: 6 },
  statusText: { color: '#16A34A', fontSize: 12, fontWeight: '700' },
  title: { fontSize: 24, fontWeight: '800', color: '#1E293B', marginBottom: 24, lineHeight: 32 },
  infoGrid: { gap: 16 },
  infoItem: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#F1F5F9',
    justifyContent: 'center', alignItems: 'center', marginRight: 16,
  },
  infoLabel: { fontSize: 12, color: '#64748B', marginBottom: 2 },
  infoValue: { fontSize: 15, color: '#1E293B', fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 12 },
  description: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 24 },
  organizerRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 12, borderRadius: 12 },
  orgAvatar: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#CBD5E1',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  orgInitial: { fontSize: 20, fontWeight: '700', color: '#475569' },
  orgName: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  orgRole: { fontSize: 12, color: '#64748B' },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#FFF', paddingTop: 16, paddingHorizontal: 24,
    borderTopWidth: 1, borderTopColor: '#F1F5F9',
  },
  registerBtn: {
    backgroundColor: '#134E5E', height: 56, borderRadius: 16,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    shadowColor: '#134E5E', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
  },
  registerBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});