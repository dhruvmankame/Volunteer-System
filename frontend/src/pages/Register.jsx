import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Heart, User, Mail, Phone, BookOpen, Clock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const InputWrapper = ({ icon: Icon, children, label }) => (
  <div className="relative group">
    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
    <div className="relative flex items-center">
      <div className="absolute left-3 text-slate-400 group-focus-within:text-primary-600 transition-colors">
        <Icon size={18} />
      </div>
      {children}
    </div>
  </div>
);

export default function Register() {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', skills: '', availability: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Email Domain Validation
    const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
    const emailParts = formData.email.split('@');
    if (emailParts.length !== 2 || !allowedDomains.includes(emailParts[1].toLowerCase())) {
      setStatus({ type: 'error', message: 'Please use a common email provider (e.g., @gmail.com, @yahoo.com).' });
      return;
    }

    // 2. Phone Number Validation
    if (formData.phone.length !== 10) {
      setStatus({ type: 'error', message: 'Phone number must be exactly 10 digits.' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: '', message: '' });
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post(`${API_URL}/api/register`, formData);
      setStatus({ type: 'success', message: 'Welcome to the team! Your application has been received.' });
      setFormData({ fullName: '', email: '', phone: '', skills: '', availability: '' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Oops! Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = "pl-10 block w-full rounded-xl border-slate-200 bg-slate-50/50 shadow-sm focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 sm:text-sm py-3 transition-all duration-200 outline-none border";

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white selection:bg-primary-500 selection:text-white">
      
      {/* Left Column - Hero/Brand Section */}
      <div className="md:w-5/12 bg-brand-dark flex flex-col justify-between p-8 md:p-12 lg:p-16 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-12 -right-24 w-80 h-80 bg-brand-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-white mb-16">
            <Heart className="text-primary-500" fill="currentColor" size={28} />
            <span className="text-xl font-bold tracking-tight">NayePankh Foundation</span>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Be the change <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-300">
                you wish to see.
              </span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-md">
              Join our community of passionate volunteers. Dedicate your time, share your skills, and help us empower the underprivileged.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 mt-12 md:mt-0 flex items-center space-x-4">
          <div className="flex -space-x-3">
            <img className="w-10 h-10 rounded-full border-2 border-brand-dark" src="https://i.pravatar.cc/100?img=1" alt="Volunteer" />
            <img className="w-10 h-10 rounded-full border-2 border-brand-dark" src="https://i.pravatar.cc/100?img=2" alt="Volunteer" />
            <img className="w-10 h-10 rounded-full border-2 border-brand-dark" src="https://i.pravatar.cc/100?img=3" alt="Volunteer" />
          </div>
          <p className="text-sm font-medium text-slate-400">Join 500+ volunteers nationwide</p>
        </div>
      </div>

      {/* Right Column - Form Section */}
      <div className="md:w-7/12 flex items-center justify-center p-8 md:p-12 bg-slate-50/50">
        <div className="w-full max-w-xl">
          
          <div className="mb-10 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Apply to Volunteer</h2>
              <p className="mt-2 text-slate-500">Fill out the form below and we'll get in touch.</p>
            </div>
            <Link to="/admin/login" className="hidden sm:flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 px-4 py-2 rounded-full transition-colors">
              Admin Portal <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-8 border border-slate-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputWrapper icon={User} label="Full Name">
                  <input name="fullName" type="text" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className={inputClasses} placeholder="John Doe" />
                </InputWrapper>

                <InputWrapper icon={Mail} label="Email Address">
                  <input name="email" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className={inputClasses} placeholder="john@example.com" />
                </InputWrapper>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputWrapper icon={Phone} label="Phone Number">
                  <input 
                    name="phone" 
                    type="tel" 
                    required 
                    value={formData.phone} 
                    onChange={e => {
                      const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                      if (onlyNums.length <= 10) {
                        setFormData({...formData, phone: onlyNums});
                      }
                    }} 
                    className={inputClasses} 
                    placeholder="9876543210" 
                    maxLength="10"
                    pattern="\d{10}"
                    title="Please enter exactly 10 digits"
                  />
                </InputWrapper>

                <InputWrapper icon={Clock} label="Availability">
                  <select name="availability" required value={formData.availability} onChange={e => setFormData({...formData, availability: e.target.value})} className={`${inputClasses} appearance-none cursor-pointer`}>
                    <option value="" disabled>Select time...</option>
                    <option value="Weekends">Weekends Only</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Flexible">Flexible / Anytime</option>
                  </select>
                </InputWrapper>
              </div>

              <InputWrapper icon={BookOpen} label="Your Skills / Expertise">
                <input name="skills" type="text" required value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className={inputClasses} placeholder="E.g., Content Writing, Teaching Math, Graphic Design..." />
              </InputWrapper>

              <div className="pt-2">
                <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-md shadow-primary-500/30 text-base font-bold text-white bg-primary-600 hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-primary-500/50 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                  {isLoading ? (
                    <span className="flex items-center"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...</span>
                  ) : 'Submit Application'}
                </button>
              </div>
            </form>

            {status.message && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-6 p-4 rounded-xl flex items-start space-x-3 ${status.type === 'success' ? 'bg-primary-50 border border-primary-100 text-primary-800' : 'bg-red-50 border border-red-100 text-red-800'}`}>
                {status.type === 'success' ? <CheckCircle className="text-primary-500 mt-0.5 shrink-0" size={18} /> : <AlertCircle className="text-red-500 mt-0.5 shrink-0" size={18} />}
                <p className="text-sm font-medium">{status.message}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Mobile Admin Link */}
          <div className="mt-8 text-center sm:hidden">
            <Link to="/admin/login" className="text-sm font-medium text-slate-500 hover:text-primary-600 transition-colors">
              Access Admin Portal
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
