import Hero from '../components/Hero'
import CourseCard from '../components/CourseCard'
import { courses } from '../data/coursesData'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, TrendingUp, Users, Trophy, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  const featuredCourses = courses.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24"
    >
      <Hero />

      {/* Partners/Social Proof */}
      <section className="py-12 bg-white border-y border-slate-100 mb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            Trusted by these innovative companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:opacity-80 transition-opacity">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Airbnb', 'Spotify'].map(name => (
              <span key={name} className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter italic">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="container mx-auto px-4 md:px-8 mb-32">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
          <div className="flex flex-col gap-4 max-w-xl">
            <span className="inline-flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full self-start">
              <TrendingUp size={14} />
              Recommended for you
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              Our <span className="text-indigo-600">Most Popular</span> Courses <br />
              to boost your career
            </h2>
          </div>
          <Link to="/courses" className="flex items-center gap-2 group text-indigo-600 font-bold hover:gap-3 transition-all duration-300">
            View all courses <ArrowRight size={20} />
          </Link>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredCourses.map(course => (
            <motion.div variants={itemVariants} key={course.id}>
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Feature Section */}
      <section className="bg-slate-900 py-32 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/10 blur-[120px] rounded-full" />

        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col gap-10">
              <div className="inline-flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest">
                <Sparkles size={14} />
                Why choose us
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                Empower yourself with <br /> 
                <span className="text-indigo-400">superior</span> learning experiences
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                    <Users size={24} />
                  </div>
                  <h4 className="text-white font-bold text-lg">World Class Mentors</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">Learn from top industry professionals and experienced teachers worldwide.</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center border border-rose-500/20">
                    <Trophy size={24} />
                  </div>
                  <h4 className="text-white font-bold text-lg">Recognized Certificates</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">Get valid, shareable certificates upon course completion for your career.</p>
                </div>
              </div>
              
              <Link to="/signup" className="btn-primary py-4 px-8 rounded-2xl self-start">
                Become a Student Now
              </Link>
            </div>

            <div className="relative">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black aspect-video border border-slate-700">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
                  alt="Students collaborating" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              {/* Stats overlay */}
              <div className="absolute -bottom-10 -right-6 md:-right-10 bg-white p-6 rounded-3xl shadow-2xl flex flex-col gap-1 min-w-[160px]">
                <span className="text-3xl font-black text-slate-900 tracking-tighter">1,200+</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Mentors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-8 mt-32">
        <div className="bg-linear-to-r from-indigo-600 to-violet-700 rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-400/10 blur-[60px] rounded-full -translate-x-1/2 translate-y-1/2" />
          
          <div className="flex flex-col items-center text-center gap-8 relative z-10 max-w-2xl mx-auto">
             <div className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white inline-block">
               <GraduationCap size={40} />
             </div>
             <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
               Are you ready to start your <br /> career path with us?
             </h2>
             <p className="text-indigo-100 text-lg opacity-80">
               Get unlimited access to over 12,000 top-rated courses taught by real-world experts. Join today for exclusive early bird pricing.
             </p>
             <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
               <Link to="/signup" className="btn bg-white text-indigo-600 font-black px-10 py-5 rounded-2xl shadow-xl shadow-black/10 hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300">
                 Get Started Now
               </Link>
               <Link to="/courses" className="text-white font-bold underline underline-offset-8 decoration-white/30 hover:decoration-white transition-all">
                 Browse all courses
               </Link>
             </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
