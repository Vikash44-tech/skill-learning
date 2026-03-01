import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CreditCard, ShieldCheck, CheckCircle2, 
  ArrowLeft, ShoppingBag, Receipt, LayoutDashboard,
  Wallet, Landmark, Bitcoin, Apple, Lock,
  ChevronRight, Sparkles, GraduationCap,
  Play, Clock, Star, Users, User, LogOut,
  TrendingUp, Search, Bell, History, Settings,
  Award, BookOpen, MessageSquare, ChevronDown
} from 'lucide-react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export default function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('skill_academy_user'))
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [activeTab, setActiveTab] = useState('courses')

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchEnrollments = async () => {
      try {
        // Fallback to empty email for testing if user properties are missing
        const userEmail = user?.email || 'guest@example.com';
        const q = query(collection(db, 'enrollments'), where('userEmail', '==', userEmail));
        const querySnapshot = await getDocs(q);
        const enrolled = [];
        querySnapshot.forEach((doc) => {
          enrolled.push({ firestoreId: doc.id, ...doc.data() });
        });
        // Sort by id (Date.now()) descending so newest are first
        setEnrolledCourses(enrolled.sort((a, b) => b.id - a.id));
      } catch (err) {
        console.error("Error fetching enrollments:", err);
      }
    };

    fetchEnrollments();
  }, [user?.email, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('skill_academy_user');
    localStorage.removeItem('skill_academy_token');
    navigate('/login');
    window.location.reload();
  };

  if (!user) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-50 min-h-screen pt-32 pb-24"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-12 max-w-7xl mx-auto">
          
          {/* Dashboard Header */}
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-indigo-500/5 border border-slate-100 flex flex-col md:flex-row items-center gap-10 relative z-10">
             <div className="relative group">
               <div className="w-24 h-24 md:w-32 md:h-32 bg-linear-to-tr from-indigo-600 to-violet-700 rounded-full flex items-center justify-center p-1 text-white shadow-xl shadow-indigo-600/30">
                 <div className="w-full h-full bg-indigo-600 rounded-full flex items-center justify-center text-4xl md:text-5xl font-black border-4 border-white/20">
                   {user.name.charAt(0)}
                 </div>
               </div>
               <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                 <CheckCircle2 size={20} />
               </div>
             </div>

             <div className="flex flex-col gap-2 grow text-center md:text-left">
               <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
                 <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                    Welcome back, <span className="text-indigo-600">{user.name.split(' ')[0]}</span>
                 </h1>
                 <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">Student Pro</span>
               </div>
               <p className="text-slate-500 font-medium">Continue your learning journey and achieve your goals today.</p>
               
               <div className="flex flex-wrap items-center justify-center md:justify-start gap-12 mt-4 pt-6 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-slate-800 leading-none">{enrolledCourses.length}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-1">Enrolled Courses</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-slate-800 leading-none">0</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-1">Completed</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-slate-800 leading-none">0</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-1">Certificates</span>
                  </div>
               </div>
             </div>

             <div className="flex md:flex-col gap-4 w-full md:w-auto">
               <button className="btn-primary grow md:grow-0 py-4 px-8 rounded-2xl flex items-center gap-3">
                 <CreditCard size={18} /> Add Credits
               </button>
               <button onClick={handleLogout} className="btn-outline grow md:grow-0 py-4 px-8 rounded-2xl flex items-center gap-3 font-black text-slate-700">
                 <LogOut size={18} /> Logout
               </button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Left: Navigation Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-slate-100 sticky top-28">
                <div className="flex flex-col gap-2">
                   {[
                     {id: 'courses', label: 'My Courses', icon: BookOpen},
                     {id: 'wishlist', label: 'Wishlist', icon: Star},
                     {id: 'history', label: 'Transactions', icon: History},
                     {id: 'achievements', label: 'Achievements', icon: Award},
                     {id: 'messages', label: 'Messages', icon: MessageSquare},
                     {id: 'settings', label: 'Settings', icon: Settings},
                   ].map((item) => (
                     <button
                       key={item.id}
                       onClick={() => setActiveTab(item.id)}
                       className={`w-full py-4 px-6 rounded-2xl font-black text-sm transition-all duration-200 uppercase tracking-widest flex items-center gap-4 group ${
                         activeTab === item.id 
                           ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10' 
                           : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                       }`}
                     >
                       <item.icon size={20} className={activeTab === item.id ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-400'} />
                       {item.label}
                       {activeTab === item.id && <ChevronRight size={16} className="ml-auto animate-pulse" />}
                     </button>
                   ))}
                </div>
              </div>
            </aside>

            {/* Right: Tab Content */}
            <div className="lg:col-span-3">
               <AnimatePresence mode="wait">
                 {activeTab === 'courses' && (
                   <motion.div 
                     key="courses"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="flex flex-col gap-8"
                   >
                     <div className="flex items-center justify-between">
                       <h2 className="text-2xl font-black text-slate-800 flex items-center gap-4">
                         My Enrolled <span className="text-indigo-600">Courses</span>
                         <div className="h-[2px] grow bg-slate-200 rounded-full" />
                       </h2>
                       <Link to="/courses" className="btn-outline py-2 px-4 rounded-xl text-xs font-black uppercase tracking-widest bg-white">
                         Browse more
                       </Link>
                     </div>

                     {enrolledCourses.length > 0 ? (
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {enrolledCourses.map((course) => (
                           <motion.div 
                             key={course.id}
                             whileHover={{ y: -8 }}
                             className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 group hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300"
                           >
                             <div className="aspect-video relative">
                               <img src={course.courseImage} alt={course.courseName} className="w-full h-full object-cover" />
                               <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-indigo-900/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                 <button className="w-16 h-16 bg-white/40 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/40 hover:scale-110 transition-transform">
                                   <Play size={24} fill="currentColor" />
                                 </button>
                               </div>
                               <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm">
                                 {course.status}
                               </span>
                             </div>
                             <div className="p-8 flex flex-col gap-6">
                               <h4 className="text-xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-1">
                                 {course.courseName}
                               </h4>
                               <div className="flex flex-col gap-3">
                                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                                    <span>Course Progress</span>
                                    <span className="text-indigo-600">{course.progress}%</span>
                                  </div>
                                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${course.progress}%` }}
                                      transition={{ duration: 1, delay: 0.5 }}
                                      className="h-full bg-linear-to-r from-indigo-500 to-violet-600 rounded-full"
                                    />
                                  </div>
                               </div>
                               <Link to={`/learn/${course.id}`} className="flex items-center justify-center gap-2 py-4 bg-slate-50 group-hover:bg-indigo-600 text-slate-700 group-hover:text-white rounded-2xl font-black transition-all border border-slate-100 group-hover:border-indigo-600 active:scale-[0.98]">
                                 Continue Learning <ChevronRight size={18} />
                               </Link>
                             </div>
                           </motion.div>
                         ))}
                       </div>
                     ) : (
                       <div className="bg-white rounded-[3rem] p-20 flex flex-col items-center text-center gap-8 border-2 border-dashed border-slate-200">
                          <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center">
                            <BookOpen size={48} />
                          </div>
                          <div className="flex flex-col gap-2">
                             <h4 className="text-2xl font-black text-slate-900">You haven't enrolled in any courses yet.</h4>
                             <p className="text-slate-500 font-medium max-w-sm mx-auto">Start your learning journey by exploring our top-rated courses.</p>
                          </div>
                          <Link to="/courses" className="btn-primary py-4 px-10 rounded-2xl flex items-center gap-3 text-lg font-black active:scale-[0.98] transition-all">
                             Browse Our Library <Sparkles size={20} />
                          </Link>
                       </div>
                     )}
                   </motion.div>
                 )}

                 {activeTab === 'settings' && (
                   <motion.div 
                     key="settings"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="bg-white rounded-[3.5rem] p-12 shadow-sm border border-slate-100 flex flex-col gap-12"
                   >
                     <h2 className="text-2xl font-black text-slate-800 flex items-center gap-4">
                       Profile <span className="text-indigo-600">Settings</span>
                       <div className="h-[2px] grow bg-slate-100 rounded-full" />
                     </h2>
                     <div className="flex flex-col gap-8">
                       <div className="flex items-center gap-10">
                          <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-xl flex items-center justify-center text-3xl font-black text-slate-300">
                            {user.name.charAt(0)}
                          </div>
                          <div className="flex flex-col gap-4">
                             <h4 className="text-lg font-black text-slate-900">Profile Photo</h4>
                             <div className="flex items-center gap-4">
                               <button className="btn-primary py-2 px-6 rounded-xl text-xs font-black uppercase tracking-widest">Change</button>
                               <button className="btn-outline py-2 px-6 rounded-xl text-xs font-black uppercase tracking-widest">Remove</button>
                             </div>
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="flex flex-col gap-3">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Full Name</label>
                            <input type="text" value={user.name} disabled className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 font-bold cursor-not-allowed" />
                          </div>
                          <div className="flex flex-col gap-3">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</label>
                            <input type="email" value={user.email} disabled className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 font-bold cursor-not-allowed" />
                          </div>
                       </div>
                     </div>
                   </motion.div>
                 )}

                 {activeTab === 'history' && (
                   <motion.div 
                     key="history"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="bg-white rounded-[3.5rem] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col gap-8"
                   >
                     <h2 className="text-2xl font-black text-slate-800 flex items-center gap-4">
                       Transaction <span className="text-indigo-600">History</span>
                       <div className="h-[2px] grow bg-slate-100 rounded-full" />
                     </h2>
                     {enrolledCourses.length > 0 ? (
                       <div className="flex flex-col gap-4">
                         {enrolledCourses.map((course, i) => (
                           <div key={i} className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:shadow-lg transition-all">
                             <div className="flex items-center gap-4 w-full sm:w-auto">
                               <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm shrink-0">
                                 <img src={course.courseImage} alt={course.courseName} className="w-full h-full object-cover" />
                               </div>
                               <div className="flex flex-col gap-1">
                                 <h4 className="font-black text-slate-900 line-clamp-1">{course.courseName}</h4>
                                 <span className="text-xs font-bold text-slate-400">TXN-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</span>
                               </div>
                             </div>
                             <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8">
                               <div className="flex flex-col sm:items-end">
                                 <span className="text-xs font-black uppercase tracking-widest text-slate-400">Amount</span>
                                 <span className="text-lg font-black text-slate-900">${course.totalAmount || course.price}</span>
                               </div>
                               <div className="flex flex-col sm:items-end">
                                 <span className="text-xs font-black uppercase tracking-widest text-slate-400">Status</span>
                                 <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest">Completed</span>
                               </div>
                             </div>
                           </div>
                         ))}
                       </div>
                     ) : (
                       <div className="py-20 flex flex-col items-center text-center gap-4">
                         <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
                           <History size={32} />
                         </div>
                         <h4 className="text-xl font-black text-slate-900">No Transactions Yet</h4>
                         <p className="text-slate-500 font-medium max-w-sm">When you enroll in courses, your payment history will appear here.</p>
                       </div>
                     )}
                   </motion.div>
                 )}

                 {activeTab === 'achievements' && (
                   <motion.div 
                     key="achievements"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="bg-white rounded-[3.5rem] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col gap-8"
                   >
                     <h2 className="text-2xl font-black text-slate-800 flex items-center gap-4">
                       My <span className="text-indigo-600">Achievements</span>
                       <div className="h-[2px] grow bg-slate-100 rounded-full" />
                     </h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                       <div className="p-8 rounded-[2.5rem] bg-indigo-50 border border-indigo-100 flex flex-col items-center text-center gap-4 group hover:-translate-y-2 transition-transform duration-300">
                         <div className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform">
                           <GraduationCap size={40} />
                         </div>
                         <div className="flex flex-col gap-1 mt-2">
                           <h4 className="font-black text-slate-900">First Steps</h4>
                           <p className="text-xs font-bold text-slate-500 line-clamp-2">Enrolled in your first course on SkillRise.</p>
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest bg-white text-indigo-600 px-3 py-1 rounded-full shadow-sm">Unlocked</span>
                       </div>
                       
                       <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex flex-col items-center text-center gap-4 group hover:-translate-y-2 transition-transform duration-300 opacity-60">
                         <div className="w-20 h-20 bg-white text-slate-300 border-4 border-slate-200 rounded-full flex items-center justify-center">
                           <Award size={40} />
                         </div>
                         <div className="flex flex-col gap-1 mt-2">
                           <h4 className="font-black text-slate-900">Fast Learner</h4>
                           <p className="text-xs font-bold text-slate-500 line-clamp-2">Complete 3 courses with top grades.</p>
                         </div>
                         <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                           <div className="w-[33%] h-full bg-slate-400 rounded-full" />
                         </div>
                       </div>
                       
                       <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex flex-col items-center text-center gap-4 group hover:-translate-y-2 transition-transform duration-300 opacity-60">
                         <div className="w-20 h-20 bg-white text-slate-300 border-4 border-slate-200 rounded-full flex items-center justify-center">
                           <Star size={40} />
                         </div>
                         <div className="flex flex-col gap-1 mt-2">
                           <h4 className="font-black text-slate-900">Perfectionist</h4>
                           <p className="text-xs font-bold text-slate-500 line-clamp-2">Score 100% on a final course assessment.</p>
                         </div>
                         <span className="text-xl font-black text-slate-300 mt-1">0/1</span>
                       </div>
                     </div>
                   </motion.div>
                 )}

                 {activeTab !== 'courses' && activeTab !== 'settings' && activeTab !== 'history' && activeTab !== 'achievements' && (
                    <motion.div 
                       key="coming-soon"
                       initial={{ opacity: 0, scale: 0.95 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.95 }}
                       className="bg-white rounded-[3.5rem] py-32 flex flex-col items-center justify-center text-center gap-8 border border-slate-100 shadow-sm"
                    >
                       <div className="bg-indigo-50 p-8 rounded-full text-indigo-400">
                         <Sparkles size={48} />
                       </div>
                       <div className="flex flex-col gap-2">
                         <h4 className="text-2xl font-black text-slate-900 capitalize">{activeTab} Page Coming Soon!</h4>
                         <p className="text-slate-500 font-medium">We're working hard to bring you this feature. Stay tuned!</p>
                       </div>
                    </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
