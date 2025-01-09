// // // Firebase configuration using environment variables
// // // const firebaseConfig = {
// // //   apiKey: process.env.FIREBASE_API_KEY,
// // //   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
// // //   databaseURL: process.env.FIREBASE_DATABASE_URL,
// // //   projectId: process.env.FIREBASE_PROJECT_ID,
// // //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
// // //   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
// // //   appId: process.env.FIREBASE_APP_ID,
// // //   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// // // }; 

import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getReactNativePersistence } from 'firebase/auth'; // Correct persistence import
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAULN1ltNJyVES0zKcBhF08fm7fpF77YCM",
  authDomain: "cybercombat-101c9.firebaseapp.com",
  projectId: "cybercombat-101c9",
  storageBucket: "cybercombat-101c9.firebasestorage.app",
  messagingSenderId: "314375652749",
  appId: "1:314375652749:web:cda858cae5323b7ee829c4",
  measurementId: "G-MTSJL4QB8P"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) // Using AsyncStorage for persistence
});

// Initialize Firestore
const db = getFirestore(app);

// Export the necessary services
export { auth, db };
export default app;
