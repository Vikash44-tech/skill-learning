import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔒 Safe config (prevents crash if env missing)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim(),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim(),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim(),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.trim(),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim(),
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim(),
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID?.trim(),
};

// Log for debugging (will only show keys, not values, for safety)
console.log("Firebase config keys present:", Object.entries(firebaseConfig).filter(([_, v]) => !!v).map(([k]) => k));

let app, analytics, auth, db;

if (firebaseConfig.projectId) {
  try {
    app = initializeApp(firebaseConfig);
    
    // Only init auth and db if app exists
    auth = getAuth(app);
    db = getFirestore(app);
    
    // Analytics is optional and often blocked, so it gets its own block
    try {
      if (firebaseConfig.measurementId) {
        analytics = getAnalytics(app);
      }
    } catch (e) {
      console.warn("Analytics blocked or failed:", e);
    }
  } catch (err) {
    console.error("Firebase Initialization Failed:", err);
  }
} else {
  console.warn("Firebase projectId missing. Authentication will be disabled.");
}

export { app, analytics, auth, db }; // firebase build trigger v2