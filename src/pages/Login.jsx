import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, Lock, LogIn, ChevronRight, 
  Sparkles, GraduationCap, CheckCircle2,
  AlertCircle, ShieldCheck
} from 'lucide-react'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isGoogleProcessing, setIsGoogleProcessing] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const fbUser = userCredential.user;
      
      localStorage.setItem('skill_academy_user', JSON.stringify({
        name: fbUser.displayName || fbUser.email.split('@')[0],
        email: fbUser.email,
        uid: fbUser.uid
      }));
      localStorage.setItem('skill_academy_token', await fbUser.getIdToken());
      
      const from = location.state?.from || '/dashboard';
      navigate(from);
      window.location.reload();
    } catch (err) {
      console.error("Firebase Login Error details:", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Invalid email or password. Please try again.');
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
        name: fbUser.displayName || fbUser.email.split('@')[0],
        email: fbUser.email,
        uid: fbUser.uid
      }));
      localStorage.setItem('skill_academy_token', await fbUser.getIdToken());
      const from = location.state?.from || '/dashboard';
      navigate(from);
      window.location.reload();
    } catch (err) {
      console.error("Google Login Error:", err);
      setError(`Google sign-in failed: ${err.message}`);
      setIsGoogleProcessing(false);
    }
  }

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address above first.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, formData.email);
      setResetSent(true);
      setError('');
    } catch (err) {
      setError(`Could not send reset email: ${err.message}`);
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
        
        {/* Left: Interactive Info Column */}
        <div className="hidden lg:flex flex-col gap-12 p-20 bg-linear-to-br from-indigo-600 to-violet-800 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10 flex flex-col gap-16 h-full justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-[1.5rem] border border-white/20">
                <GraduationCap size={32} />
              </div>
              <span className="text-2xl font-black tracking-tight">SkillRise</span>
            </Link>

            <div className="flex flex-col gap-8">
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="flex flex-col gap-4"
               >
                 <h2 className="text-4xl md:text-5xl font-black leading-tight">
                   Unlock Your <br /> Full <span className="text-indigo-300">Potential</span>
                 </h2>
                 <p className="text-indigo-100 text-lg opacity-80 max-w-sm">Access world-class education from anywhere, at any time.</p>
               </motion.div>

               <div className="space-y-6 mt-10">
                 {[
                   'Over 12,000 top courses curated for you',
                   'Learn from industry experts directly',
                   'Access on all devices, anywhere'
                 ].map((text, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.2 + i * 0.1 }}
                     className="flex items-center gap-4 group"
                   >
                     <div className="p-2 bg-white/10 rounded-xl group-hover:bg-white group-hover:text-indigo-600 transition-all duration-300">
                       <CheckCircle2 size={18} />
                     </div>
                     <span className="text-sm font-bold opacity-90">{text}</span>
                   </motion.div>
                 ))}
               </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
               <ShieldCheck size={32} className="text-indigo-300 shrink-0" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed text-indigo-100 border-l border-white/10 pl-6"> Trusted by over 5 million students globally. </p>
            </div>
          </div>
        </div>

        {/* Right: Form Column */}
        <div className="flex flex-col p-10 md:p-20 relative overflow-hidden h-full">
           <div className="grow flex flex-col justify-center">
             <div className="flex flex-col gap-10">
               <div className="flex flex-col gap-3">
                 <h3 className="text-3xl font-black text-slate-900">Welcome <span className="text-indigo-600">Back!</span></h3>
                 <p className="text-slate-500 font-medium">Please enter your credentials to access your dashboard.</p>
               </div>

               <form onSubmit={handleSubmit} className="flex flex-col gap-8">
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

                 <div className="flex flex-col gap-6">
                   <div className="flex flex-col gap-3 group">
                     <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-1">Email Address</label>
                     <div className="relative">
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="Ex: hello@skillrise.edu"
                          className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all duration-300 font-bold"
                        />
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                     </div>
                   </div>

                   <div className="flex flex-col gap-3 group">
                     <div className="flex items-center justify-between px-1">
                       <label className="text-xs font-black uppercase tracking-widest text-slate-400">Password</label>
                       <a href="#" className="text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700">Forgot?</a>
                     </div>
                     <div className="relative">
                        <input 
                          type="password" 
                          required
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          placeholder="Enter your password"
                          className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all duration-300 font-bold"
                        />
                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
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
                       <span>Signing in...</span>
                     </div>
                   ) : (
                     <>Log In to My Dashboard <ChevronRight size={24} /></>
                   )}
                 </button>
               </form>

               {resetSent && (
                 <motion.div
                   initial={{ opacity: 0, y: -10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="bg-emerald-50 p-5 rounded-2xl flex items-center gap-3 text-emerald-700 border border-emerald-100"
                 >
                   <CheckCircle2 size={20} className="shrink-0" />
                   <span className="text-sm font-bold">Password reset email sent! Check your inbox.</span>
                 </motion.div>
               )}

               <div className="relative flex items-center justify-center">
                  <div className="absolute inset-x-0 h-px bg-slate-100" />
                  <span className="relative z-10 bg-white px-4 text-xs font-black uppercase tracking-widest text-slate-300">Or continue with</span>
               </div>

               <button
                 type="button"
                 onClick={handleGoogleSignIn}
                 disabled={isGoogleProcessing}
                 className="btn-outline w-full py-4 rounded-[2.5rem] flex items-center justify-center gap-3 font-black text-slate-700 border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
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
                     Sign in with Google
                   </>
                 )}
               </button>

               <div className="relative flex items-center justify-center">
                  <span className="relative z-10 bg-white px-4 text-xs font-black uppercase tracking-widest text-slate-300">Don't have an account?</span>
               </div>

               <Link to="/signup" className="btn-outline w-full py-5 rounded-[2.5rem] flex items-center justify-center gap-3 font-black text-slate-600 border-slate-100 hover:border-indigo-100 group">
                 Sign up for free <Sparkles size={18} className="text-amber-400 group-hover:rotate-12 transition-transform" />
               </Link>
             </div>
           </div>

           <p className="mt-20 text-center text-xs text-slate-400 font-bold uppercase tracking-widest">
             © {new Date().getFullYear()} SkillRise Academy. All secure.
           </p>
        </div>
      </div>
    </motion.div>
  )
}
