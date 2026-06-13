import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowLeft, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const InputWrapper = ({ icon: Icon, children, label }) => (
  <div className="relative group">
    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
    <div className="relative flex items-center">
      <div className="absolute left-3 text-slate-400 group-focus-within:text-brand-dark transition-colors">
        <Icon size={18} />
      </div>
      {children}
    </div>
  </div>
);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${API_URL}/api/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = "pl-10 block w-full rounded-xl border-slate-200 bg-slate-50/50 shadow-sm focus:border-brand-dark focus:bg-white focus:ring-4 focus:ring-brand-dark/10 sm:text-sm py-3 transition-all duration-200 outline-none border";

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 w-full h-96 bg-brand-dark rounded-b-[100px] shadow-2xl -z-10"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white py-10 px-6 sm:px-12 shadow-2xl shadow-brand-dark/10 rounded-3xl border border-slate-100">
          
          <div className="mb-8 text-center flex flex-col items-center">
            <div className="h-16 w-16 bg-brand-dark rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-brand-dark/30">
              <ShieldCheck className="text-brand-accent" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Portal</h2>
            <p className="mt-2 text-sm text-slate-500">Secure access for NayePankh staff only.</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            
            <InputWrapper icon={Mail} label="Admin Email">
              <input name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className={inputClasses} placeholder="admin@nayepankh.org" />
            </InputWrapper>

            <InputWrapper icon={Lock} label="Password">
              <input name="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className={inputClasses} placeholder="••••••••" />
            </InputWrapper>

            <div className="pt-2">
              <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-brand-dark hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-brand-dark/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed">
                {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
              </button>
            </div>
          </form>

          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 p-4 rounded-xl flex items-start space-x-3 bg-red-50 border border-red-100 text-red-800">
              <AlertCircle className="text-red-500 mt-0.5 shrink-0" size={18} />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

        </motion.div>

        <div className="mt-8 text-center">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to public site
            </Link>
        </div>
      </div>
    </div>
  );
}
