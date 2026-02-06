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

export default function TermsOfService() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.lastUpdated}>Effective Date: December 10, 2024</Text>
        
        <Text style={styles.sectionHeader}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By accessing and using the Village Digital Platform, you accept and agree to be bound by the terms and provision of this agreement.
        </Text>

        <Text style={styles.sectionHeader}>2. User Responsibilities</Text>
        <Text style={styles.paragraph}>
          You agree to use the platform only for lawful purposes. You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
        </Text>

        <Text style={styles.sectionHeader}>3. Marketplace Rules</Text>
        <Text style={styles.paragraph}>
          • Sellers must provide accurate descriptions of agricultural produce.
          {'\n'}• False or misleading listings may result in account suspension.
          {'\n'}• Transactions are conducted directly between buyer and seller; the platform is not liable for disputes.
        </Text>

        <Text style={styles.sectionHeader}>4. Grievance Redressal</Text>
        <Text style={styles.paragraph}>
          Frivolous or fake complaints submitted to the Gram Panchayat through this portal may lead to a ban from using the service. Please use this feature responsibly for genuine community issues.
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