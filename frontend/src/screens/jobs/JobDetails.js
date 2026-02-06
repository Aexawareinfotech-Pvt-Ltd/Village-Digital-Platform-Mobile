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

export default function JobDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { job } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Custom Header */}
      <View style={[styles.header, { paddingTop: (insets.top || 20) + 10 }]}>
        <TouchableOpacity 
          style={styles.iconBtn} 
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Details</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Feather name="share-2" size={24} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        {/* Job Header Card */}
        <View style={styles.mainCard}>
          <Image source={{ uri: job.logo }} style={styles.logo} />
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.org}>{job.organization}</Text>
          
          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <Feather name="briefcase" size={14} color="#64748B" style={{marginRight: 6}} />
              <Text style={styles.tagText}>{job.type}</Text>
            </View>
            <View style={styles.tag}>
              <Feather name="map-pin" size={14} color="#64748B" style={{marginRight: 6}} />
              <Text style={styles.tagText}>{job.location}</Text>
            </View>
          </View>
        </View>

        {/* Salary Section */}
        <View style={styles.salaryBox}>
          <View>
            <Text style={styles.salaryLabel}>Monthly Salary</Text>
            <Text style={styles.salaryValue}>{job.salary}</Text>
          </View>
          <View style={styles.applyByBox}>
            <Text style={styles.applyLabel}>Apply Before</Text>
            <Text style={styles.applyDate}>30 Dec</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{job.description}</Text>

        {/* Requirements List */}
        <Text style={styles.sectionTitle}>Requirements</Text>
        <View style={styles.reqList}>
          {job.requirements.map((req, index) => (
            <View key={index} style={styles.reqItem}>
              <View style={styles.bullet} />
              <Text style={styles.reqText}>{req}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity 
          style={styles.applyBtn} 
          onPress={() => navigation.navigate('JobApply', { job })}
        >
          <Text style={styles.applyBtnText}>Apply Now</Text>
          <Feather name="arrow-right" size={20} color="#FFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, paddingBottom: 16, backgroundColor: '#F8FAFC',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B' },
  iconBtn: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFF',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#E2E8F0',
  },
  content: { padding: 24 },
  mainCard: {
    alignItems: 'center', backgroundColor: '#FFF', borderRadius: 20,
    padding: 24, marginBottom: 20, borderWidth: 1, borderColor: '#F1F5F9',
  },
  logo: { width: 80, height: 80, borderRadius: 20, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '800', color: '#1E293B', textAlign: 'center', marginBottom: 4 },
  org: { fontSize: 16, color: '#64748B', fontWeight: '500', marginBottom: 20 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 },
  tag: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9',
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10,
  },
  tagText: { color: '#475569', fontSize: 13, fontWeight: '600' },
  salaryBox: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#E0F2F1', padding: 20, borderRadius: 16, marginBottom: 24,
    borderWidth: 1, borderColor: '#B2DFDB',
  },
  salaryLabel: { fontSize: 12, color: '#00695C', fontWeight: '600', marginBottom: 4 },
  salaryValue: { fontSize: 20, color: '#004D40', fontWeight: '800' },
  applyByBox: { alignItems: 'flex-end' },
  applyLabel: { fontSize: 12, color: '#00695C', marginBottom: 4 },
  applyDate: { fontSize: 16, color: '#004D40', fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 12 },
  description: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 24 },
  reqList: { marginBottom: 24 },
  reqItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#134E5E', marginRight: 12 },
  reqText: { fontSize: 15, color: '#334155', lineHeight: 22, flex: 1 },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#FFF', paddingTop: 16, paddingHorizontal: 24,
    borderTopWidth: 1, borderTopColor: '#F1F5F9',
  },
  applyBtn: {
    backgroundColor: '#134E5E', height: 56, borderRadius: 16,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    shadowColor: '#134E5E', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
  },
  applyBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});