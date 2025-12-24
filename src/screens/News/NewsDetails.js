import React, { use } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Platform, 
  Dimensions 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function NewsDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { article } = route.params;
  const insets = useSafeAreaInsets();

  const getCategoryColor = (cat) => {
    switch(cat) {
      case 'Agriculture': return '#2E7D32';
      case 'Health': return '#C62828';
      case 'Panchayat': return '#134E5E';
      case 'Education': return '#F59E0B';
      default: return '#64748B';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Full Screen Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: article.image }} style={styles.image} />
        
        {/* Overlay for back button visibility */}
        <View style={styles.overlay} />

        {/* Header Actions - FIXED */}
        {/* Changed SafeAreaView to standard View and applied dynamic padding */}
        <View 
          style={[
            styles.headerActions, 
            { 
              // 3. Dynamic top padding:
              // - Uses 'insets.top' to clear the Notch (iOS) or Status Bar (Android)
              // - Adds 10px extra breathing room
              // - Defaults to 20px on Web (where insets.top is usually 0)
              paddingTop: (insets.top || 20) + 10 
            }
          ]}
        >
          <TouchableOpacity 
            style={styles.iconBtn} 
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="share-2" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Sheet */}
      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Metadata */}
          <View style={styles.metaRow}>
            <View style={[styles.tag, { backgroundColor: getCategoryColor(article.category) }]}>
              <Text style={styles.tagText}>{article.category}</Text>
            </View>
            <View style={styles.dateRow}>
              <Feather name="clock" size={14} color="#94A3B8" />
              <Text style={styles.dateText}>{article.date}</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>{article.title}</Text>
          
          {/* Author/Source Row */}
          <View style={styles.sourceRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>V</Text>
            </View>
            <View>
              <Text style={styles.sourceName}>Village Council</Text>
              <Text style={styles.sourceRole}>Official Update</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.description}>
            {article.description}
          </Text>

          {/* Dummy Extended Content to simulate a real article */}
          <Text style={styles.bodyText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            {'\n\n'}
             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            {'\n\n'}
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </Text>
        </ScrollView>
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
    height: 300,
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
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerActions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    // Platform specific blur handling if needed
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      web: {
         backdropFilter: 'blur(10px)', 
      }
    })
  },
  contentContainer: {
    flex: 1,
    marginTop: -30, // Overlap effect
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
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
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 6,
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    lineHeight: 32,
    marginBottom: 20,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#134E5E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 18,
  },
  sourceName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  sourceRole: {
    fontSize: 12,
    color: '#64748B',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '500',
    lineHeight: 26,
    marginBottom: 16,
  },
  bodyText: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 28,
  },
});