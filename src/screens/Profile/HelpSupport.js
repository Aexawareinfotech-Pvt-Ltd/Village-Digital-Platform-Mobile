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

export default function HelpSupport() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const FAQItem = ({ question, answer }) => (
    <View style={styles.faqItem}>
      <Text style={styles.question}>{question}</Text>
      <Text style={styles.answer}>{answer}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Contact Card */}
        <View style={styles.contactCard}>
          <Text style={styles.cardTitle}>Need immediate help?</Text>
          <Text style={styles.cardSubtitle}>Our support team is available 24/7.</Text>
          <TouchableOpacity style={styles.callBtn}>
            <Feather name="phone" size={20} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={styles.callBtnText}>Call Support</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        
        <FAQItem 
          question="How do I list my produce?" 
          answer="Go to your Profile, select 'My Listings', and tap the '+' button to add new items." 
        />
        <FAQItem 
          question="Is my payment information safe?" 
          answer="Yes, we use bank-grade encryption to ensure all your transactions and data are secure." 
        />
        <FAQItem 
          question="How do I change my language?" 
          answer="Go to Profile > Settings > Language to switch between available languages." 
        />

        {/* Footer Links */}
        <View style={styles.footerLinks}>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
          <View style={styles.dot} />
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Terms of Service</Text>
          </TouchableOpacity>
        </View>

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
  contactCard: {
    backgroundColor: '#134E5E',
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
    alignItems: 'center',
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#FFF', marginBottom: 8 },
  cardSubtitle: { fontSize: 14, color: '#E2E8F0', marginBottom: 20, textAlign: 'center' },
  callBtn: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  callBtnText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 16 },
  faqItem: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  question: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 8 },
  answer: { fontSize: 14, color: '#64748B', lineHeight: 22 },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  linkText: { color: '#64748B', fontSize: 12, fontWeight: '600' },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#CBD5E1', marginHorizontal: 8 },
});