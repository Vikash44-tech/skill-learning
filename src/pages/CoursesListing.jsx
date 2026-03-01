import { useState, useEffect } from 'react'
import CourseCard from '../components/CourseCard'
import { courses } from '../data/coursesData'
import { Search, Filter, SlidersHorizontal, ArrowDownNarrowWide, LayoutGrid, LayoutList, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CoursesListing() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [sortBy, setSortBy] = useState('popular')

  const categories = ['All', ...new Set(courses.map(c => c.category))];

  useEffect(() => {
    let result = courses.filter(course => 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== 'All') {
      result = result.filter(course => course.category === selectedCategory);
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredCourses(result);
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-slate-50 min-h-screen pt-32 pb-24"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
          <div className="max-w-2xl flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Explore Our <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Diverse</span> Library
            </h1>
            <p className="text-slate-500 md:text-lg">
              Unlock your potential with over {courses.length} high-quality courses designed to advance your professional career.
            </p>
          </div>
          
          <div className="relative group w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search by course name or instructor..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4.5 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all duration-300 font-medium"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-72 shrink-0 flex flex-col gap-10">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-8">
              <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                <span className="font-black text-slate-900 flex items-center gap-2">
                  <Filter size={18} className="text-indigo-600" /> Filters
                </span>
                <button 
                  onClick={() => {setSelectedCategory('All'); setSearchTerm(''); setSortBy('popular');}}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-widest"
                >
                  Reset
                </button>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Category</h4>
                <div className="flex flex-wrap lg:flex-col gap-3">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2.5 rounded-xl text-left text-sm font-bold transition-all duration-200 flex items-center justify-between group ${
                        selectedCategory === cat 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-500' 
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Sort By</h4>
                <div className="relative group">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none cursor-pointer"
                  >
                    <option value="popular">Popularity</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ArrowDownNarrowWide size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                </div>
              </div>
            </div>

            <div className="bg-linear-to-tr from-indigo-600 to-violet-700 p-8 rounded-3xl text-white flex flex-col gap-6 shadow-xl shadow-indigo-600/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2" />
               <Sparkles className="text-amber-300" size={32} />
               <h4 className="text-xl font-black leading-tight">Get 20% Off Your First Course</h4>
               <p className="text-xs text-indigo-100 font-medium leading-relaxed opacity-80">
                 Join our newsletter to receive exclusive course discounts and career tips.
               </p>
               <button className="bg-white text-indigo-700 py-3 px-6 rounded-xl font-black text-sm hover:translate-y-[-2px] transition-all active:translate-y-0">
                 Join Now
               </button>
            </div>
          </aside>

          {/* Main Grid */}
          <div className="grow">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm font-bold text-slate-500">
                Showing <span className="text-slate-900">{filteredCourses.length}</span> results found
              </p>
              <div className="flex items-center gap-4">
                <button className="p-2 text-indigo-600 bg-white shadow-sm border border-slate-100 rounded-lg">
                  <LayoutGrid size={20} />
                </button>
                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                  <LayoutList size={20} />
                </button>
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredCourses.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                  {filteredCourses.map(course => (
                    <motion.div
                      key={course.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CourseCard course={course} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-[3rem] border border-dashed border-slate-200"
                >
                  <div className="bg-slate-100 p-8 rounded-full text-slate-400 mb-6">
                    <Search size={64} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">No courses found</h3>
                  <p className="text-slate-500 max-w-sm font-medium">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <button 
                    onClick={() => {setSelectedCategory('All'); setSearchTerm('');}}
                    className="mt-8 btn-primary px-8 py-4 rounded-2xl"
                  >
                    Reset all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
