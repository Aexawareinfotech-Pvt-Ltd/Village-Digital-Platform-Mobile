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

export default function PrivacyPolicy() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.lastUpdated}>Last Updated: December 10, 2024</Text>
        
        <Text style={styles.sectionHeader}>1. Information We Collect</Text>
        <Text style={styles.paragraph}>
          We collect personal information that you voluntarily provide to us when you register on the Village Digital platform, such as your name, address, contact information, and occupation (e.g., Farmer).
        </Text>

        <Text style={styles.sectionHeader}>2. How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          We use personal information collected via our app for a variety of business purposes described below:
          {'\n'}• To facilitate account creation and logon process.
          {'\n'}• To send you administrative information.
          {'\n'}• To fulfill and manage your orders and grievance requests.
        </Text>

        <Text style={styles.sectionHeader}>3. Sharing Your Information</Text>
        <Text style={styles.paragraph}>
          We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may share data with local Gram Panchayat authorities for grievance redressal.
        </Text>

        <Text style={styles.sectionHeader}>4. Location Data</Text>
        <Text style={styles.paragraph}>
          We may request access or permission to and track location-based information from your mobile device, either continuously or while you are using our mobile application, to provide certain location-based services like nearby market prices or emergency services.
        </Text>

        <View style={{ height: 40 }} />
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
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  backBtn: { width: 40 },
  content: { padding: 24 },
  lastUpdated: { fontSize: 12, color: '#64748B', marginBottom: 20, fontStyle: 'italic' },
  sectionHeader: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 8, marginTop: 12 },
  paragraph: { fontSize: 14, color: '#475569', lineHeight: 24, marginBottom: 16, textAlign: 'justify' },
});