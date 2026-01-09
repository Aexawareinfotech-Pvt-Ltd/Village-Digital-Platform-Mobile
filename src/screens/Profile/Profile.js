import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  StatusBar, 
  Image, 
  TouchableOpacity, 
  Alert,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Profile() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Mock User Data (Aligned with Internship Project Guide)
  const user = {
    name: 'Ramesh Kumar',
    role: 'Farmer & Village Resident',
    location: 'Rampur Village, UP',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    stats: {
      listings: 12,    // Market Items
      grievances: 2,   // Active Complaints
      jobs: 1          // Job Applications
    }
  };

  // Menu Items Config - Maps titles to Route Names
  const menuItems = [
    { 
      icon: 'list', 
      label: 'My Listings', 
      badge: 2, 
      route: 'MyListings',
      desc: 'Manage your marketplace items' 
    },
    { 
      icon: 'shopping-bag', 
      label: 'My Orders', 
      route: 'MyOrders',
      desc: 'Track your purchases' 
    },
    { 
      icon: 'alert-circle', 
      label: 'My Grievances', 
      badge: 1,
      route: 'MyGrievances',
      desc: 'Track complaint status'
    },
    { 
      icon: 'briefcase', 
      label: 'Job Applications', 
      route: 'MyJobs',
      desc: 'View applied jobs'
    },
    { 
      icon: 'heart', 
      label: 'Saved Items', 
      route: 'SavedItems',
      desc: 'Your wishlist' 
    },
    { 
      icon: 'help-circle', 
      label: 'Help & Support', 
      route: 'HelpSupport',
      desc: 'FAQs & Contact' 
    },
    { 
      icon: 'log-out', 
      label: 'Logout', 
      color: '#EF4444', 
      isLogout: true 
    },
  ];

  // Navigation Handler
  const handleMenuPress = (item) => {
    if (item.isLogout) {
      if (Platform.OS === "web") {
      navigation.navigate("Login");
      console.log("User logged out (WEB)");
      return;
    }

      Alert.alert('Logout', 'Are you sure you want to logout?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {
          navigation.navigate('Login');
        }}
      ]);
      return;
    }
    
    if (item.route) {
      navigation.navigate(item.route);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity 
          style={styles.iconBtn}
          onPress={() => navigation.navigate('Settings')}
        >
          <Feather name="settings" size={22} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: user.image }} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.role}>{user.role}</Text>
              <View style={styles.locationRow}>
                <Feather name="map-pin" size={12} color="#94A3B8" />
                <Text style={styles.location}>{user.location}</Text>
              </View>
            </View>
            {/* Edit Profile Button */}
            <TouchableOpacity 
              style={styles.editBtn} 
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Feather name="edit-2" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Quick Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.stats.listings}</Text>
              <Text style={styles.statLabel}>Listings</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.stats.grievances}</Text>
              <Text style={styles.statLabel}>Complaints</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.stats.jobs}</Text>
              <Text style={styles.statLabel}>Applied</Text>
            </View>
          </View>
        </View>

        {/* Menu Section */}
        <Text style={styles.sectionTitle}>Dashboard</Text>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.menuItem, 
                index === menuItems.length - 1 && styles.lastMenuItem
              ]}
              activeOpacity={0.7}
              onPress={() => handleMenuPress(item)}
            >
              <View style={[styles.menuIconBox, { backgroundColor: item.color ? '#FEF2F2' : '#F1F5F9' }]}>
                <Feather name={item.icon} size={20} color={item.color || '#134E5E'} />
              </View>
              
              <View style={styles.menuContent}>
                <Text style={[styles.menuLabel, item.color && { color: item.color }]}>
                  {item.label}
                </Text>
                {item.desc && !item.color && (
                  <Text style={styles.menuDesc}>{item.desc}</Text>
                )}
              </View>
              
              <View style={styles.menuRight}>
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
                {/* Chevron icon for navigation indication */}
                {!item.isLogout && (
                  <Feather name="chevron-right" size={20} color="#CBD5E1" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.versionText}>Village Digital • v1.0.0</Text>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  profileCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    backgroundColor: '#E2E8F0',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    fontWeight: '600',
    color: '#134E5E',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 4,
  },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#134E5E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 12,
    marginLeft: 4,
  },
  menuContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  menuDesc: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 10,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  versionText: {
    textAlign: 'center',
    color: '#CBD5E1',
    fontSize: 12,
    marginTop: 24,
    fontWeight: '500',
  },
});