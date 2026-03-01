import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect, createContext, useContext } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import CoursesListing from './pages/CoursesListing'
import CourseDetails from './pages/CourseDetails'
import Enrollment from './pages/Enrollment'
import Payment from './pages/Payment'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CoursePlayer from './pages/CoursePlayer'
import InstructorDashboard from './pages/InstructorDashboard'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import { motion, AnimatePresence } from 'framer-motion'
import { auth } from './firebase'

// Robust Firebase Auth Context
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check if auth exists (it might not if Firebase failed to init)
    if (!auth) {
      console.error("Firebase Auth not initialized. Check your configuration.");
      setLoading(false);
      return;
    }

    // Listen to Firebase auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (fbUser) => {
      try {
        if (fbUser) {
          const userData = {
            name: fbUser.displayName || fbUser.email.split('@')[0],
            email: fbUser.email,
            uid: fbUser.uid,
            photoURL: fbUser.photoURL
          };
          setUser(userData);
          localStorage.setItem('skill_academy_user', JSON.stringify(userData));
          localStorage.setItem('skill_academy_token', await fbUser.getIdToken());
        } else {
          setUser(null);
          localStorage.removeItem('skill_academy_user');
          localStorage.removeItem('skill_academy_token');
        }
      } catch (err) {
        console.error("Auth state change error:", err);
      } finally {
         setLoading(false);
      }
    });

    // 🛡️ Safety fallback: Force loading to end after 5 seconds no matter what
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const login = (userData) => {
    // legacy login for demo/mock users if needed
    setUser(userData);
  };

  const logout = async () => {
    try {
      if (auth?.signOut) await auth.signOut();
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!auth && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-900 text-white text-center">
        <h1 className="text-4xl font-black mb-4">Configuration Error</h1>
        <p className="text-slate-400 max-w-md mb-8">
          The application loaded successfully, but <strong>Firebase configuration is missing</strong>. 
          Please ensure all VITE_FIREBASE_* secrets are set in your deployment environment.
        </p>
        <div className="bg-white/5 p-6 rounded-2xl text-left font-mono text-xs w-full max-w-lg border border-white/10">
          <p className="text-indigo-400 mb-2">// Missing Keys Check:</p>
          <p className="text-slate-500">Check the browser console logs to see which environment variables are undefined.</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <div className="min-h-screen flex flex-col bg-slate-50/50">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<CoursesListing />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              <Route path="/enroll/:id" element={user ? <Enrollment /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
              <Route path="/payment" element={user ? <Payment /> : <Navigate to="/login" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/learn/:id" element={user ? <CoursePlayer /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
              <Route path="/instructor" element={user ? <InstructorDashboard /> : <Navigate to="/login" />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  )
}

export default App
