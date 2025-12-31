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
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CATEGORIES = ['Electricity', 'Water Supply', 'Roads', 'Sanitation', 'Others'];

export default function GrievanceCreate() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSubmit = () => {
    if (!subject || !description || !selectedCategory) {
      Alert.alert('Incomplete', 'Please fill all details before submitting.');
      return;
    }
    Alert.alert('Submitted', 'Your grievance has been submitted successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Grievance</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.label}>Select Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.catChip, selectedCategory === cat && styles.activeCatChip]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.catText, selectedCategory === cat && styles.activeCatText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Subject</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. Broken Pipe" 
            placeholderTextColor="#CBD5E1"
            value={subject}
            onChangeText={setSubject}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            placeholder="Describe the issue in detail..." 
            placeholderTextColor="#CBD5E1"
            multiline
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <Text style={styles.label}>Attach Evidence (Photo)</Text>
        <TouchableOpacity style={styles.uploadBox}>
          <View style={styles.uploadIconCircle}>
            <Feather name="camera" size={24} color="#134E5E" />
          </View>
          <Text style={styles.uploadText}>Tap to upload photo</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer Submit */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Submit Complaint</Text>
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
  label: { fontSize: 14, fontWeight: '700', color: '#64748B', marginBottom: 12 },
  catScroll: { marginBottom: 24 },
  catChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E2E8F0', marginRight: 10,
  },
  activeCatChip: { backgroundColor: '#134E5E', borderColor: '#134E5E' },
  catText: { color: '#64748B', fontWeight: '600' },
  activeCatText: { color: '#FFF' },
  inputGroup: { marginBottom: 24 },
  input: {
    backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0',
    padding: 16, fontSize: 16, color: '#1E293B',
  },
  textArea: { height: 120 },
  uploadBox: {
    height: 150, backgroundColor: '#F0FDFA', borderRadius: 16,
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