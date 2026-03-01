import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Globe2, Users, Award, BookOpen, 
  Sparkles, Target, Zap, Heart,
  ChevronRight 
} from 'lucide-react'

export default function AboutUs() {
  const stats = [
    { value: '5M+', label: 'Active Students', icon: Users },
    { value: '12K+', label: 'Premium Courses', icon: BookOpen },
    { value: '4.8/5', label: 'Average Rating', icon: Award },
    { value: '180+', label: 'Countries Reached', icon: Globe2 },
  ]

  const values = [
    {
      title: 'Accessible Learning',
      description: 'We believe education should be available to everyone, everywhere, regardless of their background or location.',
      icon: Globe2,
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      title: 'Quality First',
      description: 'Every course on our platform undergoes a rigorous vetting process to ensure premium quality content.',
      icon: Award,
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    },
    {
      title: 'Community Driven',
      description: 'We foster a collaborative environment where students and instructors can connect and grow together.',
      icon: Heart,
      color: 'text-rose-500',
      bg: 'bg-rose-50'
    },
    {
      title: 'Continuous Innovation',
      description: 'We constantly update our platform and course catalog to keep pace with rapid technological advancements.',
      icon: Zap,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50'
    }
  ]

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-8 mb-24">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest border border-indigo-100"
          >
            <Sparkles size={16} /> Our Story
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1]"
          >
            Empowering the World to <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-600">Learn Anything</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed mt-4"
          >
            SkillRise was founded on a simple premise: everyone deserves access to world-class education. We connect passionate instructors with eager learners globally.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 md:px-8 mb-32">
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
           <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex flex-col items-center text-center gap-3 pt-8 md:pt-0 ${i > 0 && i % 2 !== 0 && 'md:pl-8'} ${i > 1 && 'pt-8 lg:pt-0 lg:pl-8'}`}
                >
                  <div className="p-4 bg-white/5 rounded-2xl text-indigo-400 mb-2">
                    <stat.icon size={32} />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-white">{stat.value}</h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="container mx-auto px-4 md:px-8 mb-32">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 flex flex-col gap-8">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Driven by <br/> <span className="text-indigo-600">Core Values</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              We aren't just building a platform; we are cultivating an ecosystem where curiosity thrives and potential is unlocked. Our values guide every decision we make and every line of code we write.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <Link to="/courses" className="btn-primary py-4 px-8 rounded-2xl flex items-center gap-2">
                Explore Courses <ChevronRight size={20} />
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
             {values.map((value, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-white p-8 rounded-4xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
               >
                 <div className={`w-14 h-14 rounded-2xl ${value.bg} ${value.color} flex items-center justify-center mb-6`}>
                   <value.icon size={24} />
                 </div>
                 <h4 className="text-xl font-black text-slate-900 mb-3">{value.title}</h4>
                 <p className="text-slate-500 font-medium leading-relaxed">{value.description}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

    </div>
  )
}
