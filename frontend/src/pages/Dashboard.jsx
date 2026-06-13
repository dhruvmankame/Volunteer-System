import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Download, LogOut, Search, UserCheck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [volunteers, setVolunteers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const fetchVolunteers = useCallback(async (manualRefresh = false) => {
    if (manualRefresh) setIsRefreshing(true);
    try {
      const token = localStorage.getItem('token');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.get(`${API_URL}/api/volunteers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVolunteers(res.data);
    } catch (err) {
      navigate('/admin/login');
    } finally {
      setIsLoading(false);
      if (manualRefresh) setIsRefreshing(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchVolunteers();
  }, [fetchVolunteers]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const filteredVolunteers = volunteers.filter(v => 
    v.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-dark"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Navigation */}
      <nav className="bg-brand-dark text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <LayoutDashboard className="text-brand-accent" size={24} />
              <h1 className="text-xl font-bold tracking-tight">NayePankh Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center px-3 py-1 bg-white/10 rounded-full border border-white/20">
                <UserCheck size={16} className="mr-2 text-primary-400" />
                <span className="text-sm font-medium">{volunteers.length} Active Volunteers</span>
              </div>
              <button onClick={handleLogout} className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white hover:bg-white/10 transition-colors">
                <LogOut size={18} className="mr-2" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl font-extrabold text-slate-900 flex items-center">
              <Users className="mr-3 text-primary-500" size={32} /> Volunteer Database
            </h2>
            <p className="mt-2 text-sm text-slate-500">Manage and export your organization's volunteer registrations.</p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
             <button 
                onClick={() => fetchVolunteers(true)} 
                disabled={isRefreshing}
                className="inline-flex items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
             >
                <RefreshCw size={18} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} /> 
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
             </button>
             <CSVLink data={volunteers} filename="nayepankh_volunteers.csv" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-semibold rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-500/30 transition-all duration-200">
                <Download size={18} className="mr-2" /> Export Data
             </CSVLink>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center">
            <Search className="text-slate-400 ml-2 mr-3" size={20} />
            <input 
                type="text" 
                placeholder="Search volunteers by name, email, or skills..." 
                className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Data Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white shadow-xl shadow-slate-200/40 rounded-2xl overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Candidate Info</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Details</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Expertise / Skills</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Availability</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Registered</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredVolunteers.length > 0 ? (
                    filteredVolunteers.map((v) => (
                    <tr key={v._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-lg">
                                    {v.fullName.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-bold text-slate-900">{v.fullName}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-900 font-medium">{v.email}</div>
                            <div className="text-sm text-slate-500">{v.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="text-sm text-slate-600 max-w-xs truncate">{v.skills}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-full border ${v.availability === 'Weekends' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : v.availability === 'Weekdays' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'}`}>
                            {v.availability}
                        </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">
                            {new Date(v.registeredAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center justify-center text-slate-400">
                                <Search size={48} className="mb-4 text-slate-300" />
                                <p className="text-lg font-medium text-slate-600">No volunteers found</p>
                                <p className="text-sm">Try adjusting your search terms.</p>
                            </div>
                        </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
