import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function FarmerSupport() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const ActionButton = ({ icon, label, color, bg, route }) => (
    <TouchableOpacity 
      style={styles.actionBtn}
      onPress={() => navigation.navigate(route)}
      activeOpacity={0.8}
    >
      <View style={[styles.actionIcon, { backgroundColor: bg }]}>
        <Feather name={icon} size={28} color={color} />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#134E5E" />
      
      {/* Green Header Background */}
      <View style={styles.greenHeader}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Feather name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Farmer Support</Text>
          <TouchableOpacity style={styles.helpBtn}>
            <Feather name="help-circle" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Quick Weather Widget */}
        <TouchableOpacity 
          style={styles.weatherCard}
          onPress={() => navigation.navigate('Weather')}
        >
          <View style={styles.weatherContent}>
            <Text style={styles.weatherLabel}>Today in Rampur</Text>
            <View style={styles.tempRow}>
              <Feather name="sun" size={32} color="#F59E0B" />
              <Text style={styles.temp}>32°C</Text>
            </View>
            <Text style={styles.weatherDesc}>Clear Sky • Tap for details</Text>
          </View>
          <View style={styles.weatherRight}>
            <Feather name="chevron-right" size={24} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Services Grid */}
        <Text style={styles.sectionTitle}>Farming Services</Text>
        <View style={styles.grid}>
          <ActionButton 
            icon="bar-chart-2" 
            label="Mandi Prices" 
            color="#16A34A" 
            bg="#DCFCE7" 
            route="MandiPrices" 
          />
          <ActionButton 
            icon="cloud-rain" 
            label="Weather Forecast" 
            color="#0284C7" 
            bg="#E0F2FE" 
            route="Weather" 
          />
          <ActionButton 
            icon="book-open" 
            label="Farming Tips" 
            color="#E65100" 
            bg="#FFF7ED" 
            route="FarmingTips" 
          />
          <ActionButton 
            icon="file-text" 
            label="Govt Schemes" 
            color="#7E22CE" 
            bg="#F3E8FF" 
            route="GovtSchemes" 
          />
          <ActionButton 
            icon="layers" 
            label="Soil Testing" 
            color="#8D6E63" 
            bg="#EFEBE9" 
            route="SoilTesting" 
          />
          <ActionButton 
            icon="droplet" 
            label="Irrigation" 
            color="#0891B2" 
            bg="#CFFAFE" 
            route="Irrigation" 
          />
        </View>

        {/* Featured Tip */}
        <LinearGradient colors={['#134E5E', '#2E7D32']} style={styles.tipCard} start={{x:0, y:0}} end={{x:1, y:1}}>
          <View style={styles.tipContent}>
            <Feather name="zap" size={24} color="#FDE047" style={{ marginBottom: 8 }} />
            <Text style={styles.tipTitle}>Quick Tip: Pest Control</Text>
            <Text style={styles.tipText}>Early morning is the best time to spray neem oil to avoid harming beneficial insects.</Text>
          </View>
        </LinearGradient>

        <View style={{height: 40}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  greenHeader: {
    backgroundColor: '#134E5E',
    paddingHorizontal: 24,
    paddingBottom: 30, 
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 8, 
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  backBtn: {
    width: 40,
    alignItems: 'flex-start',
  },
  helpBtn: {
    width: 40,
    alignItems: 'flex-end',
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: '#FFF',
    textAlign: 'center',
    flex: 1,
  },
  weatherCard: {
    flexDirection: 'row',
    alignItems: 'center', 
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 16, 
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  weatherContent: {
    flex: 1, 
    justifyContent: 'center',
  },
  weatherLabel: { 
    color: '#FFF', 
    fontSize: 13, 
    marginBottom: 4, 
    fontWeight: '600' 
  },
  tempRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 4 
  },
  temp: { 
    fontSize: 32, 
    fontWeight: '800', 
    color: '#FFF', 
    marginLeft: 10 
  },
  weatherDesc: { 
    color: '#E0F2FE', 
    fontSize: 13, 
    fontWeight: '500' 
  },
  weatherRight: { 
    marginLeft: 16, 
    justifyContent: 'center' 
  },
  content: { 
    paddingHorizontal: 24, 
    marginTop: 24 // Changed from -20 to 24 to push it down
  }, 
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: '#000', 
    marginBottom: 16, 
    marginTop: 0 // Removed top margin since content has margin
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  actionBtn: { 
    width: '48%', 
    backgroundColor: '#FFF', 
    padding: 16, 
    borderRadius: 20, 
    marginBottom: 16, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#E2E8F0',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  actionIcon: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  actionLabel: { fontSize: 14, fontWeight: '800', color: '#000', textAlign: 'center' },
  tipCard: { borderRadius: 16, padding: 20, marginTop: 8 },
  tipTitle: { color: '#FFF', fontSize: 16, fontWeight: '800', marginBottom: 4 },
  tipText: { color: '#FFF', fontSize: 14, lineHeight: 22, fontWeight: '500' },
});