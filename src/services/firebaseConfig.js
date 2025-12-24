import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAbvIdSCg2JBXmOmWZqhNsjT-ArNRmGWSo",
  authDomain: "village-digital-platform.firebaseapp.com",
  projectId: "village-digital-platform",
  storageBucket: "village-digital-platform.appspot.com",
  messagingSenderId: "417327845490",
  appId: "1:417327845490:web:7262cc2ddfef1a8da3f2eb",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);