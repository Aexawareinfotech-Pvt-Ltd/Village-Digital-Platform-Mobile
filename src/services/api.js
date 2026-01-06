import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail 
} from 'firebase/auth';

// Only import auth for now to isolate the issue
import { auth } from './firebaseConfig'; 

export const api = {
  
  // ==============================
  // 1. AUTHENTICATION SERVICES
  // ==============================

  signUp: async (email, password) => {
    try {
      console.log("API: Attempting to create user...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("API Auth Error (SignUp):", error);
      throw error;
    }
  },

  signIn: async (email, password) => {
    try {
      console.log("API: Attempting to sign in...");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("API Auth Error (SignIn):", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("API Auth Error (Logout):", error);
      throw error;
    }
  },

  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("API Auth Error (Reset):", error);
      throw error;
    }
  },

  // ==============================
  // 2. DATA SERVICES (TEMPORARY STUBS)
  // ==============================
  // These are placeholders so your Register.js/Login.js don't crash.

  createUserProfile: async (userData) => {
    console.log("⚠️ Auth Only Mode: Skipping database save for:", userData.email);
    // Returning success true to let the UI proceed
    return { success: true };
  },

  getUserProfile: async (uid) => {
    console.log("⚠️ Auth Only Mode: Skipping database fetch for UID:", uid);
    // Returning a dummy profile so Login.js allows entry
    return { name: "Test User", role: "Villager" };
  },
};