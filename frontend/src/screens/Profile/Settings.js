import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity, 
  Switch 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Settings() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const SettingItem = ({ icon, label, type, value, onToggle, isLast }) => (
    <View style={[styles.item, isLast && styles.lastItem]}>
      <View style={styles.itemLeft}>
        <View style={styles.iconBox}>
          <Feather name={icon} size={20} color="#134E5E" />
        </View>
        <Text style={styles.itemLabel}>{label}</Text>
      </View>
      {type === 'toggle' ? (
        <Switch 
          trackColor={{ false: "#CBD5E1", true: "#134E5E" }}
          thumbColor="#FFF"
          value={value}
          onValueChange={onToggle}
        />
      ) : (
        <Feather name="chevron-right" size={20} color="#CBD5E1" />
      )}
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.section}>
          <SettingItem 
            icon="bell" 
            label="Push Notifications" 
            type="toggle" 
            value={notifications} 
            onToggle={setNotifications} 
          />
          <SettingItem 
            icon="map-pin" 
            label="Location Services" 
            type="toggle" 
            value={location} 
            onToggle={setLocation} 
          />
          <SettingItem 
            icon="moon" 
            label="Dark Mode" 
            type="toggle" 
            value={darkMode} 
            onToggle={setDarkMode} 
            isLast={true} 
          />
        </View>

        <Text style={styles.sectionTitle}>General</Text>
        <View style={styles.section}>
          {/* Navigation updated to link to new files */}
          <TouchableOpacity activeOpacity={0.7} onPress={() =>{ navigation.navigate('Language') 
            console.log('Navigate to Language')}}>
            <SettingItem icon="globe" label="Language" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('PrivacyPolicy')}>
            <SettingItem icon="lock" label="Privacy Policy" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('TermsOfService')}>
            <SettingItem icon="file-text" label="Terms of Service" isLast={true} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
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
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: '#1E293B',
    textAlign: 'center',
    flex: 1, 
  },
  backBtn: { 
    width: 40, 
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 40,
  },
  content: { padding: 24 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#64748B', marginBottom: 12, marginLeft: 4 },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F0FDFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemLabel: { fontSize: 16, color: '#1E293B', fontWeight: '600' },
  deleteBtn: { alignItems: 'center', padding: 16, marginTop: 10 },
  deleteText: { color: '#EF4444', fontWeight: '700', fontSize: 16 },
});