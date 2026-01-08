import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail
} from 'firebase/auth';

import { auth } from './firebaseConfig'; 

// YOUR NGROK BACKEND URL
// IMPORTANT: Update this whenever you restart Ngrok!
const API_BASE_URL = 'https://magazinish-prorestoration-greta.ngrok-free.dev/api'; 

export const api = {
  
  // ============================================================
  // 1. AUTHENTICATION SERVICES (FIREBASE ONLY)
  // ============================================================

  /**
   * Step 1 of Register: Create the user in Firebase Authentication.
   * This gives us the UID (User ID) needed for MongoDB.
   */
  signUp: async (email, password) => {
    try {
      console.log("🔥 Firebase: Creating user...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Firebase SignUp Error:", error.code, error.message);
      throw error;
    }
  },

  /**
   * Step 1 of Login: Authenticate the credentials against Firebase.
   */
  signIn: async (email, password) => {
    try {
      console.log("🔥 Firebase: Signing in...");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Firebase SignIn Error:", error.code, error.message);
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Firebase Logout Error:", error);
      throw error;
    }
  },

  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Firebase Reset Password Error:", error);
      throw error;
    }
  },

  // ============================================================
  // 2. DATA SERVICES (MONGODB BACKEND - USER PROFILE ONLY)
  // ============================================================

  /**
   * Step 2 of Register: Save the user's profile data to MongoDB.
   * We send the Firebase UID so the backend can link the data.
   */
  createUserProfile: async (userData) => {
    try {
      // 1. Get the latest security token from Firebase
      const token = await auth.currentUser?.getIdToken(true);
      
      console.log(`🍃 MongoDB: Sending Profile to ${API_BASE_URL}/users/register`);

      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Send token for backend verification
        },
        body: JSON.stringify(userData),
      });
      
      // Handle non-200 responses (e.g. 400 Bad Request, 500 Server Error)
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend Error: ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("API Error (Create Profile):", error);
      throw error;
    }
  },

  /**
   * Step 2 of Login: Fetch the user's profile data from MongoDB.
   * Used to verify the user exists in your database.
   */
  getUserProfile: async (uid) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      
      console.log(`🍃 MongoDB: Fetching Profile for ${uid}`);

      // Assuming your backend route is GET /users/:firebaseUid
      const response = await fetch(`${API_BASE_URL}/users/${uid}`, {
        headers: { 
          'Authorization': `Bearer ${token}` 
        }
      });
      
      if (!response.ok) {
        console.warn("User profile not found in MongoDB");
        return null; 
      }
      
      return await response.json();
    } catch (error) {
      console.error("API Error (Get Profile):", error);
      return null; // Return null so the UI handles it gracefully
    }
  },
};