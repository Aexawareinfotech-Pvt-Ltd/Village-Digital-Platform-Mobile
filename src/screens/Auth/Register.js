import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { Feather } from '@expo/vector-icons'; 

// Import Unified API Service
import { api } from "../../services/api";

const { height } = Dimensions.get('window');

export default function Register() {
  const navigation = useNavigation();
  
  // State for all fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Visibility toggles
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      alert("Please fill in all fields!");
      return;
    }

    if (password !== confirmPassword) {
     alert("Passwords do not match!");
     return;
    }

    try {
      console.log("Registering User...");
      
      // 1. Create User via API (Firebase Auth)
      const user = await api.signUp(email.trim(), password);

      // 2. Save Profile via API (Backend/MongoDB)
      await api.createUserProfile({
        firebaseId: user.uid,
        fullName: name,
        email: email,
        phoneNumber: phone,
        role: 'Villager',
        createdAt: new Date().toISOString()
      });

      alert("Account created successfully!");
      navigation.navigate("Login");

    } catch (error) {
      console.error("Error registering user: ", error.message);
      alert(error.message);
    }
  };


  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#134E5E" />
      
      {/* 1. TOP SAFE AREA: Inside Gradient */}
      <LinearGradient
        colors={['#134E5E', '#71B280']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientHeader}
      >
        <SafeAreaView style={styles.safeAreaHeader}>
          <View style={styles.titleContainer}>
            <View style={styles.iconCircle}>
              <Feather name="user-plus" size={36} color="#134E5E" />
            </View>
            <Text style={styles.appTitle}>Join Village</Text>
            <Text style={styles.tagline}>Become part of the community</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.bottomSection}>
        {/* 2. BOTTOM SAFE AREA */}
        <SafeAreaView style={styles.safeAreaBottom}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.formContainer}
          >
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <Text style={styles.formHeader}>Create Account</Text>

              {/* Name Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <View style={styles.inputContainer}>
                  <Feather name="user" size={20} color="#718096" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    placeholderTextColor="#A0AEC0"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>
              
              {/* Email Input */}
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

              {/* Phone Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.inputContainer}>
                  <Feather name="phone" size={20} color="#718096" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="+1 234 567 8900"
                    placeholderTextColor="#A0AEC0"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputContainer}>
                  <Feather name="lock" size={20} color="#718096" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Create a password"
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
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View style={styles.inputContainer}>
                  <Feather name="check-circle" size={20} color="#718096" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Repeat password"
                    placeholderTextColor="#A0AEC0"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!isConfirmPasswordVisible}
                  />
                  <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                    <Feather 
                      name={isConfirmPasswordVisible ? "eye" : "eye-off"} 
                      size={20} 
                      color="#718096" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Register Button */}
              <TouchableOpacity onPress={handleRegister} activeOpacity={0.8}>
                <LinearGradient
                  colors={['#134E5E', '#71B280']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.primaryButton}
                >
                  <Text style={styles.primaryButtonText}>Sign Up</Text>
                  <Feather name="arrow-right" size={20} color="#FFF" style={{marginLeft: 10}}/>
                </LinearGradient>
              </TouchableOpacity>

              {/* Login Link */}
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.linkText}>Login</Text>
                </TouchableOpacity>
              </View>

              <View style={{height: 20}} />
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#134E5E',
  },
  gradientHeader: {
    height: height * 0.35, 
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
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    color: '#E8F5E9',
    fontWeight: '500',
    opacity: 0.9,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    overflow: 'hidden',
  },
  safeAreaBottom: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 50,
    flexGrow: 1,
  },
  formHeader: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 25,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 6,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
  primaryButton: {
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
    paddingBottom: 20,
  },
  footerText: {
    color: '#718096',
    fontSize: 15,
  },
  linkText: {
    color: '#134E5E',
    fontSize: 15,
    fontWeight: '700',
  },
});