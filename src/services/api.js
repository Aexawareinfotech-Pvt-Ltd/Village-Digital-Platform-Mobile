import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail 
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { auth, db, appId } from './firebaseConfig'; 

// ==========================================
// CONFIGURATION SWITCH
// ==========================================
// Set to TRUE: To connect to the Ngrok Backend (Use this on Real Phone/Emulator)
// Set to FALSE: To save data to Firestore directly (Use this if Backend gives CORS error)
const USE_BACKEND = false; 

// Your Ngrok URL
const API_BASE_URL = 'https://magazinish-prorestoration-greta.ngrok-free.dev/api'; 

export const api = {
  
  // ==============================
  // 1. AUTHENTICATION (Always Firebase)
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
  // 2. DATA SERVICES (Toggleable)
  // ==============================

  // Create User Profile
  createUserProfile: async (userData) => {
    if (USE_BACKEND) {
      // --- OPTION A: BACKEND (Node.js/MongoDB) ---
      try {
        const token = await auth.currentUser?.getIdToken();
        console.log(`Sending to Backend: ${API_BASE_URL}/users/register`);

        const response = await fetch(`${API_BASE_URL}/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify(userData),
        });
        
        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Backend Error: ${errText}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Backend Error:", error);
        throw error;
      }
    } else {
      // --- OPTION B: FIRESTORE (Direct/Serverless) ---
      try {
        console.log("Saving to Firestore (Bypassing Backend)...");
        const { firebaseId, ...data } = userData;
        // Path: artifacts/{appId}/users/{uid}/profile/info
        await setDoc(doc(db, 'artifacts', appId, 'users', firebaseId, 'profile', 'info'), data);
        return { success: true };
      } catch (error) {
        console.error("Firestore Error:", error);
        throw error;
      }
    }
  },

  // Get User Profile
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
        console.error("Backend Error:", error);
        return null;
      }
    } else {
      try {
        const docSnap = await getDoc(doc(db, 'artifacts', appId, 'users', uid, 'profile', 'info'));
        return docSnap.exists() ? docSnap.data() : null;
      } catch (error) {
        console.error("Firestore Error:", error);
        return null;
      }
    }
  },

  // Create Grievance
  createGrievance: async (grievanceData) => {
    const { userId, ...data } = grievanceData;
    
    if (USE_BACKEND) {
      try {
        const token = await auth.currentUser?.getIdToken();
        const response = await fetch(`${API_BASE_URL}/grievances`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(grievanceData),
        });
        return await response.json();
      } catch (error) {
        console.error("Backend Error:", error);
        throw error;
      }
    } else {
      try {
        // Path: artifacts/{appId}/users/{uid}/grievances
        await addDoc(collection(db, 'artifacts', appId, 'users', userId, 'grievances'), {
          ...data,
          status: 'Pending',
          createdAt: new Date().toISOString()
        });
        return { success: true };
      } catch (error) {
        console.error("Firestore Error:", error);
        throw error;
      }
    }
  },

  // Get Grievances
  getUserGrievances: async (uid) => {
    if (USE_BACKEND) {
      try {
        const token = await auth.currentUser?.getIdToken();
        const response = await fetch(`${API_BASE_URL}/grievances/user/${uid}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        return await response.json();
      } catch (error) {
        console.error("Backend Error:", error);
        return [];
      }
    } else {
      try {
        const snapshot = await getDocs(collection(db, 'artifacts', appId, 'users', uid, 'grievances'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Firestore Error:", error);
        return [];
      }
    }
  },
};