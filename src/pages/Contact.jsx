import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, MessageCircle, Phone, MapPin, CheckCircle2,
  Sparkles, ChevronRight, Star, Zap, Shield, Users
} from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Starter',
    price: 0,
    period: 'forever',
    description: 'Perfect for exploring and casual learning.',
    color: 'from-slate-500 to-slate-700',
    features: [
      'Access to 5 free courses',
      'Community forum access',
      'Mobile app access',
      'Certificate of completion',
    ],
    missing: ['Live sessions', 'Priority support', 'Offline downloads', 'Team management'],
    cta: 'Get Started Free',
    ctaLink: '/signup',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 29,
    period: 'month',
    description: 'For serious learners who want full access.',
    color: 'from-indigo-600 to-violet-700',
    features: [
      'Unlimited course access',
      'Live interactive sessions',
      'Offline downloads',
      'Priority support (24hr)',
      'Certificate of completion',
      'Advanced analytics',
    ],
    missing: ['Team management'],
    cta: 'Start Pro Free Trial',
    ctaLink: '/signup',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Team',
    price: 79,
    period: 'month',
    description: 'Empower your entire team to learn together.',
    color: 'from-violet-600 to-purple-800',
    features: [
      'Everything in Pro',
      'Up to 20 team seats',
      'Team progress dashboard',
      'Custom learning paths',
      'Dedicated account manager',
      'SSO & advanced security',
    ],
    missing: [],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    highlight: false,
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [billing, setBilling] = useState('monthly')

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-50 min-h-screen"
    >
      {/* ─── Pricing Section ─── */}
      <section className="pt-40 pb-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto max-w-6xl relative">
          
          <div className="text-center flex flex-col gap-5 mb-16">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 self-center">Transparent Pricing</span>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
              Invest in Your <span className="text-indigo-600">Future</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto">
              Simple, honest pricing. No hidden fees. Cancel any time.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center gap-4 self-center bg-white p-1.5 rounded-full border border-slate-200 shadow-sm mt-2">
              <button
                onClick={() => setBilling('monthly')}
                className={`px-6 py-2.5 rounded-full font-black text-sm transition-all ${billing === 'monthly' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
              >Monthly</button>
              <button
                onClick={() => setBilling('yearly')}
                className={`px-6 py-2.5 rounded-full font-black text-sm transition-all flex items-center gap-2 ${billing === 'yearly' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Yearly
                <span className="text-[9px] font-black uppercase tracking-widest bg-emerald-500 text-white px-2 py-0.5 rounded-full">Save 30%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-[3rem] overflow-hidden flex flex-col ${
                  plan.highlight 
                    ? 'shadow-2xl shadow-indigo-500/20 ring-2 ring-indigo-500/30 z-10' 
                    : 'shadow-sm border border-slate-100 bg-white'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-6 right-6 bg-amber-400 text-slate-900 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg z-10">
                    <Star size={10} fill="currentColor" /> {plan.badge}
                  </div>
                )}
                <div className={`bg-linear-to-br ${plan.color} p-10 text-white`}>
                  <h3 className="text-xl font-black uppercase tracking-widest opacity-80 mb-1">{plan.name}</h3>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-5xl font-black">
                      ${billing === 'yearly' && plan.price > 0 ? Math.round(plan.price * 0.7) : plan.price}
                    </span>
                    <span className="opacity-60 font-bold mb-2">/{plan.period}</span>
                  </div>
                  <p className="text-sm opacity-80 font-medium">{plan.description}</p>
                </div>
                <div className="bg-white flex-1 p-10 flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                    {plan.features.map(f => (
                      <div key={f} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                        {f}
                      </div>
                    ))}
                    {plan.missing.map(f => (
                      <div key={f} className="flex items-center gap-3 text-sm font-bold text-slate-300 line-through">
                        <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-200 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <Link 
                    to={plan.ctaLink}
                    className={`mt-auto w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-sm transition-all active:scale-[0.98] ${plan.highlight ? 'btn-primary' : 'btn-outline text-slate-700'}`}
                  >
                    {plan.cta} <ChevronRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="mt-20 flex flex-wrap items-center justify-center gap-10 opacity-60">
            {[
              { icon: Shield, text: '30-day money back' },
              { icon: Zap, text: 'Instant access' },
              { icon: Users, text: '5M+ happy students' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                <Icon size={18} /> {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact Section ─── */}
      <section className="py-24 px-4 bg-white border-t border-slate-100">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            {/* Left Info */}
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500">Get In Touch</span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                  We'd Love to <span className="text-indigo-600">Hear</span> from You
                </h2>
                <p className="text-slate-500 text-lg font-medium leading-relaxed">
                  Have a question, a suggestion, or want to partner with us? Our team is always ready to help.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {[
                  { icon: Mail, label: 'Email Us', value: 'support@skillrise.edu', sub: 'We reply within 24 hours' },
                  { icon: Phone, label: 'Call Us', value: '+1 (800) SKILL-01', sub: 'Mon–Fri, 9am–6pm IST' },
                  { icon: MapPin, label: 'Our HQ', value: 'Bangalore, India', sub: 'Visit us by appointment' },
                  { icon: MessageCircle, label: 'Live Chat', value: 'Available 24/7', sub: 'Average wait under 2 min' },
                ].map(({ icon: Icon, label, value, sub }) => (
                  <div key={label} className="flex items-center gap-5 group">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon size={22} />
                    </div>
                    <div>
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400">{label}</span>
                      <p className="font-black text-slate-900">{value}</p>
                      <p className="text-xs text-slate-400 font-medium">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-slate-50 rounded-[3rem] p-10 md:p-14 border border-slate-100 shadow-sm">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center gap-6 py-16"
                  >
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={48} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2">Message Sent!</h3>
                      <p className="text-slate-500 font-medium">Thanks for reaching out. Our team will get back to you within 24 hours.</p>
                    </div>
                    <button onClick={() => setSent(false)} className="btn-primary px-8 py-3 rounded-2xl font-black flex items-center gap-2">
                      Send Another <Sparkles size={16} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    <h3 className="text-2xl font-black text-slate-900">Send us a Message</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                        <input 
                          required type="text" placeholder="John Doe"
                          value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                          className="px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all font-bold text-slate-800"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                        <input 
                          required type="email" placeholder="you@example.com"
                          value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                          className="px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all font-bold text-slate-800"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subject</label>
                      <select 
                        required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                        className="px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all font-bold text-slate-800 appearance-none"
                      >
                        <option value="">Select a topic...</option>
                        <option>General Inquiry</option>
                        <option>Technical Support</option>
                        <option>Business / Partnership</option>
                        <option>Billing & Payments</option>
                        <option>Become an Instructor</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message</label>
                      <textarea 
                        required rows={5} placeholder="Tell us more about your request..."
                        value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                        className="px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all font-bold text-slate-800 resize-none"
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
                      Send Message <ChevronRight size={22} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
