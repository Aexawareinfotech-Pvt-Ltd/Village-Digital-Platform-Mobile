import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Platform, 
  Dimensions,
  Linking 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function MarketPlaceDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const insets = useSafeAreaInsets();

  const handleCall = () => {
    Linking.openURL(`tel:${item.contact}`);
  };

  const getCategoryColor = (cat) => {
    switch(cat) {
      case 'Vehicles': return '#134E5E';
      case 'Seeds': return '#2E7D32';
      case 'Equipment': return '#F59E0B';
      case 'Livestock': return '#C62828';
      default: return '#64748B';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Image Header */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.overlay} />

        {/* FIXED HEADER ACTIONS */}
        <View 
          style={[
            styles.headerActions, 
            { paddingTop: (insets.top || 20) + 10 } 
          ]}
        >
          <TouchableOpacity 
            style={styles.iconBtn} 
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="heart" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Sheet */}
      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Top Row: Tag & Location */}
          <View style={styles.metaRow}>
            <View style={[styles.tag, { backgroundColor: getCategoryColor(item.category) }]}>
              <Text style={styles.tagText}>{item.category}</Text>
            </View>
            <View style={styles.locationRow}>
              <Feather name="map-pin" size={14} color="#64748B" />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          </View>

          {/* Title & Price */}
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{item.price}</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Seller Profile */}
          <View style={styles.sellerRow}>
            <View style={styles.sellerAvatar}>
              <Text style={styles.sellerInitial}>{item.seller.charAt(0)}</Text>
            </View>
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>{item.seller}</Text>
              <Text style={styles.sellerStatus}>Verified Seller</Text>
            </View>
            <TouchableOpacity style={styles.chatBtn}>
              <Feather name="message-circle" size={20} color="#134E5E" />
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{item.description}</Text>

          {/* Specifications (Dummy for visual) */}
          <View style={styles.specBox}>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Condition</Text>
              <Text style={styles.specValue}>Used</Text>
            </View>
            <View style={styles.specDivider} />
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Posted</Text>
              <Text style={styles.specValue}>2 days ago</Text>
            </View>
          </View>

        </ScrollView>
      </View>

      {/* Bottom Action Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Feather name="phone" size={20} color="#FFF" style={{ marginRight: 10 }} />
          <Text style={styles.callButtonText}>Call Seller</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imageContainer: {
    height: 350,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  headerActions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10, // Crucial for Web clicks
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: { backdropFilter: 'blur(10px)' }
    })
  },
  contentContainer: {
    flex: 1,
    marginTop: -40,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100, // Space for bottom bar
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 6,
    color: '#64748B',
    fontWeight: '500',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#134E5E',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 20,
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 16,
    marginBottom: 24,
  },
  sellerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sellerInitial: {
    fontSize: 20,
    fontWeight: '700',
    color: '#475569',
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  sellerStatus: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '600',
  },
  chatBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 26,
    marginBottom: 24,
  },
  specBox: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 16,
  },
  specItem: {
    flex: 1,
    alignItems: 'center',
  },
  specDivider: {
    width: 1,
    backgroundColor: '#CBD5E1',
  },
  specLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  specValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingTop: 16,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 10,
  },
  callButton: {
    backgroundColor: '#134E5E',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
  },
  callButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});