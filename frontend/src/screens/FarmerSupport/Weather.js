import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function Weather() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const FORECAST = [
    { day: 'Tue', icon: 'sun', temp: '32°', condition: 'Sunny' },
    { day: 'Wed', icon: 'cloud', temp: '29°', condition: 'Cloudy' },
    { day: 'Thu', icon: 'cloud-rain', temp: '26°', condition: 'Rain' },
    { day: 'Fri', icon: 'sun', temp: '31°', condition: 'Clear' },
    { day: 'Sat', icon: 'cloud-drizzle', temp: '28°', condition: 'Drizzle' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0284C7" />
      
      {/* Blue Header Gradient */}
      <LinearGradient colors={['#0284C7', '#0EA5E9']} style={[styles.headerBg, { paddingTop: insets.top }]}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Weather Forecast</Text>
          <View style={{width: 24}} />
        </View>

        <View style={styles.currentWeather}>
          <Feather name="sun" size={64} color="#FDE047" />
          <Text style={styles.curTemp}>32°C</Text>
          <Text style={styles.curDesc}>Clear Sky • Rampur Village</Text>
          <View style={styles.metaBox}>
            <View style={styles.metaItem}>
              <Feather name="wind" size={16} color="#E0F2FE" />
              <Text style={styles.metaText}>12 km/h</Text>
            </View>
            <View style={styles.metaItem}>
              <Feather name="droplet" size={16} color="#E0F2FE" />
              <Text style={styles.metaText}>45%</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Alert Box */}
        <View style={styles.alertCard}>
          <Feather name="alert-triangle" size={24} color="#C2410C" />
          <View style={{flex: 1, marginLeft: 12}}>
            <Text style={styles.alertTitle}>Rain Alert</Text>
            <Text style={styles.alertText}>Light showers expected on Thursday evening. Plan irrigation accordingly.</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>5-Day Forecast</Text>
        
        {FORECAST.map((item, index) => (
          <View key={index} style={styles.forecastRow}>
            <Text style={styles.dayText}>{item.day}</Text>
            <View style={styles.conditionBox}>
              <Feather 
                name={item.icon} 
                size={20} 
                color={item.icon === 'sun' ? '#F59E0B' : item.icon === 'cloud-rain' ? '#3B82F6' : '#64748B'} 
              />
              <Text style={styles.conditionText}>{item.condition}</Text>
            </View>
            <Text style={styles.tempText}>{item.temp}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Farming Advisory</Text>
        <View style={styles.advisoryCard}>
          <Text style={styles.advisoryText}>
            Due to high temperatures today, ensure crops are watered in the late evening to minimize evaporation.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  headerBg: { paddingHorizontal: 24, paddingBottom: 40, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16 },
  navTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  currentWeather: { alignItems: 'center', marginTop: 10 },
  curTemp: { fontSize: 48, fontWeight: '800', color: '#FFF', marginTop: 8 },
  curDesc: { fontSize: 16, color: '#E0F2FE', marginBottom: 16 },
  metaBox: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: 8 },
  metaItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 },
  metaText: { color: '#FFF', marginLeft: 6, fontWeight: '600' },
  content: { padding: 24, marginTop: -20 },
  alertCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF7ED',
    padding: 16, borderRadius: 16, marginBottom: 24,
    borderWidth: 1, borderColor: '#FED7AA',
  },
  alertTitle: { fontSize: 14, fontWeight: '700', color: '#9A3412', marginBottom: 2 },
  alertText: { fontSize: 13, color: '#C2410C', lineHeight: 18 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 16 },
  forecastRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#FFF', padding: 16, marginBottom: 12, borderRadius: 12,
    borderWidth: 1, borderColor: '#F1F5F9',
  },
  dayText: { fontSize: 16, fontWeight: '600', color: '#334155', width: 50 },
  conditionBox: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  conditionText: { marginLeft: 12, color: '#64748B', fontSize: 14 },
  tempText: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  advisoryCard: { backgroundColor: '#F0FDF4', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#DCFCE7' },
  advisoryText: { color: '#166534', lineHeight: 22, fontSize: 14 },
});