import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, StatusBar, ScrollView, SafeAreaView, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { Feather } from '@expo/vector-icons'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";


const { height } = Dimensions.get('window');

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

<<<<<<< Updated upstream
  const handleLogin = () => {
    console.log('Login pressed');
  };
=======
  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    try {
      console.log("Logging in user...");

      await signInWithEmailAndPassword(auth, email, password);

      alert("Login successful!");
  
      navigation.navigate("MainApp");

    } catch (error) {
      alert("Invalid email or password");
    }
};

>>>>>>> Stashed changes

  return (
    <View style={styles.mainContainer}>
      {/* Status Bar matches the deep forest color for a seamless look */}
      <StatusBar barStyle="light-content" backgroundColor="#134E5E" />
      
      {/* 1. MODERN VILLAGE THEME: Deep Forest to Soft Leaf Gradient */}
      <LinearGradient
        colors={['#134E5E', '#71B280']} // Deep Teal-Green to Sage Green
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientHeader}
      >
        {/* SafeAreaView ensures content is "Safe" from notches */}
        <SafeAreaView style={styles.safeAreaHeader}>
          <View style={styles.titleContainer}>
            <View style={styles.iconCircle}>
              {/* Icon color matches the primary deep green */}
              <Feather name="home" size={36} color="#134E5E" />
            </View>
<<<<<<< Updated upstream
            <Text style={styles.appTitle}>Village App</Text>
=======
            <Text style={styles.appTitle}>Village Digital</Text>
>>>>>>> Stashed changes
            <Text style={styles.tagline}>Connected. Natural. Peaceful.</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.bottomSection}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.formContainer}
        >
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.formHeader}>Sign In</Text>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputContainer}>
                <Feather name="mail" size={20} color="#718096" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="hello@gmail.com"
                  placeholderTextColor="#A0AEC0"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputContainer}>
                <Feather name="lock" size={20} color="#718096" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#A0AEC0"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Feather 
                    name={isPasswordVisible ? "eye" : "eye-off"} 
                    size={20} 
                    color="#718096" 
                  />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                onPress={() => navigation.navigate('ForgotPassword')}
                style={styles.forgotPassContainer}
              >
                <Text style={styles.forgotPassText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleLogin} activeOpacity={0.8}>
              <LinearGradient
                colors={['#134E5E', '#71B280']} // Matching Button Gradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>Login</Text>
                <Feather name="arrow-right" size={20} color="#FFF" style={{marginLeft: 10}}/>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>New to the village? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>Create Account</Text>
              </TouchableOpacity>
            </View>
            
            <View style={{height: 20}} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#134E5E', // Fallback color matches top gradient start
  },
  gradientHeader: {
    height: height * 0.35, // Takes up 35% of screen
  },
  safeAreaHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  iconCircle: {
    width: 70,
    height: 70,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  appTitle: {
    fontSize: 30, 
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  tagline: {
    fontSize: 15,
    color: '#E8F5E9', // Very light mint/white
    fontWeight: '500',
    opacity: 0.9,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30, // Negative margin for overlap effect
    overflow: 'hidden',
  },
  formContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 40,
    flexGrow: 1,
  },
  formHeader: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2D3748', // Dark Grey for readability
    marginBottom: 30,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568', // Slate Grey
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC', // Very light grey background
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0', // Subtle border
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
    height: '100%',
  },
  forgotPassContainer: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotPassText: {
    color: '#134E5E', // Matches primary deep green
    fontWeight: '600',
    fontSize: 14,
  },
  primaryButton: {
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#134E5E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    color: '#718096',
    fontSize: 15,
  },
  linkText: {
    color: '#134E5E', // Matches primary deep green
    fontSize: 15,
    fontWeight: '700',
  },
});