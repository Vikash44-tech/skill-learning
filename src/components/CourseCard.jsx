import { Link } from 'react-router-dom'
import { Star, Clock, Users, ArrowUpRight, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CourseCard({ course }) {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 group"
    >
      <Link to={`/course/${course.id}`} className="block relative aspect-video overflow-hidden">
        <img 
          src={course.image} 
          alt={course.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <span className="text-white text-sm font-semibold flex items-center gap-2">
            View Details <ArrowUpRight size={16} />
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
          <span className="text-sm font-bold text-indigo-600">${course.price}</span>
        </div>
        {course.rating >= 4.8 && (
          <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
            <TrendingUp size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Top Rated</span>
          </div>
        )}
      </Link>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md">
            {course.category}
          </span>
          <div className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="text-xs font-medium text-slate-500">{course.instructor}</span>
        </div>

        <Link to={`/course/${course.id}`} className="block mb-4">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
            {course.name}
          </h3>
        </Link>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-slate-500">
            <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
              <Clock size={14} />
            </div>
            <span className="text-xs font-medium">{course.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
              <Star size={14} fill="currentColor" />
            </div>
            <span className="text-xs font-bold text-slate-700">{course.rating}</span>
            <span className="text-[10px] text-slate-400">({course.reviews})</span>
          </div>
        </div>

        <Link 
          to={`/course/${course.id}`}
          className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 group-hover:bg-indigo-600 font-bold border border-slate-100 group-hover:border-indigo-600 rounded-xl text-slate-700 group-hover:text-white transition-all duration-300 active:scale-[0.98]"
        >
          Enroll Now
          <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  )
}
