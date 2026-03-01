import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PlayCircle, CheckCircle, Circle, ChevronLeft, 
  Menu, X, MessageSquare, Download, Award, Share2,
  FileText, Code, Bookmark, MoreVertical, LayoutDashboard
} from 'lucide-react'
import { courses } from '../data/coursesData'

export default function CoursePlayer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [activeLesson, setActiveLesson] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // In a real app, fetch course by ID from database
    const foundCourse = courses.find(c => c.id === parseInt(id)) || courses[0]
    setCourse(foundCourse)
  }, [id])

  if (!course) return (
    <div className="min-h-screen pt-32 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  )

  // Mock Modules for the Course
  const courseModules = [
    {
      title: "Introduction to the Course",
      lessons: [
        { title: "Welcome to the Program", duration: "05:20", completed: true },
        { title: "Course Requirements & Setup", duration: "12:45", completed: true },
        { title: "How to Get Help", duration: "03:15", completed: false }
      ]
    },
    {
      title: "Core Fundamentals",
      lessons: [
        { title: "Understanding the Basics", duration: "18:30", completed: false },
        { title: "Deep Dive into Core Concepts", duration: "25:10", completed: false },
        { title: "Practical Application Exercise", duration: "32:00", completed: false }
      ]
    },
    {
      title: "Advanced Techniques",
      lessons: [
        { title: "Optimizing Your Workflow", duration: "15:45", completed: false },
        { title: "Common Pitfalls & Solutions", duration: "22:20", completed: false },
        { title: "Final Project Overview", duration: "10:00", completed: false }
      ]
    }
  ]

  let lessonIndexCounter = 0;

  return (
    <div className="bg-slate-900 min-h-screen pt-20 flex flex-col text-slate-50">
      
      {/* Top Navbar specifically for Player */}
      <header className="fixed top-0 inset-x-0 h-20 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 z-50 flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block" />
          <div className="flex flex-col">
            <h1 className="text-sm font-black truncate max-w-[200px] sm:max-w-md">{course.name}</h1>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{course.instructor}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 mr-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your Progress</span>
              <span className="text-xs font-bold text-white">22% Completed</span>
            </div>
            <div className="w-32 h-2 rounded-full bg-white/10 overflow-hidden">
               <div className="h-full bg-indigo-500 rounded-full" style={{ width: '22%' }} />
            </div>
          </div>
          
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-colors shadow-lg shadow-indigo-500/20">
            <Award size={16} /> Get Certificate
          </button>
          
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex grow mt-px">
        
        {/* Main Video Area */}
        <main className={`flex-1 transition-all duration-300 relative ${sidebarOpen ? 'lg:mr-[400px]' : ''}`}>
          <div className="w-full bg-black aspect-video relative flex items-center justify-center overflow-hidden border-b border-white/5">
             <img src={course.image} alt="Video Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-30" />
             <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent" />
             <button className="relative z-10 w-20 h-20 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white flex items-center justify-center border border-white/20 shadow-2xl backdrop-blur-md hover:scale-110 transition-all duration-300 group">
                <PlayCircle size={40} className="ml-2 group-hover:scale-110 transition-transform" />
             </button>
             
             {/* Fake Video Controls */}
             <div className="absolute bottom-0 inset-x-0 p-4 bg-linear-to-t from-black/80 to-transparent flex flex-col gap-2">
               <div className="w-full h-1 bg-white/20 rounded-full cursor-pointer overflow-hidden group">
                 <div className="h-full bg-indigo-500 w-1/3 relative group-hover:bg-indigo-400">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform shadow-sm" />
                 </div>
               </div>
               <div className="flex items-center justify-between text-xs font-bold text-white">
                 <div className="flex items-center gap-4">
                   <button><PlayCircle size={20} /></button>
                   <span>04:12 / 12:45</span>
                 </div>
                 <div className="flex items-center gap-4 text-white/70">
                   <button className="hover:text-white transition-colors">1.0x</button>
                   <button className="hover:text-white transition-colors"><MessageSquare size={18} /></button>
                   <button className="hover:text-white transition-colors"><MoreVertical size={18} /></button>
                 </div>
               </div>
             </div>
          </div>

          <div className="max-w-4xl mx-auto p-6 md:p-10">
             <div className="flex items-start justify-between gap-6 flex-wrap mb-10">
               <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Lesson 3: How to Get Help</h2>
                  <p className="text-slate-400 font-medium">Module 1: Introduction to the Course</p>
               </div>
               <div className="flex gap-3">
                 <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-colors border border-white/5">
                   <Bookmark size={16} /> Save
                 </button>
                 <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-colors border border-white/5">
                   <Share2 size={16} /> Share
                 </button>
               </div>
             </div>

             {/* Content Tabs */}
             <div className="flex gap-8 border-b border-white/10 mb-8 overflow-x-auto p-1">
                {[
                  { id: 'overview', label: 'Overview', icon: FileText },
                  { id: 'qna', label: 'Q&A', icon: MessageSquare },
                  { id: 'downloads', label: 'Downloads', icon: Download },
                  { id: 'code', label: 'Resources', icon: Code }
                ].map(tab => (
                   <button 
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id)}
                     className={`pb-4 text-sm font-black uppercase tracking-widest flex items-center gap-2 whitespace-nowrap border-b-2 transition-colors ${
                       activeTab === tab.id 
                         ? 'border-indigo-500 text-indigo-400' 
                         : 'border-transparent text-slate-500 hover:text-slate-300'
                     }`}
                   >
                     <tab.icon size={18} /> {tab.label}
                   </button>
                ))}
             </div>

             {/* Tab Content */}
             <AnimatePresence mode="wait">
               {activeTab === 'overview' && (
                 <motion.div 
                   key="overview"
                   initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                   className="prose prose-invert max-w-none"
                 >
                   <p className="text-slate-300 leading-relaxed text-lg mb-6">
                     In this lesson, we will cover the various channels available for getting help when you are stuck. 
                     Learning a new skill can be challenging, but our community and mentorship programs are designed 
                     to ensure you never stay stuck for long.
                   </p>
                   
                   <h3 className="text-xl font-bold text-white mb-4 mt-8">What you will learn:</h3>
                   <ul className="space-y-3 mb-8">
                     {course.learnings.map((learning, i) => (
                       <li key={i} className="flex items-start gap-3 text-slate-300">
                         <CheckCircle className="text-indigo-400 shrink-0 mt-0.5" size={20} />
                         <span>{learning}</span>
                       </li>
                     ))}
                   </ul>

                   <div className="bg-white/5 border border-indigo-500/30 rounded-2xl p-6 mt-10">
                     <h4 className="text-indigo-400 font-bold mb-2">Instructor Note</h4>
                     <p className="text-sm text-slate-300">Don't hesitate to reach out on the Discord community. I am personally active every Tuesday and Thursday to answer your questions and review code.</p>
                   </div>
                 </motion.div>
               )}

               {activeTab !== 'overview' && (
                 <motion.div 
                   key="other"
                   initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                   className="py-20 flex flex-col items-center justify-center text-center gap-4 bg-white/5 rounded-3xl border border-dashed border-white/10"
                 >
                   <div className="bg-white/10 p-4 rounded-full text-white/50 mb-2">
                     {activeTab === 'qna' ? <MessageSquare size={40} /> : activeTab === 'downloads' ? <Download size={40} /> : <Code size={40} />}
                   </div>
                   <h4 className="text-xl font-bold text-white capitalize">{activeTab} section</h4>
                   <p className="text-slate-500 text-sm max-w-sm">This section is currently being updated by the instructor. Check back soon for new resources.</p>
                 </motion.div>
               )}
             </AnimatePresence>

          </div>
        </main>

        {/* Course Content Sidebar Right */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside 
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[400px] mt-20 bg-slate-900 border-l border-white/10 z-40 flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 bg-slate-900 z-10">
                <h3 className="text-lg font-black text-white">Course Content</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto pl-2 pr-6 py-4 space-y-6 custom-scrollbar pb-32">
                 {courseModules.map((module, mIndex) => (
                   <div key={mIndex} className="flex flex-col gap-2">
                     <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 ml-4 mb-2 flex items-center justify-between">
                       <span>Section {mIndex + 1}</span>
                       <span className="text-[10px] bg-white/5 px-2 py-1 rounded-md">{module.lessons.length} lessons</span>
                     </h4>
                     
                     <div className="flex flex-col gap-1">
                       {module.lessons.map((lesson, lIndex) => {
                         const globalIndex = ++lessonIndexCounter;
                         const isActive = globalIndex === 3; // Hardcoded active state for UI
                         
                         return (
                           <button 
                             key={lIndex}
                             onClick={() => setActiveLesson(globalIndex)}
                             className={`w-full text-left p-4 rounded-2xl flex items-start gap-4 transition-all duration-200 group ${
                               isActive 
                                 ? 'bg-indigo-600 shadow-lg shadow-indigo-600/20 text-white' 
                                 : 'hover:bg-white/5 text-slate-300'
                             }`}
                           >
                              <div className="shrink-0 mt-0.5">
                                {lesson.completed 
                                  ? <CheckCircle size={20} className={isActive ? 'text-indigo-200' : 'text-emerald-500'} />
                                  : isActive 
                                    ? <PlayCircle size={20} className="text-white" />
                                    : <Circle size={20} className="text-slate-600 group-hover:text-slate-400" />
                                }
                              </div>
                              <div className="flex flex-col gap-1 grow">
                                <span className={`text-sm font-bold leading-snug line-clamp-2 ${isActive ? 'text-white' : ''}`}>
                                  {globalIndex}. {lesson.title}
                                </span>
                                <span className={`text-xs font-medium flex flex-center gap-1 ${isActive ? 'text-indigo-200' : 'text-slate-500'}`}>
                                  <PlayCircle size={12} /> {lesson.duration}
                                </span>
                              </div>
                           </button>
                         )
                       })}
                     </div>
                   </div>
                 ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
