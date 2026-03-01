import { Link } from 'react-router-dom'
import { GraduationCap, Mail, Phone, MapPin, Twitter, Github, Linkedin, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-indigo-600 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform duration-300">
                <GraduationCap size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                SkillRise
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Empowering learners worldwide with the skills they need to shape their future in a rapidly changing world.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-indigo-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-indigo-400 transition-colors"><Github size={20} /></a>
              <a href="#" className="hover:text-indigo-400 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-indigo-400 transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-semibold">Platform</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link to="/about" className="hover:text-indigo-400 transition-all duration-200">About Us</Link></li>
              <li><Link to="/courses" className="hover:text-indigo-400 transition-all duration-200">Browse Courses</Link></li>
              <li><Link to="/mentors" className="hover:text-indigo-400 transition-all duration-200">Our Mentors</Link></li>
              <li><Link to="/affiliate" className="hover:text-indigo-400 transition-all duration-200">Affiliate Program</Link></li>
              <li><Link to="/pricing" className="hover:text-indigo-400 transition-all duration-200">Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-semibold">Support</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link to="/contact" className="hover:text-indigo-400 transition-all duration-200">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-indigo-400 transition-all duration-200">Help Center (FAQ)</Link></li>
              <li><Link to="/terms" className="hover:text-indigo-400 transition-all duration-200">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-indigo-400 transition-all duration-200">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-semibold">Connect</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-indigo-500" />
                <span>support@skillrise.edu</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-indigo-500" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-indigo-500" />
                <span>123 Innovation Drive, Tech City, CA 94103</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <p>© {new Date().getFullYear()} SkillRise Academy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Made with ❤️ for future builders</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
