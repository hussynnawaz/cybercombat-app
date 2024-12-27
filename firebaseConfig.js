// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import auth from "firebase/auth";
import db from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAULN1ltNJyVES0zKcBhF08fm7fpF77YCM",
  authDomain: "cybercombat-101c9.firebaseapp.com",
  projectId: "cybercombat-101c9",
  storageBucket: "cybercombat-101c9.firebasestorage.app",
  messagingSenderId: "314375652749",
  appId: "1:314375652749:web:cda858cae5323b7ee829c4",
  measurementId: "G-MTSJL4QB8P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {auth, db};