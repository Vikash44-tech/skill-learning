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

// Simple Auth Context
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('skill_academy_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem('skill_academy_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('skill_academy_user', JSON.stringify(userData));
    localStorage.setItem('skill_academy_token', 'fake-jwt-token-' + Math.random());
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('skill_academy_user');
    localStorage.removeItem('skill_academy_token');
    setUser(null);
  };

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
