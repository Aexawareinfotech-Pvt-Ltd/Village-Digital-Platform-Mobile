import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StatusBar,
  Alert 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function JobApply() {
  const navigation = useNavigation();
  const route = useRoute();
  const { job } = route.params;
  const insets = useSafeAreaInsets();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !phone || !experience) {
      Alert.alert('Incomplete', 'Please fill in all required fields.');
      return;
    }
    Alert.alert(
      'Application Submitted!', 
      `Your application for ${job.title} at ${job.organization} has been sent.`, 
      [{ text: 'OK', onPress: () => navigation.navigate('Market') }] // Navigate back to main or jobs
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Apply for Job</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Job Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.orgName}>{job.organization}</Text>
          <View style={styles.locRow}>
            <Feather name="map-pin" size={12} color="#64748B" />
            <Text style={styles.locText}>{job.location}</Text>
          </View>
        </View>

        <Text style={styles.sectionHeader}>Personal Details</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name <Text style={styles.required}>*</Text></Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter your full name" 
            placeholderTextColor="#CBD5E1"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number <Text style={styles.required}>*</Text></Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter 10-digit number" 
            placeholderTextColor="#CBD5E1"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Years of Experience <Text style={styles.required}>*</Text></Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. 2 Years" 
            placeholderTextColor="#CBD5E1"
            value={experience}
            onChangeText={setExperience}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Why should we hire you?</Text>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            placeholder="Briefly describe your skills..." 
            placeholderTextColor="#CBD5E1"
            multiline
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />
        </View>

        <Text style={styles.label}>Resume / CV (Optional)</Text>
        <TouchableOpacity style={styles.uploadBox}>
          <View style={styles.uploadIconCircle}>
            <Feather name="upload-cloud" size={24} color="#134E5E" />
          </View>
          <Text style={styles.uploadText}>Upload PDF or Image</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer Submit */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Submit Application</Text>
        </TouchableOpacity>
      </View>
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
  scrollContent: { padding: 24 },
  summaryCard: {
    backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 24,
    borderWidth: 1, borderColor: '#F1F5F9',
  },
  jobTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
  orgName: { fontSize: 14, color: '#64748B', fontWeight: '500', marginBottom: 8 },
  locRow: { flexDirection: 'row', alignItems: 'center' },
  locText: { fontSize: 12, color: '#64748B', marginLeft: 4 },
  sectionHeader: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 16 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#64748B', marginBottom: 8 },
  required: { color: '#EF4444' },
  input: {
    backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0',
    padding: 16, fontSize: 16, color: '#1E293B',
  },
  textArea: { height: 100 },
  uploadBox: {
    height: 120, backgroundColor: '#F0FDFA', borderRadius: 16,
    borderWidth: 2, borderColor: '#CCFBF1', borderStyle: 'dashed',
    justifyContent: 'center', alignItems: 'center',
  },
  uploadIconCircle: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#E0F2F1',
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  uploadText: { color: '#134E5E', fontWeight: '600' },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#FFF', paddingTop: 16, paddingHorizontal: 24,
    borderTopWidth: 1, borderTopColor: '#F1F5F9',
  },
  submitBtn: {
    backgroundColor: '#134E5E', height: 56, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#134E5E', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8,
  },
  submitBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});