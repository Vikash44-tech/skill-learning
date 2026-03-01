import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, Lock, User, UserPlus, ChevronRight, 
  Sparkles, GraduationCap, CheckCircle2,
  AlertCircle, ShieldCheck, Zap, Award, BookOpen
} from 'lucide-react'
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'

export default function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  })
  const [error, setError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isGoogleProcessing, setIsGoogleProcessing] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setIsProcessing(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const fbUser = userCredential.user;
      
      // Update the user's display name
      await updateProfile(fbUser, { displayName: formData.name });
      
      localStorage.setItem('skill_academy_user', JSON.stringify({
        name: formData.name,
        email: fbUser.email,
        uid: fbUser.uid
      }));
      localStorage.setItem('skill_academy_token', await fbUser.getIdToken());
      
      navigate('/dashboard');
      window.location.reload(); 
    } catch (err) {
      console.error("Firebase Signup Error details:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(`Error: ${err.message}`);
      }
      setIsProcessing(false);
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleProcessing(true);
    setError('');
    
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;
      
      localStorage.setItem('skill_academy_user', JSON.stringify({
        name: fbUser.displayName || 'Google User',
        email: fbUser.email,
        uid: fbUser.uid
      }));
      localStorage.setItem('skill_academy_token', await fbUser.getIdToken());
      
      navigate('/dashboard');
      window.location.reload(); 
    } catch (err) {
      console.error("Google Signin Error:", err);
      setError(`Google Signin Error: ${err.message}`);
      setIsGoogleProcessing(false);
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-slate-50 min-h-screen pt-32 pb-24 flex items-center justify-center p-4"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-[4rem] shadow-2xl border border-slate-100 bg-white">
        
        {/* Left Info Column */}
        <div className="hidden lg:flex flex-col gap-12 p-20 bg-linear-to-br from-indigo-700 to-indigo-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10 flex flex-col gap-16 h-full justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-[1.5rem] border border-white/20">
                <GraduationCap size={32} />
              </div>
              <span className="text-2xl font-black tracking-tight">SkillRise</span>
            </Link>

            <div className="flex flex-col gap-10">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex flex-col gap-6"
               >
                 <h2 className="text-4xl md:text-5xl font-black leading-tight">
                   The <span className="text-indigo-300">Fastest</span> Way to Master New <span className="text-indigo-300 underline decoration-indigo-400">Skills</span>
                 </h2>
                 <p className="text-indigo-100 text-lg opacity-80 max-w-sm">Join world-class professionals and start building something amazing today.</p>
               </motion.div>

               <div className="grid grid-cols-1 gap-6">
                 {[
                   { icon: Award, label: 'Industry Recognized Certificates' },
                   { icon: BookOpen, label: 'Access to 12K+ Top Courses' },
                   { icon: Zap, label: 'Accelerated Learning Programs' }
                 ].map((item, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.3 + i * 0.1 }}
                     className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-3xl border border-white/10 group hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                   >
                     <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                       <item.icon size={24} />
                     </div>
                     <span className="text-sm font-bold opacity-90">{item.label}</span>
                   </motion.div>
                 ))}
               </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-900/20 backdrop-blur-md p-6 rounded-3xl border border-white/5">
               <CheckCircle2 size={32} className="text-emerald-400 shrink-0" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed text-indigo-100 border-l border-white/10 pl-6"> No credit card required to start viewing free content today. </p>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="flex flex-col p-10 md:p-20 relative overflow-hidden h-full">
           <div className="grow flex flex-col justify-center">
             <div className="flex flex-col gap-8">
               <div className="flex flex-col gap-3">
                 <h3 className="text-3xl font-black text-slate-900">Create <span className="text-indigo-600">Account</span></h3>
                 <p className="text-slate-500 font-medium">Join our community and transform your career.</p>
               </div>

               <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                 <AnimatePresence>
                   {error && (
                     <motion.div 
                       initial={{ opacity: 0, y: -10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       className="bg-rose-50 p-5 rounded-2xl flex items-center gap-3 text-rose-600 border border-rose-100"
                     >
                        <AlertCircle size={20} className="shrink-0" />
                        <span className="text-sm font-bold">{error}</span>
                     </motion.div>
                   )}
                 </AnimatePresence>

                 <div className="flex flex-col gap-4">
                   <div className="flex flex-col gap-2 group">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Full Name</label>
                     <div className="relative">
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Ex: John Doe"
                          className="w-full pl-14 pr-6 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all duration-300 font-bold"
                        />
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                     </div>
                   </div>

                   <div className="flex flex-col gap-2 group">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Email Address</label>
                     <div className="relative">
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="Ex: hello@skillrise.edu"
                          className="w-full pl-14 pr-6 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all duration-300 font-bold"
                        />
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                     </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2 group">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Password</label>
                        <div className="relative">
                           <input 
                             type="password" 
                             required
                             value={formData.password}
                             onChange={(e) => setFormData({...formData, password: e.target.value})}
                             placeholder="6+ characters"
                             className="w-full pl-14 pr-6 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all duration-300 font-bold"
                           />
                           <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 group">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Confirm Password</label>
                        <div className="relative">
                           <input 
                             type="password" 
                             required
                             value={formData.confirmPassword}
                             onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                             placeholder="Repeat password"
                             className="w-full pl-14 pr-6 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all duration-300 font-bold"
                           />
                           <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                        </div>
                      </div>
                   </div>
                 </div>

                 <button 
                   type="submit" 
                   disabled={isProcessing}
                   className="btn-primary w-full py-5 rounded-[2rem] flex items-center justify-center gap-3 text-lg font-black active:scale-[0.98] transition-all relative overflow-hidden"
                 >
                   {isProcessing ? (
                     <div className="flex items-center gap-4">
                       <div className="w-5 h-5 border-4 border-indigo-200 border-t-white rounded-full animate-spin" />
                       <span>Registering...</span>
                     </div>
                   ) : (
                     <><UserPlus size={24} /> Create Account Free</>
                   )}
                 </button>
               </form>

               <div className="relative flex items-center justify-center pt-2">
                  <div className="absolute inset-x-0 h-px bg-slate-100" />
                  <span className="relative z-10 bg-white px-4 text-xs font-black uppercase tracking-widest text-slate-300">Or continue with</span>
               </div>

               <button 
                 onClick={handleGoogleSignIn}
                 disabled={isGoogleProcessing}
                 className="btn-outline w-full py-5 rounded-[2.5rem] flex items-center justify-center gap-3 font-black text-slate-700 border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
               >
                 {isGoogleProcessing ? (
                   <div className="w-5 h-5 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
                 ) : (
                   <>
                     <svg className="w-5 h-5" viewBox="0 0 24 24">
                       <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                       <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                       <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                       <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                     </svg>
                     Sign up with Google
                   </>
                 )}
               </button>

               <div className="relative flex items-center justify-center pt-2">
                  <div className="absolute inset-x-0 h-[1px] bg-slate-100" />
                  <span className="relative z-10 bg-white px-4 text-xs font-black uppercase tracking-widest text-slate-300">Already a Student?</span>
               </div>

               <Link to="/login" className="btn-outline w-full py-5 rounded-[2.5rem] flex items-center justify-center gap-3 font-black text-slate-600 border-slate-100 hover:border-indigo-100 group">
                 Log In Instead <ChevronRight size={18} className="text-indigo-600 group-hover:translate-x-1 transition-transform" />
               </Link>
             </div>
           </div>

           <p className="mt-12 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed px-10">
             By signing up, you agree to our <span className="text-indigo-400">Terms of Service</span> and <span className="text-indigo-400">Privacy Policy</span>.
           </p>
        </div>
      </div>
    </motion.div>
  )
}
