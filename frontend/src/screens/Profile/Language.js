import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar,
  FlatList 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LANGUAGES = [
  { id: 'en', label: 'English', subLabel: 'English' },
  { id: 'hi', label: 'Hindi', subLabel: 'हिंदी' },
  { id: 'gj', label: 'Gujarati', subLabel: 'ગુજરાતી' },
];

export default function Language() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [selectedLang, setSelectedLang] = useState('en');

  const renderItem = ({ item }) => {
    const isSelected = selectedLang === item.id;
    return (
      <TouchableOpacity 
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => setSelectedLang(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.textContainer}>
          <Text style={[styles.label, isSelected && styles.selectedText]}>{item.label}</Text>
          <Text style={[styles.subLabel, isSelected && styles.selectedSubText]}>{item.subLabel}</Text>
        </View>
        {isSelected && (
          <View style={styles.checkCircle}>
            <Feather name="check" size={16} color="#FFF" />
          </View>
        )}
      </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Select Language</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Choose the language you want to use for the Village Digital app.
        </Text>
        <FlatList
          data={LANGUAGES}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.saveBtnText}>Apply Changes</Text>
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
  backBtn: { width: 40, alignItems: 'flex-start' },
  content: { padding: 24, flex: 1 },
  description: { fontSize: 14, color: '#64748B', marginBottom: 24, lineHeight: 22 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  selectedItem: {
    borderColor: '#134E5E',
    backgroundColor: '#F0FDFA',
  },
  textContainer: { flexDirection: 'column' },
  label: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  subLabel: { fontSize: 14, color: '#64748B', marginTop: 2 },
  selectedText: { color: '#134E5E' },
  selectedSubText: { color: '#0F766E' },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#134E5E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: { paddingHorizontal: 24 },
  saveBtn: {
    backgroundColor: '#134E5E',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: { fontSize: 16, fontWeight: '700', color: '#FFF' },
});