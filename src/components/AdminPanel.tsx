import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Lock, 
  LogOut, 
  Users, 
  BookOpen, 
  TrendingUp,
  Settings,
  X
} from 'lucide-react';
import { AdminView } from './AdminView';

interface LayoutConfig {
  sections: {
    hero: boolean;
    who: boolean;
    courses: boolean;
    method: boolean;
    comparison: boolean;
    pricing: boolean;
    how: boolean;
    schedule: boolean;
    booking: boolean;
    about: boolean;
    faq: boolean;
    cta: boolean;
  };
  images: {
    mentor: string;
    heroBg?: string;
    methodVideo?: string;
    methodPoster?: string;
  };
  availability: {
    clarityCalls: boolean[];
    mentorshipSessions: boolean[];
  };
  content: {
    skillPaths: string[];
    timeSlots: string[];
  };
}

interface AdminPanelProps {
  onClose: () => void;
  config: LayoutConfig;
  onUpdate: (newConfig: LayoutConfig) => void;
}

const DEFAULT_LAYOUT: LayoutConfig = {
  sections: {
    hero: true,
    who: true,
    courses: true,
    method: true,
    comparison: true,
    pricing: true,
    how: true,
    schedule: true,
    booking: true,
    about: true,
    faq: true,
    cta: true,
  },
  images: {
    mentor: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800&h=800",
    heroBg: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1920&h=1080",
    methodVideo: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4",
    methodPoster: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
  },
  availability: {
    clarityCalls: [true, true],
    mentorshipSessions: [true, true],
  },
  content: {
    skillPaths: ["Web Development", "UI/UX Design", "Digital Marketing", "Mobile App Dev", "Data Science", "Cloud Computing"],
    timeSlots: ["Morning (10 AM - 2 PM)", "Evening (6 PM - 10 PM)"]
  }
};

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, config, onUpdate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<{ totalStudents: number; activeCourses: number } | null>(null);
  const [view, setView] = useState<'dashboard' | 'settings'>('dashboard');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsLoggedIn(true);
        fetchStats();
      } else {
        setError(data.message || 'Invalid password');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsLoggedIn(false);
    setPassword('');
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="bg-brand-blue p-8 text-center text-white relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-bold">Admin Access</h2>
            <p className="text-blue-100 text-sm mt-2">Enter your secret key to continue</p>
          </div>
          
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Secret Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                  autoFocus
                />
              </div>
              {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? 'Verifying...' : 'Unlock Dashboard'}
            </button>
            
            <p className="text-center text-xs text-gray-400">
              This is a temporary protection layer for Mentor Arena.
            </p>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-50 z-[100] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center">
            <Shield className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-xs text-brand-green font-medium">Live Protection Active</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="flex bg-gray-100 p-1 rounded-xl">
            <button 
              onClick={() => setView('dashboard')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'dashboard' ? 'bg-white text-brand-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Stats
            </button>
            <button 
              onClick={() => setView('settings')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'settings' ? 'bg-white text-brand-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Settings
            </button>
          </nav>
          <div className="w-px h-6 bg-gray-200 mx-2"></div>
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-all"
          >
            Exit to Site
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-bold transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      {/* Content */}
      {view === 'dashboard' ? (
        <main className="flex-grow overflow-y-auto p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Students</p>
                    <h3 className="text-2xl font-bold text-gray-900">{stats?.totalStudents || 0}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-brand-green font-medium">
                  <TrendingUp size={14} /> +2 this week
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Active Courses</p>
                    <h3 className="text-2xl font-bold text-gray-900">{stats?.activeCourses || 0}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                  Stable performance
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                    <Settings size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">System Status</p>
                    <h3 className="text-2xl font-bold text-gray-900">Healthy</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-brand-blue font-medium">
                  Node.js Hostinger Active
                </div>
              </div>
            </div>

            {/* Management Section */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">System Overview</h2>
                <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-medium">Read Only</span>
              </div>
              
              <div className="p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-800">Recent Activity</h3>
                    <div className="space-y-3">
                      {[
                        { action: "New Booking", time: "2 hours ago", student: "Ali Khan" },
                        { action: "Syllabus Download", time: "5 hours ago", student: "Sara Ahmed" },
                        { action: "Clarity Call Booked", time: "Yesterday", student: "Zainab Bibi" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <p className="text-sm font-bold text-gray-800">{item.action}</p>
                            <p className="text-xs text-gray-500">{item.student}</p>
                          </div>
                          <span className="text-[10px] text-gray-400 font-medium">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-800">Security Log</h3>
                    <div className="p-6 bg-brand-blue/5 rounded-2xl border border-brand-blue/10">
                      <p className="text-sm text-brand-blue/80 leading-relaxed">
                        Your admin session is valid for 24 hours. All changes made in the settings tab are immediately reflected on the live site.
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-xs font-bold text-brand-blue">
                        <Shield size={14} /> IP: 182.180.xxx.xxx (Karachi)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <AdminView 
          onBack={() => setView('dashboard')} 
          config={config} 
          onUpdate={onUpdate}
          defaultLayout={DEFAULT_LAYOUT}
        />
      )}
    </div>
  );
};
