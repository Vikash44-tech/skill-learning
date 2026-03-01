import { Search, Rocket, Zap, Users, PlayCircle, Star, Sparkles, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center pointer-events-none opacity-20">
        <div className="w-[100vw] h-[100vw] rounded-full bg-linear-to-tr from-indigo-500/30 to-rose-400/30 blur-[120px] absolute -top-[20vh] -left-[10vw] animate-pulse" />
        <div className="w-[100vw] h-[100vw] rounded-full bg-linear-to-tr from-violet-600/30 to-blue-400/30 blur-[120px] absolute -bottom-[20vh] -right-[10vw]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-8 max-w-2xl relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm self-start"
          >
            <Sparkles size={16} className="text-amber-500" />
            <span>Empower Your Future Today</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]"
          >
            Upgrade Your <span className="text-indigo-600">Skills</span>, Shape Your <br />
            <span className="bg-linear-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent">Future</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-600 md:text-lg leading-relaxed max-w-lg"
          >
            Master the most in-demand skills from world-class instructors. Join 5M+ learners worldwide and start your career journey today.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4"
          >
            <div className="relative flex-grow max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="What do you want to learn?" 
                className="w-full pl-14 pr-4 py-4 md:py-5 bg-white rounded-2xl shadow-xl shadow-indigo-500/5 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all duration-300 border border-slate-100 font-medium"
              />
              <Link to="/courses" className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary py-3 px-6 rounded-xl text-sm font-bold text-white shadow-lg active:scale-95 transition-transform md:py-3.5">
                Explore
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-8 pt-6"
          >
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 leading-none">5M+</span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 py-1">Students</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200" />
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 leading-none">12K+</span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 py-1">Courses</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Star size={16} fill="#f59e0b" className="text-amber-500" />
                <span className="text-2xl font-black text-slate-900 leading-none">4.9/5</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 py-1">Rating</span>
            </div>
          </motion.div>
        </div>

        <div className="relative order-first lg:order-last">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-500/20 aspect-video md:aspect-[4/3] w-full max-w-[500px] mx-auto group">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
                alt="Students learning together" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-indigo-900/60 to-slate-900/20 flex items-center justify-center p-8">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/50 shadow-2xl transition-all duration-300 hover:bg-white hover:text-indigo-600"
                >
                  <PlayCircle size={40} />
                </motion.button>
              </div>
            </div>

            {/* Decorative Floating Cards */}
            <motion.div 
              animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 md:-right-12 bg-white p-4 rounded-2xl shadow-xl z-20 border border-slate-100 hidden md:flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                <Zap size={20} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800">Fast Learning</span>
                <span className="text-[10px] text-slate-400 font-medium">Accelerated programs</span>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-4 rounded-2xl shadow-xl z-20 border border-slate-100 hidden md:flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                <Users size={20} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800">Expert Mentors</span>
                <span className="text-[10px] text-slate-400 font-medium">Top industry pros</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Main Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-600/10 rounded-full blur-[80px] -z-10 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
