import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔐 New Firebase Configuration (Skill-Learning-64bc5)
// Hardcoded as a robust fallback for quick student deployment
const firebaseConfig = {
  apiKey: "AIzaSyCjpzu4AgK1Pn56VzsJ3OdCmjy9Wj5AVAU",
  authDomain: "skill-learning-64bc5.firebaseapp.com",
  projectId: "skill-learning-64bc5",
  storageBucket: "skill-learning-64bc5.firebasestorage.app",
  messagingSenderId: "308434318001",
  appId: "1:308434318001:web:29d366fe54b6609b802890",
  measurementId: "G-0PGY20VK3G"
};

// Log for debugging (Always verifies the latest key)
console.log("Firebase 64bc5 initialized with key:", firebaseConfig.apiKey.substring(0, 5) + "...");

let app, analytics, auth, db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  
  // Analytics is optional and often blocked
  if (firebaseConfig.measurementId) {
    try {
      analytics = getAnalytics(app);
    } catch (e) {
      console.warn("Analytics blocked or failed:", e);
    }
  }
} catch (err) {
  console.error("Firebase Initialization Failed:", err);
}

export { app, analytics, auth, db };