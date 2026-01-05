import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail 
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, addDoc, getDocs } from 'firebase/firestore';

// Ensure this matches your file name exactly (lowercase 'c')
import { auth, db, appId } from './firebaseconfig'; 

// ==========================================
// CONFIGURATION SWITCH
// ==========================================
const USE_BACKEND = false; 
const API_BASE_URL = 'https://magazinish-prorestoration-greta.ngrok-free.dev/api'; 

export const api = {
  
  // ==============================
  // 1. AUTHENTICATION
  // ==============================

  signUp: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  signIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  },

  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  },

  // ==============================
  // 2. DATA SERVICES
  // ==============================

  // Create User Profile
  createUserProfile: async (userData) => {
    if (USE_BACKEND) {
      try {
        const token = await auth.currentUser?.getIdToken();
        const response = await fetch(`${API_BASE_URL}/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify(userData),
        });
        
        if (!response.ok) throw new Error('Backend registration failed');
        return await response.json();
      } catch (error) {
        throw error;
      }
    } else {
      // FIRESTORE MODE
      try {
        const { firebaseId, ...data } = userData;
        // Path: artifacts/{appId}/users/{uid}/profile/info
        await setDoc(doc(db, 'artifacts', appId, 'users', firebaseId, 'profile', 'info'), data);
        return { success: true };
      } catch (error) {
        throw error;
      }
    }
  },

  // Get User Profile (Used for Login Check)
  getUserProfile: async (uid) => {
    if (USE_BACKEND) {
      try {
        const token = await auth.currentUser?.getIdToken();
        const response = await fetch(`${API_BASE_URL}/users/${uid}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) return null;
        return await response.json();
      } catch (error) {
        return null;
      }
    } else {
      // FIRESTORE MODE
      try {
        const docRef = doc(db, 'artifacts', appId, 'users', uid, 'profile', 'info');
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
      } catch (error) {
        console.error("Profile Fetch Error:", error);
        return null;
      }
    }
  },

  // ... (Other functions like createGrievance remain same)
};