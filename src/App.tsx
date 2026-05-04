import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Users, 
  BookOpen, 
  Zap, 
  CheckCircle, 
  MessageSquare, 
  ArrowRight, 
  Menu, 
  X,
  Clock,
  Wallet,
  Calendar,
  User,
  Award,
  HelpCircle,
  LayoutDashboard,
  Mail,
  Edit3,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Download,
  FileText,
  Linkedin,
  Star,
  ExternalLink,
  Facebook,
  Instagram,
  Twitter as TwitterIcon,
  Globe,
  Cpu,
  Target,
  Lock,
  LogOut,
  ChevronRight,
  GraduationCap,
  Settings
} from 'lucide-react';
// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';
import { 
  BUSINESS_INFO, 
  PRICING, 
  SKILL_PATHS, 
  TIME_SLOTS, 
  COMPARISON_DATA, 
  FAQ_DATA, 
  DAILY_SCHEDULE, 
  COURSE_DETAILS,
  CURRICULUM_FRAMEWORK
} from './constants';
// import { AdminPanel } from './components/AdminPanel';

// Lazy load large components for performance
const AdminPanel = React.lazy(() => import('./components/AdminPanel').then(module => ({ default: module.AdminPanel })));

// --- Types & Defaults ---

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
    guestMentor?: string;
    caseStudy?: string;
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
    mentor: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=800&h=800",
    guestMentor: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800&h=800",
    caseStudy: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=800",
    heroBg: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=70&w=1920",
    methodVideo: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4",
    methodPoster: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
  },
  availability: {
    clarityCalls: [true, true],
    mentorshipSessions: [true, true],
  },
  content: {
    skillPaths: [...SKILL_PATHS],
    timeSlots: [...TIME_SLOTS]
  }
};

// --- Components ---

const CurriculumModule = ({ id, title, description, outcome, icon: IconName }: any) => {
  const Icon = { Globe, Cpu, Target }[IconName] || Globe;
  
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group">
      <div className="flex items-start gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/20 font-mono text-xs font-bold uppercase tracking-widest">{id}</span>
          <div className="w-px h-12 bg-gradient-to-b from-brand-green to-transparent opacity-30"></div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:scale-110 transition-transform">
              <Icon size={20} />
            </div>
            <h4 className="text-xl font-bold text-white tracking-tight">{title}</h4>
          </div>
          <p className="text-white/60 mb-6 text-sm leading-relaxed">{description}</p>
          <div className="pt-6 border-t border-white/5">
            <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest block mb-2 opacity-50">Outcome</span>
            <p className="text-white font-medium text-sm italic">"{outcome}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExecutiveFramework = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
    {CURRICULUM_FRAMEWORK.pillars.map((pillar: any) => (
      <div key={pillar.id} className="relative group">
        <div className="absolute inset-0 bg-brand-green/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative border-l border-white/10 pl-8 py-4">
          <span className="text-[10px] font-bold text-brand-green tracking-[0.3rem] uppercase block mb-4">
            {pillar.focus}
          </span>
          <h3 className="text-3xl font-bold text-white mb-4 tracking-tighter">{pillar.title}</h3>
          <p className="text-white/40 text-sm leading-relaxed">{pillar.description}</p>
        </div>
      </div>
    ))}
  </div>
);

const AuthoritySyllabus = () => (
  <section id="curriculum" className="py-24 px-4 bg-gray-950 relative overflow-hidden">
    {/* Background Decorative Elements */}
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-brand-blue/10 to-transparent opacity-50 pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-brand-green/10 to-transparent opacity-50 pointer-events-none"></div>
    
    <div className="max-w-7xl mx-auto relative">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/10 rounded-full border border-brand-green/20 text-brand-green text-[10px] font-bold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
            Professional Curriculum
          </div>
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">The Executive Framework</h2>
          <p className="text-white/50 text-lg">We don't just teach tools. We build the <span className="text-white font-semibold">Operator Mindset</span> needed to lead in the age of AI.</p>
        </div>
        
        <div className="hidden lg:block h-px flex-1 bg-gradient-to-r from-brand-green/20 to-transparent mx-12 mb-6"></div>
      </div>

      <ExecutiveFramework />

      <div className="mb-12 flex items-center gap-4">
        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.5rem]">Deep Dive Modules</h3>
        <div className="h-px flex-1 bg-white/10"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {CURRICULUM_FRAMEWORK.modules.map((module: any) => (
          <CurriculumModule key={module.id} {...module} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="p-1 px-1 bg-white/5 border border-white/10 rounded-3xl inline-flex items-center gap-4 group hover:bg-white/10 transition-all">
          <div className="px-6 py-4">
            <p className="text-white/60 text-sm italic">Want the full 24-module roadmap?</p>
          </div>
          <button className="bg-brand-green text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 group-hover:shadow-lg shadow-brand-green/20 transition-all">
            <Download size={20} /> Get Full Syllabus
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Navbar = ({ onAdminClick, onLoginClick, onLogout, user }: { onAdminClick: () => void, onLoginClick: () => void, onLogout: () => void, user: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <a href="#" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-brand-blue/20 overflow-hidden">
              <img src="input_file_0.png" alt="M" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-bold text-brand-blue tracking-tighter">Mentor <span className="text-brand-green">Arena</span></span>
              <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Executive AI Academy</span>
            </div>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#curriculum" className="text-gray-600 hover:text-brand-blue transition-colors font-medium text-sm">Curriculum</a>
            <a href="#courses" className="text-gray-600 hover:text-brand-blue transition-colors font-medium text-sm">Paths</a>
            <a href="#pricing" className="text-gray-600 hover:text-brand-blue transition-colors font-medium text-sm">Pricing</a>
            
            <div className="h-4 w-px bg-gray-200"></div>

            {!user ? (
              <button 
                onClick={onLoginClick}
                className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-brand-blue transition-colors"
              >
                <User size={18} /> Student Login
              </button>
            ) : (
              <div className="flex items-center gap-4">
                {user.role === 'admin' && (
                  <button 
                    onClick={onAdminClick}
                    className="flex items-center gap-2 text-xs font-bold text-brand-blue bg-brand-blue/5 px-3 py-1 rounded-full border border-brand-blue/20 hover:bg-brand-blue/10 transition-colors"
                  >
                    <Settings size={14} /> Manage Site
                  </button>
                )}
                <span className="text-xs font-bold text-brand-green bg-brand-green/5 px-3 py-1 rounded-full border border-brand-green/20">
                  {user.role === 'admin' ? 'SuperAdmin' : 'Student'}
                </span>
                <button 
                  onClick={onLogout}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}

            <a href="#booking" className="bg-brand-blue text-white px-8 py-3 rounded-xl hover:bg-brand-blue/90 transition-all shadow-xl shadow-brand-blue/10 font-bold text-sm">
              Join Arena
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-6 pt-2 pb-8 space-y-4">
              <a href="#curriculum" onClick={() => setIsOpen(false)} className="block py-2 text-gray-600 font-medium">Curriculum</a>
              <a href="#courses" onClick={() => setIsOpen(false)} className="block py-2 text-gray-600 font-medium">Skill Paths</a>
              <a href="#pricing" onClick={() => setIsOpen(false)} className="block py-2 text-gray-600 font-medium">Pricing</a>
              {!user ? (
                <button onClick={() => { setIsOpen(false); onLoginClick(); }} className="block w-full text-left py-2 text-brand-blue font-bold">Student Login</button>
              ) : (
                <button onClick={() => { setIsOpen(false); onLogout(); }} className="block w-full text-left py-2 text-red-500 font-bold">Logout</button>
              )}
              <a href="#booking" onClick={() => setIsOpen(false)} className="block py-4 bg-brand-blue text-white rounded-xl text-center font-bold">Join Arena Now</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroSection = ({ heroBg, onLoginClick, onAdminClick, user }: { heroBg?: string, onLoginClick: () => void, onAdminClick: () => void, user: any }) => (
  <section className="pt-32 pb-20 px-4 relative overflow-hidden">
    {/* ... (rest of background stuff) ... */}
    <div className="max-w-7xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-brand-blue bg-brand-blue/5 rounded-full border border-brand-blue/10 uppercase tracking-widest">
           {user ? `Welcome back, ${user.name}` : 'Premium Digital Mentorship in Pakistan'}
        </span>
        
        {/* ... (google badge) ... */}
        {/* Simplified for replacement target */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.1]">
          1-to-1 Digital Skills Mentorship in Pakistan: <br />
          <span className="text-brand-blue relative inline-block">
            Master Web Development, SEO, and Digital Marketing
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop watching endless tutorials that lead nowhere. Get personalized, project-based coaching to build a career you own.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!user ? (
            <button 
              onClick={onLoginClick}
              className="px-8 py-4 bg-brand-green text-white rounded-xl font-bold hover:bg-brand-green/90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-green/20"
            >
              <GraduationCap size={20} /> Access Student Portal
            </button>
          ) : user.role === 'admin' ? (
            <button 
              onClick={onAdminClick}
              className="px-8 py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue/90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-blue/20"
            >
              <Settings size={20} /> Site Management
            </button>
          ) : (
             <a href="#curriculum" className="px-8 py-4 bg-brand-green text-white rounded-xl font-bold hover:bg-brand-green/90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-green/20">
              <LayoutDashboard size={20} /> Student Dashboard
            </a>
          )}
          <a href="#booking" className="px-8 py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue/90 transition-all flex items-center justify-center gap-2">
            Book Clarity Call <ArrowRight size={20} />
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const WhoThisIsFor = () => (
  <section className="py-20 bg-gray-50 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Who This Is For</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Mentor Arena is designed for ambitious Pakistanis who have the "raw power" but need a clear channel to succeed.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: Users, title: "University Students", desc: "Gain the practical, high-demand skills that your degree doesn't teach." },
          { icon: Award, title: "Fresh Graduates", desc: "Bridge the gap between your education and a high-paying digital job." },
          { icon: Zap, title: "Career Switchers", desc: "Move from a dead-end job into the fast-growing digital economy." },
          { icon: BookOpen, title: "Self-Taught Learners", desc: "If you are struggling with direction and \"tutorial hell,\" we provide the roadmap." }
        ].map((item, i) => (
          <div key={i} className="floating-card p-8">
            <item.icon className="text-brand-blue mb-6 w-10 h-10" />
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SyllabusDownload = () => {
  const [email, setEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const saveLead = async (data: any) => {
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error('Failed to save lead:', err);
    }
  };

  const generatePDF = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Dynamic imports for heavy libraries to improve initial load time
      const { jsPDF } = await import('jspdf');
      const { default: autoTable } = await import('jspdf-autotable');
      
      const getBase64 = async (url: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      };
      
      const logoBase64 = await getBase64('input_file_0.png').catch(() => null);
      
      const doc = new jsPDF();
    
    const addThemeBlocks = (pdf: any) => {
      pdf.setFillColor(76, 175, 80); // Brand Green
      pdf.rect(0, 0, 4, 297, 'F');
      pdf.setFillColor(26, 74, 124); // Brand Blue
      pdf.rect(0, 0, 210, 45, 'F');
      
      if (logoBase64) {
        pdf.addImage(logoBase64, 'PNG', 20, 12, 12, 12);
      } else {
        pdf.setFillColor(76, 175, 80); // Brand Green
        pdf.rect(20, 12, 12, 12, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('M', 26, 21, { align: 'center' });
      }
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(22);
      pdf.setFont('helvetica', 'bold');
      pdf.text('MENTOR ARENA', 38, 22);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Premium Digital Mentorship in Pakistan', 38, 30);
    };

    // --- PAGE 1: COVER PAGE ---
    addThemeBlocks(doc);
    let yPos = 100;
    doc.setTextColor(26, 74, 124);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    const title = doc.splitTextToSize('Mentor Arena – 6-Month Digital Skills Mentorship Syllabus', 160);
    doc.text(title, 20, yPos);
    yPos += (title.length * 12) + 10;

    doc.setFontSize(18);
    doc.setTextColor(76, 175, 80);
    doc.text('Web Development · SEO · Content & Digital Marketing', 20, yPos);
    yPos += 20;

    doc.setFontSize(14);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'italic');
    const promise = doc.splitTextToSize('“A practical, project-based path to your first real portfolio and digital income skills.”', 160);
    doc.text(promise, 20, yPos);
    yPos += 30;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text(`Mentored by ${BUSINESS_INFO.accountHolder}`, 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text('Based in Karachi, mentoring students across Pakistan (online only).', 20, yPos + 7);
    
    doc.text(`Year: 2026`, 20, 270);

    // --- PAGE 2: OVERVIEW ---
    doc.addPage();
    addThemeBlocks(doc);
    yPos = 60;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('What This Program Is', 20, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const whatIs = [
      '• 1-to-1 or small-batch live mentorship (max 3 students).',
      '• Entirely project-based: you build while you learn.',
      '• 6-month intensive duration with 120–150+ live hours.',
      '• Focused on real-world skills that the digital economy actually pays for.'
    ];
    whatIs.forEach(line => {
      doc.text(line, 25, yPos);
      yPos += 7;
    });
    yPos += 5;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('Who This Is For', 20, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const whoIs = [
      '• University students wanting practical skills alongside their degree.',
      '• Fresh graduates struggling to find work due to lack of experience.',
      '• Career switchers looking to enter the tech or digital marketing space.',
      '• Self-taught learners who feel stuck and need professional direction.',
      '• Anyone in Pakistan wanting to earn in USD through global remote work.'
    ];
    whoIs.forEach(line => {
      doc.text(line, 25, yPos);
      yPos += 7;
    });
    yPos += 5;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('By the End, You Will', 20, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const outcomes = [
      '• Have a professional portfolio with at least 3 real-world projects.',
      '• Master industry-standard tools (VS Code, React, Search Console, etc.).',
      '• Understand how to find, pitch, and manage freelance or remote clients.',
      '• Possess the confidence to solve technical problems independently.',
      '• Have a clear roadmap for your specific digital career path.'
    ];
    outcomes.forEach(line => {
      doc.text(line, 25, yPos);
      yPos += 7;
    });
    yPos += 5;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('Weekly Time Commitment', 20, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const commitment = doc.splitTextToSize('Expect to spend 10–15 hours per week. This includes 4–6 hours of live mentorship sessions and 6–10 hours of independent practice and project work. Consistency is the only secret to success here.', 160);
    doc.text(commitment, 20, yPos);
    yPos += (commitment.length * 5) + 10;

    // --- PAGE 3: WHAT IT IS NOT & PREREQUISITES ---
    doc.addPage();
    addThemeBlocks(doc);
    yPos = 60;

    doc.setFillColor(255, 240, 240);
    doc.rect(20, yPos, 170, 45, 'F');
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(200, 0, 0);
    doc.text('What This Program Is NOT', 25, yPos + 10);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const isNot = [
      '• Not a get-rich-quick scheme or "magic" button.',
      '• Not a pre-recorded video course (it is 100% live).',
      '• Not a guaranteed job placement agency.',
      '• Not for people who won’t practice outside of live sessions.'
    ];
    isNot.forEach((line, i) => {
      doc.text(line, 30, yPos + 20 + (i * 6));
    });
    yPos += 55;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('Prerequisites', 20, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const prereqs = [
      '• Basic understanding of English (to read documentation).',
      '• A working laptop (minimum 8GB RAM recommended).',
      '• A stable internet connection for live video calls.',
      '• Willingness to practice at least 10 hours per week.',
      '• An open mind and a thick skin for honest feedback.'
    ];
    prereqs.forEach(line => {
      doc.text(line, 25, yPos);
      yPos += 7;
    });
    yPos += 15;

    // --- PAGE 4+: PROGRAM STRUCTURE (PHASES) ---
    doc.addPage();
    addThemeBlocks(doc);
    yPos = 60;

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Program Structure (6-Month Roadmap)', 20, yPos);
    yPos += 15;

    const phases = [
      {
        title: 'Phase 1: Foundations & Digital Literacy',
        duration: 'Weeks 1–4',
        topics: ['Internet fundamentals', 'How search engines work', 'Basic HTML/CSS', 'Setting up a professional environment'],
        practice: ['Building your first static page', 'Setting up GitHub', 'Keyword research basics'],
        outcome: 'A live, personal landing page and a professional digital setup.'
      },
      {
        title: 'Phase 2: Web Development Essentials',
        duration: 'Weeks 5–12',
        topics: ['Advanced CSS & Flexbox', 'JavaScript Fundamentals', 'React.js Basics', 'Responsive Design'],
        practice: ['Coding interactive components', 'Cloning a popular UI', 'Debugging real errors'],
        outcome: 'A fully responsive, multi-page website built from scratch.'
      },
      {
        title: 'Phase 3: SEO & Content Strategy',
        duration: 'Weeks 13–18',
        topics: ['Technical SEO audits', 'On-page optimization', 'Content SILO structures', 'Backlink strategies'],
        practice: ['Optimizing a live site', 'Writing SEO-ready articles', 'Using Search Console'],
        outcome: 'A documented SEO strategy and 3 optimized articles ranking for specific keywords.'
      },
      {
        title: 'Phase 4: Marketing Automation & Freelancing',
        duration: 'Weeks 19–24',
        topics: ['Email marketing funnels', 'Zapier/Automation', 'Portfolio building', 'Freelance platform mastery'],
        practice: ['Setting up an automated funnel', 'Optimizing LinkedIn/Upwork', 'Mock client pitching'],
        outcome: 'A complete professional portfolio and a ready-to-launch freelance profile.'
      }
    ];

    phases.forEach((phase, i) => {
      if (yPos > 220) {
        doc.addPage();
        addThemeBlocks(doc);
        yPos = 60;
      }

      doc.setFillColor(245, 247, 250);
      doc.rect(20, yPos - 6, 170, 8, 'F');
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(26, 74, 124);
      doc.text(`${phase.title} (${phase.duration})`, 24, yPos);
      yPos += 10;

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Topics Covered:', 25, yPos);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      doc.text(phase.topics.join(', '), 55, yPos);
      yPos += 7;

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Practice:', 25, yPos);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      doc.text(phase.practice.join(' • '), 45, yPos);
      yPos += 7;

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(76, 175, 80);
      doc.text('Project Outcome:', 25, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(phase.outcome, 55, yPos);
      yPos += 15;
    });

    // --- PAGE: HOW IT WORKS & EXPECTATIONS ---
    doc.addPage();
    addThemeBlocks(doc);
    yPos = 60;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('How Mentorship Works', 20, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const howWorks = [
      '• Live 1-to-1 or small-batch sessions via Google Meet/Zoom.',
      '• Direct feedback on every assignment you submit.',
      '• Weekly accountability check-ins to ensure you aren’t falling behind.',
      '• 24/7 access to a private WhatsApp group for quick questions.',
      '• We adjust the pace based on your speed—no one gets left behind.',
      '• Real-world simulations: we treat your projects like real client work.'
    ];
    howWorks.forEach(line => {
      doc.text(line, 25, yPos);
      yPos += 7;
    });
    yPos += 10;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('Student Expectations', 20, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const studentExpect = [
      '• Show up on time for every live session.',
      '• Complete assignments before the deadline.',
      '• Be proactive: ask questions when you are stuck.',
      '• Be honest about your struggles so we can help.',
      '• Respect the mentor’s time and the learning process.'
    ];
    studentExpect.forEach(line => {
      doc.text(line, 25, yPos);
      yPos += 7;
    });

    // --- PAGE: FAQ ---
    doc.addPage();
    addThemeBlocks(doc);
    yPos = 60;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('Frequently Asked Questions', 20, yPos);
    yPos += 12;

    const faqs = [
      { q: 'Is this beginner-friendly?', a: 'Yes. We start from the absolute basics of how the internet works.' },
      { q: 'What if I miss a session?', a: 'Since it’s 1-to-1, we can reschedule. However, frequent misses are discouraged.' },
      { q: 'Do I need to know coding before starting?', a: 'No. We will teach you everything you need to know from scratch.' },
      { q: 'Can I focus more on SEO or Web Dev?', a: 'Yes. The mentorship is personalized to your career goals.' },
      { q: 'Will I get help with my portfolio or CV?', a: 'Absolutely. Building your portfolio is a core part of the final phase.' }
    ];

    faqs.forEach(faq => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      const qText = doc.splitTextToSize(`Q: ${faq.q}`, 160);
      doc.text(qText, 20, yPos);
      yPos += (qText.length * 5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      const aText = doc.splitTextToSize(`A: ${faq.a}`, 160);
      doc.text(aText, 20, yPos);
      yPos += (aText.length * 5) + 5;
    });

    // --- PAGE: FINAL CTA ---
    doc.addPage();
    addThemeBlocks(doc);
    yPos = 100;

    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 74, 124);
    doc.text('Ready to Start?', 20, yPos);
    yPos += 15;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    const finalCta = doc.splitTextToSize('If this syllabus feels right for you, the next step is to book a clarity call. We will discuss your goals, answer your questions, and see if we are a good fit for each other.', 160);
    doc.text(finalCta, 20, yPos);
    yPos += (finalCta.length * 6) + 20;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(76, 175, 80);
    doc.text('[Visit mentorarena.online to book your clarity call]', 20, yPos);
    yPos += 20;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Note: Policies (Privacy, Terms, Refunds) are available on the website.', 20, yPos);

    // Footer for all pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFillColor(26, 74, 124);
      doc.rect(0, 287, 210, 10, 'F');
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text('© Mentor Arena - Karachi, Pakistan. All rights reserved.', 105, 293, { align: 'center' });
      doc.text(`Page ${i} of ${pageCount}`, 190, 293, { align: 'right' });
    }

      doc.save('Mentor-Arena-Syllabus.pdf');
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
      setShowForm(false);
      setEmail('');
    }
    
    // Save lead
    saveLead({ type: 'syllabus_download', email });
  };

  return (
    <div className="mt-12 text-center">
      {!showForm ? (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-brand-green text-brand-green rounded-xl font-bold hover:bg-brand-green/5 transition-all"
          >
            <Download size={20} /> Download PDF Syllabus
          </button>
          
          <a 
            href="https://mentor-arena-course-outline.vercel.app" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue/90 transition-all shadow-xl shadow-brand-blue/20 group"
          >
            <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" /> 
            <span>View Interactive Course Outline</span>
            <div className="ml-2 px-2 py-0.5 bg-brand-green text-[10px] rounded-full text-white animate-pulse">LIVE</div>
          </a>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-white p-6 rounded-2xl border border-brand-blue/10 shadow-xl"
        >
          <h4 className="font-bold text-gray-900 mb-4">Enter your email to download</h4>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none"
            />
            <button 
              onClick={generatePDF}
              disabled={isGenerating}
              className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue/90 disabled:opacity-50"
            >
              {isGenerating ? '...' : 'Download'}
            </button>
          </div>
          <button 
            onClick={() => setShowForm(false)}
            className="mt-4 text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Cancel
          </button>
        </motion.div>
      )}
    </div>
  );
};

const CoursesOffered = ({ paths }: { paths: string[] }) => (
  <section id="courses" className="py-20 px-4 relative overflow-hidden">
    {/* Decorative Live Line (matches Interactive Course Outline aesthetic) */}
    <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-brand-green to-transparent opacity-20 hidden lg:block"></div>
    <div className="absolute left-8 top-1/2 -rotate-90 origin-left text-[10px] font-bold tracking-[0.5rem] uppercase text-brand-green/30 hidden lg:block">
      Curriculum Framework
    </div>

    <div className="max-w-7xl mx-auto relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Project-Based Skill Paths</h2>
        <p className="text-gray-600">We don’t just teach you how to use software; we teach you how to build a digital business.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { 
            title: "Full-Stack Web Development", 
            build: "A complete, working web application from scratch.",
            how: "Live 1-to-1 sessions where we code together. You learn logic, database management, and modern design.",
            outcome: "A live URL you can show to any employer or client globally."
          },
          { 
            title: "Search Engine Optimization (SEO)", 
            build: "A ranking strategy for a real website.",
            how: "We dive into keyword research, technical audits, and content that Google loves.",
            outcome: "The ability to drive organic traffic and prove your value with real data."
          },
          { 
            title: "Digital Marketing & UI/UX", 
            build: "A full marketing funnel and user-friendly interface.",
            how: "Learn to design for the user and run ad campaigns that actually convert.",
            outcome: "A portfolio showing you can handle a brand’s digital presence from start to finish."
          }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all"
          >
            <h3 className="text-xl font-bold text-brand-blue mb-4">{item.title}</h3>
            <div className="space-y-4 text-sm">
              <p><span className="font-bold text-gray-900">What you build:</span> <span className="text-gray-600">{item.build}</span></p>
              <p><span className="font-bold text-gray-900">How it works:</span> <span className="text-gray-600">{item.how}</span></p>
              <p><span className="font-bold text-gray-900">The outcome:</span> <span className="text-gray-600">{item.outcome}</span></p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <SyllabusDownload />
    </div>
  </section>
);

const MethodSection = ({ videoUrl, posterUrl }: { videoUrl?: string, posterUrl?: string }) => (
  <section id="method" className="py-20 bg-brand-blue text-white px-4 overflow-hidden relative">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">The "Real-World" Mentorship Method</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brand-green rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2">1-to-1 Guidance</h3>
                <p className="text-blue-50">You aren't just a number in a crowded Zoom room. It’s just you and your mentor, focused entirely on your progress.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brand-green rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Project-First Learning</h3>
                <p className="text-blue-50">We explain the theory while we build your project. No boring long lectures—just immediate application.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brand-green rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Constant Feedback</h3>
                <p className="text-blue-50">Every line of code or piece of content you write gets reviewed immediately. You learn the right way from day one.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brand-green rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Real Accountability</h3>
                <p className="text-blue-50">We set milestones together. If you get stuck, your mentor is there to pull you through and keep you on track.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20">
          {videoUrl ? (
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
              <video 
                src={videoUrl} 
                poster={posterUrl}
                className="w-full h-full object-cover" 
                controls 
                autoPlay 
                muted 
                loop 
                playsInline
                preload="metadata"
              />
            </div>
          ) : (
            <div className="aspect-video bg-brand-blue/50 rounded-xl flex items-center justify-center italic text-blue-50 text-center px-6">
              "Mentor Arena cuts the noise so your effort becomes productive. Every project is unique, like human DNA."
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);

const ComparisonSection = () => (
  <section id="comparison" className="py-20 px-4 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Mentor Arena vs Typical Courses</h2>
        <p className="text-gray-600">We prioritize 1-to-1 attention over large, impersonal batches common in Pakistan.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-6 border-b border-gray-200 font-bold text-gray-900">Feature</th>
              <th className="p-6 border-b border-gray-200 font-bold text-red-600">Typical Online Courses</th>
              <th className="p-6 border-b border-gray-200 font-bold text-brand-green">Mentor Arena</th>
            </tr>
          </thead>
          <tbody>
            {[
              { f: "Attention", c: "Generic videos, no feedback", m: "Live & 1-to-1 personalized" },
              { f: "Projects", c: "Same 'to-do list' everyone builds", m: "Tailored to your specific goals" },
              { f: "Support", c: "You're on your own when stuck", m: "Direct feedback & instant answers" },
              { f: "Success Rate", c: "Most students never finish", m: "High accountability & milestones" }
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="p-6 border-b border-gray-100 font-bold text-gray-900">{row.f}</td>
                <td className="p-6 border-b border-gray-100 text-gray-500 text-sm">{row.c}</td>
                <td className="p-6 border-b border-gray-100 text-gray-900 font-bold">{row.m}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const PricingSection = () => (
  <section id="pricing" className="py-20 bg-white px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing and Plans</h2>
        <p className="text-gray-600 mb-4">Invest in a Skill That Pays for Itself</p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">We offer premium mentorship with more live hours than any bootcamp in the country. All prices are in PKR with no hidden fees.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Clarity Call",
            price: "PKR 1,000",
            duration: "15-min session",
            desc: "Discuss your background and which skill path fits you best.",
            features: ["Goal alignment", "Skill path selection", "Schedule discussion"]
          },
          {
            title: "Intensive 1-to-1 Mentorship",
            price: "PKR 30,000",
            duration: "150+ Live Hours",
            desc: "Full Skill Path (Web Dev, SEO, or Marketing) with weekly 1-to-1 live calls.",
            features: ["Personalized assignments", "Daily feedback", "Final project review", "Portfolio setup"],
            popular: true
          },
          {
            title: "Small Batch Mentorship",
            price: "PKR 15,000",
            duration: "120+ Live Hours",
            desc: "Collaborative learning environment with max 3 students per batch.",
            features: ["Weekly group live calls", "Project reviews", "Peer feedback", "Portfolio guidance"]
          }
        ].map((plan, i) => (
          <div key={i} className={`floating-card p-8 flex flex-col ${plan.popular ? 'border-brand-blue ring-4 ring-brand-blue/5 scale-105 z-10' : ''} relative`}>
            {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-blue text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">Most Popular</span>}
            <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
            <div className="text-3xl font-bold text-gray-900 mb-4">{plan.price}</div>
            <div className="flex items-center gap-2 text-gray-500 mb-6 text-sm">
              <Clock size={16} /> {plan.duration}
            </div>
            <p className="text-gray-600 mb-8 text-sm">{plan.desc}</p>
            <ul className="space-y-3 mb-8 flex-grow">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-brand-green" /> {f}
                </li>
              ))}
            </ul>
            <a href="#booking" className={`w-full py-3 rounded-xl font-bold text-center transition-all ${plan.popular ? 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/20' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
              Select Plan
            </a>
          </div>
        ))}
      </div>
      <p className="mt-12 text-center text-gray-500 italic text-sm">No hidden charges; everything is shared before you start.</p>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 bg-gray-50 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How Enrollment Works</h2>
        <p className="text-gray-600">Follow these simple steps to start your digital future.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
        {[
          { title: "Book a Clarity Call", desc: "Pick a time that works for you." },
          { title: "Discuss Goals", desc: "We talk background and skill paths." },
          { title: "Confirm Plan", desc: "Agree on timing and intensity." },
          { title: "Secure Spot", desc: "Pay via Easypaisa or JazzCash." },
          { title: "WhatsApp Proof", desc: "Share screenshot for confirmation." },
          { title: "Start Learning", desc: "Get dashboard access and schedule." }
        ].map((step, i) => (
          <div key={i} className="text-center">
            <div className="w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl shadow-lg shadow-brand-blue/20">
              {i + 1}
            </div>
            <h4 className="font-bold mb-2 text-sm">{step.title}</h4>
            <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-16 p-8 bg-white rounded-3xl border border-gray-100 text-center max-w-2xl mx-auto">
        <p className="text-gray-600 mb-6">Easypaisa and JazzCash are our standard payment methods. All payment details and schedules are double-confirmed over WhatsApp for your peace of mind.</p>
        <div className="flex justify-center items-center gap-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Easypaisa_logo.png/250px-Easypaisa_logo.png" 
            alt="Easypaisa" 
            className="h-10 object-contain"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/JazzCash_Logo.png/600px-JazzCash_Logo.png" 
            alt="JazzCash" 
            className="h-10 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  </section>
);

const ScheduleSection = ({ availability }: { availability: LayoutConfig['availability'] }) => (
  <section className="py-20 bg-white px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Daily Schedule</h2>
        <p className="text-gray-600">We offer flexible slots for clarity calls and intensive mentorship sessions.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-brand-blue/5 p-8 rounded-3xl border border-brand-blue/10">
          <h3 className="text-xl font-bold text-brand-blue mb-6 flex items-center gap-2">
            <MessageSquare className="text-brand-blue" /> Clarity Calls
          </h3>
          <div className="space-y-4">
            {DAILY_SCHEDULE.clarityCalls.map((time, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                <span className="font-semibold text-gray-700">{time}</span>
                {availability.clarityCalls[i] ? (
                  <span className="text-xs font-bold text-brand-blue bg-brand-blue/5 px-3 py-1 rounded-full uppercase">Available</span>
                ) : (
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase">Fully Booked</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-brand-blue/70 italic">
            * Clarity calls are 15-minute focused sessions to align your goals.
          </p>
        </div>

        <div className="bg-brand-green/5 p-8 rounded-3xl border border-brand-green/10">
          <h3 className="text-xl font-bold text-brand-green mb-6 flex items-center gap-2">
            <Zap className="text-brand-green" /> Mentorship Sessions
          </h3>
          <div className="space-y-4">
            {DAILY_SCHEDULE.mentorshipSessions.map((session, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                <div>
                  <span className="font-semibold text-gray-700 block">{session.time}</span>
                  <span className="text-xs text-gray-500">{session.duration} Intensive Session</span>
                </div>
                {availability.mentorshipSessions[i] ? (
                  <span className="text-xs font-bold text-brand-green bg-brand-green/5 px-3 py-1 rounded-full uppercase">Live</span>
                ) : (
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase">Closed</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-brand-green/70 italic">
            * 2 sessions daily. Each session is 4 hours of hands-on mentorship.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const BookingSection = ({ paths, slots }: { paths: string[], slots: string[] }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    path: '',
    slot: '',
    plan: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Save lead to server
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking',
          ...formData
        }),
      });
    } catch (err) {
      console.error('Failed to save lead:', err);
    }

    setSubmitted(true);
    setIsSubmitting(false);
    
    const mailBody = `
      Full Name: ${formData.name}
      WhatsApp: ${formData.whatsapp}
      Skill Path: ${formData.path}
      Time Slot: ${formData.slot}
      Plan: ${formData.plan}
      Notes: ${formData.notes}
    `;
    
    window.location.href = `mailto:${BUSINESS_INFO.adminEmail}?subject=New Booking Request - ${formData.name}&body=${encodeURIComponent(mailBody)}`;
  };

  if (submitted) {
    return (
      <section id="booking" className="py-20 px-4 bg-brand-blue/5">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto bg-white p-12 rounded-3xl text-center shadow-xl border border-brand-blue/10"
        >
          <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Request Submitted!</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We have received your details. A mentor will reach out to you on WhatsApp within 24 hours to confirm your slot and guide you through the next steps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`https://wa.me/${BUSINESS_INFO.phone.replace(/\s/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-brand-green text-white rounded-xl font-bold hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/20 flex items-center justify-center gap-2"
            >
              <MessageSquare size={18} /> Chat on WhatsApp
            </a>
            <button onClick={() => { setSubmitted(false); setStep(1); }} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all">
              Back to Start
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 px-4 bg-brand-blue/5">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-brand-blue/10">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
              <div className="h-px flex-grow bg-gray-100"></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {step === 1 ? 'Step 1: Basic Information' : 'Step 2: Plan & Payment'}
            </h2>
            <p className="text-gray-600">
              {step === 1 
                ? 'Tell us who you are and what you want to learn. We\'ll use your WhatsApp to coordinate.' 
                : 'Choose your mentorship intensity and follow the payment instructions below.'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    placeholder="Enter your full name"
                    className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">WhatsApp Number</label>
                  <input 
                    required
                    type="tel" 
                    value={formData.whatsapp}
                    placeholder="e.g. 0300 1234567"
                    className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Preferred Skill Path</label>
                  <select 
                    required
                    value={formData.path}
                    className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-white transition-all"
                    onChange={(e) => setFormData({...formData, path: e.target.value})}
                  >
                    <option value="">Select a path</option>
                    {paths.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Preferred Call Slot</label>
                  <select 
                    required
                    value={formData.slot}
                    className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-white transition-all"
                    onChange={(e) => setFormData({...formData, slot: e.target.value})}
                  >
                    <option value="">Select a slot</option>
                    {slots.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Choose Your Plan</label>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { id: 'Clarity Call', label: 'Clarity Call', price: 'PKR 1,000' },
                      { id: '1-to-1 Mentorship', label: '1-to-1', price: 'PKR 30,000' },
                      { id: 'Group Mentorship', label: 'Group', price: 'PKR 15,000' }
                    ].map(plan => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setFormData({...formData, plan: plan.id})}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${formData.plan === plan.id ? 'border-brand-blue bg-brand-blue/5' : 'border-gray-100 hover:border-gray-200'}`}
                      >
                        <div className="font-bold text-gray-900">{plan.label}</div>
                        <div className="text-sm text-brand-blue font-bold">{plan.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-brand-blue/5 rounded-3xl border border-brand-blue/10">
                  <h4 className="font-bold text-brand-blue mb-3 flex items-center gap-2">
                    <Wallet size={18} /> Payment Instructions
                  </h4>
                  <p className="text-sm text-brand-blue/80 mb-4 leading-relaxed flex items-center flex-wrap gap-2">
                    Please send the fee to <strong>{BUSINESS_INFO.phone}</strong> ({BUSINESS_INFO.accountHolder}) via:
                    <span className="inline-flex items-center gap-3 bg-white/50 px-3 py-1 rounded-full border border-brand-blue/10">
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Easypaisa_logo.png/250px-Easypaisa_logo.png" alt="Easypaisa" className="h-4 object-contain" referrerPolicy="no-referrer" />
                      <span className="text-[10px] font-bold opacity-30">|</span>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/JazzCash_Logo.png/600px-JazzCash_Logo.png" alt="JazzCash" className="h-4 object-contain" referrerPolicy="no-referrer" />
                    </span>
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Upload Payment Proof (Optional)</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue file:text-white hover:file:bg-brand-blue/90"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const whatsappUrl = `https://wa.me/${BUSINESS_INFO.phone.replace(/\s/g, '')}?text=${encodeURIComponent(`Hi Mentor Arena, I have just uploaded my payment proof for the ${formData.plan} (${formData.path}). Here is my name: ${formData.name}`)}`;
                            window.open(whatsappUrl, '_blank');
                          }
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 italic">
                      * After selecting your screenshot, you can also send it directly to our WhatsApp for instant verification.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Additional Notes (Optional)</label>
                  <textarea 
                    rows={3}
                    value={formData.notes}
                    placeholder="Anything else you'd like us to know?"
                    className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  ></textarea>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {step === 2 && (
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                >
                  Back to Step 1
                </button>
              )}
              <button 
                type="submit" 
                disabled={isSubmitting || (step === 2 && !formData.plan)}
                className="flex-grow py-4 bg-brand-blue text-white rounded-2xl font-bold text-lg hover:bg-brand-blue/90 shadow-xl shadow-brand-blue/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  step === 1 ? 'Continue to Payment' : 'Confirm Booking'
                )}
              </button>
            </div>
            <p className="text-center text-xs text-gray-400">
              {step === 1 
                ? 'Your information is secure. We only use it to coordinate your mentorship.' 
                : 'By confirming, you agree to our terms. We will contact you on WhatsApp to finalize onboarding.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = ({ caseStudyImage }: { caseStudyImage?: string }) => (
  <section className="py-24 bg-white px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Verified Success on Google</h2>
        <p className="text-lg text-gray-600">See what our students are saying about their journey at Mentor Arena.</p>
      </div>

      {/* Google Trust Banner */}
      <div className="mb-16 bg-gray-50/50 border border-gray-100 rounded-[3rem] p-8 md:p-12 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
              <img 
                src="https://www.gstatic.com/images/branding/product/2x/google_24dp.png" 
                alt="Google" 
                className="w-6 h-6"
              />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-lg font-bold text-gray-900 mt-1">Excellent 5.0 Rating</div>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-600 leading-relaxed italic">
              "Mentor Arena has a perfect 5-star rating on Google Reviews. Our commitment to 1-to-1 practical mentorship ensures every student gets the attention they deserve."
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="https://www.google.com/search?q=Mentor+Arena+Karachi+Reviews" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand-blue text-white rounded-full font-bold hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20"
            >
              Check Live Google Reviews
              <ExternalLink size={16} />
            </a>
            <div className="px-6 py-3 bg-white border border-gray-100 rounded-full text-sm font-semibold text-gray-500 flex items-center gap-2">
              <CheckCircle size={16} className="text-brand-green" />
              Verified via Google Business
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {[
          { 
            quote: "Fazal Sahib's approach is unique. He doesn't just teach code; he teaches you how to think like a product owner. After 12 weeks, I built a custom SaaS MVP that I'm now pitching to clients.",
            name: "Arsalan Malik",
            city: "Karachi",
            path: "Full-Stack Web Dev",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
          },
          { 
            quote: "The 1-to-1 mentorship is a game-changer. Awais Ghani's guest sessions on SEO provided insights you can't find in any online course. My project is now ranking on page 1 for targeted keywords.",
            name: "Mariam Tariq",
            city: "Lahore",
            path: "SEO Specialist",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
          }
        ].map((t, i) => (
          <div key={i} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 relative group hover:bg-white hover:shadow-xl transition-all duration-300">
            <MessageSquare className="absolute top-6 right-8 text-brand-blue/10 w-12 h-12" />
            
            <div className="flex gap-4 items-center mb-8">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-200">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div>
                <div className="font-bold text-gray-900 group-hover:text-brand-blue transition-colors">{t.name}</div>
                <div className="text-sm text-gray-500 font-medium">{t.city} • {t.path}</div>
              </div>
            </div>

            <p className="text-lg text-gray-700 italic leading-relaxed relative z-10">"{t.quote}"</p>
          </div>
        ))}
      </div>

      {/* Case Study Placeholder */}
      <div className="bg-brand-blue rounded-[3rem] p-8 md:p-16 text-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-xs font-bold mb-6 uppercase tracking-widest">Student Case Study</div>
            <h3 className="text-3xl font-bold mb-6">From Zero to SaaS MVP in 4 Months</h3>
            <p className="text-blue-50 mb-8 leading-relaxed">
              Junaid joined Mentor Arena with limited technical knowledge. Through our 1-to-1 project-based track, he built and deployed a fully functional Sales Dashboard for a local Karachi agency. He now works as a Junior Full-Stack Developer while scaling his own freelance business.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold overflow-hidden border border-white/20">
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100" alt="Junaid" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-bold">Junaid S.</div>
                <div className="text-sm text-blue-200">Karachi • Full-Stack Dev</div>
              </div>
            </div>
          </div>
          <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <img 
              src={caseStudyImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=800"} 
              alt="Student Project - SaaS Dashboard" 
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AboutMentor = ({ image, guestImage }: { image: string, guestImage?: string }) => (
  <section id="about" className="py-24 px-4 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      {/* Main Mentor: Fazal Shahid Latif */}
      <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
        <div className="order-2 lg:order-1">
          <div className="inline-block px-4 py-1.5 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
            Lead Mentor
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">Fazal Shahid Latif</h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              I am a Karachi-based developer and mentor who started exactly where you are—from scratch. I spent years teaching myself how to build for the web and rank on search engines.
            </p>
            <p>
              I’ve seen the struggle of Pakistani students firsthand, and I built Mentor Arena to be the mentor I wish I had when I started. My goal isn't just to teach you to code; it's to help you enter the digital economy with confidence.
            </p>
            <p className="font-medium text-brand-blue italic">
              At Mentor Arena, I’m not here just to teach you software or tools. My role is to help you think like an owner, solve real problems, and build something that is truly yours.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-14 h-14 bg-brand-blue rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-blue/20">F</div>
              <div>
                <div className="font-bold text-gray-900 text-lg">Fazal Shahid Latif</div>
                <div className="text-sm text-gray-500 font-medium">Karachi, Pakistan</div>
              </div>
            </div>
            <a 
              href="https://www.linkedin.com/in/fazal-shahid-mentor/" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-brand-blue font-bold hover:underline"
            >
              <Linkedin size={20} /> View LinkedIn Profile
            </a>
          </div>
        </div>
        <div className="order-1 lg:order-2 sticky top-24">
          <div className="aspect-[4/5] bg-gray-100 rounded-[2rem] overflow-hidden relative shadow-2xl">
            <img 
              src={image} 
              alt="Fazal Shahid Latif - Lead Mentor" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Guest Mentor: Awais Ghani */}
      <div className="bg-gray-50 rounded-[3rem] p-8 md:p-16 border border-gray-100">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img 
                src={guestImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=800"} 
                alt="Awais Ghani - Guest Mentor" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="inline-block px-4 py-1.5 bg-brand-green/10 text-brand-green rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
              Guest Mentor
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Awais Ghani</h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Awais Ghani is a Search Engine Optimization Specialist based in Lahore, Pakistan. He first started his SEO journey with Fazal Shahid Latif almost five years ago through remote, 1‑to‑1 mentoring—similar to how Mentor Arena works with students like Hamad today. Since then, he has gone on to apply and refine those skills in real projects and now returns as a guest SEO mentor and advisor, helping current students sharpen their search strategies.
            </p>
            <a 
              href="https://www.linkedin.com/in/awais-ghani-seo" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm group"
            >
              <Linkedin size={20} className="text-[#0A66C2]" />
              View LinkedIn Profile
              <ArrowRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FAQSection = () => (
  <section id="faq" className="py-20 bg-gray-50 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions about Mentorship in Pakistan</h2>
        <p className="text-gray-600">Everything you need to know about our project-based learning model.</p>
      </div>
      <div className="space-y-4">
        {FAQ_DATA.map((item, i) => (
          <details key={i} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <summary className="p-6 cursor-pointer flex justify-between items-center font-bold text-gray-800 list-none">
              {item.question}
              <span className="transition-transform group-open:rotate-180">
                <HelpCircle size={20} className="text-gray-400" />
              </span>
            </summary>
            <div className="px-6 pb-6 text-gray-600 leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const MapSection = () => (
  <section className="py-24 px-4 bg-white border-t border-gray-50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Visit Us in Karachi</h2>
        <p className="text-lg text-gray-600">While our mentorship is primarily online, we are based in the heart of Karachi.</p>
      </div>
      
      <div className="relative group">
        {/* Decorative corner accents */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-blue/5 rounded-full blur-2xl group-hover:bg-brand-blue/10 transition-colors"></div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-green/5 rounded-full blur-2xl group-hover:bg-brand-green/10 transition-colors"></div>
        
        <div className="relative bg-white rounded-[3rem] p-3 shadow-2xl border border-gray-100 overflow-hidden group-hover:shadow-brand-blue/5 transition-all duration-500">
          <div className="aspect-[21/9] min-h-[450px] w-full rounded-[2.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14479.802035!2d67.0681!3d24.8601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33ee2d80d2105%3A0xe54e24eb3e961962!2sMentor%20Arena!5e0!3m2!1sen!2spk!4v1714332000000!5m2!1sen!2spk"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mentor Arena Karachi Location"
              className="w-full h-full"
            ></iframe>
          </div>
          
          {/* Floating Address Card */}
          <div className="absolute bottom-8 left-8 right-8 md:right-auto md:w-80 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center text-white">
                <Shield size={20} />
              </div>
              <h4 className="font-bold text-gray-900">Karachi HQ</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Serving ambitious students across Pakistan with 1-to-1 digital excellence.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-blue uppercase tracking-wider">
              <Clock size={14} /> Open 11:00 AM - 12:00 AM
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-20 px-4">
    <div className="max-w-5xl mx-auto bg-brand-blue rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-blue/20">
      <div className="relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Start Your Journey Today</h2>
        <p className="text-xl text-blue-50 mb-10 max-w-2xl mx-auto leading-relaxed">
          You have the potential. You have the hard-work. All you need now is the right channel. Let’s build your digital future together, 1-to-1.
        </p>
        <a href="#booking" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-brand-blue rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all shadow-xl">
          Book a Free Clarity Call <ArrowRight />
        </a>
      </div>
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
    </div>
  </section>
);

const ChatbotLauncher = () => (
  <div className="fixed bottom-6 right-6 z-50">
    <button 
      onClick={() => window.open(`https://wa.me/${BUSINESS_INFO.phone.replace(/\s/g, '')}`, '_blank')}
      className="w-14 h-14 bg-brand-green text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95 cursor-pointer"
      title="Chat with us on WhatsApp"
    >
      <MessageSquare />
    </button>
  </div>
);

const LegalModal = ({ type, onClose }: { type: 'privacy' | 'terms' | 'cookies' | 'refund', onClose: () => void }) => {
  const content = {
    privacy: {
      title: "Privacy Policy",
      body: `At Mentor Arena, we take your privacy seriously. We only collect essential information needed to provide our mentorship services, including your name, email, and WhatsApp number. Your data is never sold to third parties and is used solely for communication and course management within our platform in Karachi, Pakistan.`
    },
    terms: {
      title: "Terms of Service",
      body: `By enrolling in Mentor Arena, you agree to follow our code of conduct. Our mentorship is designed for serious students committed to building real-world projects. We reserve the right to terminate access if a student is found violating our community guidelines or engaging in unauthorized distribution of course materials.`
    },
    cookies: {
      title: "Cookie Policy",
      body: `We use essential cookies to keep you logged in and remember your preferences. These cookies do not track your activity on other websites and are necessary for the basic functionality of the Mentor Arena platform.`
    },
    refund: {
      title: "Refund Policy",
      body: `Our refund policy is designed to be fair to both the student and the mentor:

1. Introduction Class: Once the introduction class is over, a student can initiate a refund.
2. Processing Time: Refunds will be returned within a maximum of 15 days.
3. Regular Classes: After commencing the first regular class, no refunds will be entertained.
4. Clarity Calls: No refunds are provided for clarity calls. However, you may upgrade your status to 1-to-1 mentorship.
5. Downgrades: 1-to-1 students are not allowed to downgrade their plan once enrolled.`
    }
  };

  const active = content[type];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">{active.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-8 overflow-y-auto">
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {active.body}
            </p>
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue/90 transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Footer = ({ onOpenLegal }: { onOpenLegal: (type: 'privacy' | 'terms' | 'cookies' | 'refund') => void }) => (
  <footer className="py-12 border-t border-gray-100 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
        <div className="flex flex-col gap-3 w-full md:w-auto text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <img src="input_file_0.png" alt="M" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">Mentor Arena</span>
          </div>
          <p className="text-xs text-gray-500 max-w-sm">Based in Karachi, mentoring students across Pakistan. Transform your career with 1-on-1 digital skills coaching.</p>
          <a href="https://saasskul.com" target="_blank" rel="noreferrer" className="mt-4 block hover:opacity-80 transition-opacity">
            <img src="input_file_1.png" alt="A product of SaaSSkul" className="h-10 w-auto object-contain mx-auto md:mx-0" />
          </a>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-auto text-center md:text-left">
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Legal</h4>
          <div className="flex flex-col gap-3 text-sm font-medium">
            <button onClick={() => onOpenLegal('privacy')} className="text-gray-500 hover:text-brand-blue transition-colors text-left w-full md:w-auto">Privacy Policy</button>
            <button onClick={() => onOpenLegal('terms')} className="text-gray-500 hover:text-brand-blue transition-colors text-left w-full md:w-auto">Terms of Service</button>
            <button onClick={() => onOpenLegal('refund')} className="text-gray-500 hover:text-brand-blue transition-colors text-left w-full md:w-auto">Refund Policy</button>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-auto text-center md:text-right items-center md:items-end">
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Social Connect</h4>
          <div className="flex md:flex-col gap-4">
            {[
              { Icon: MessageSquare, href: `https://wa.me/${BUSINESS_INFO.phone}`, label: "WhatsApp", color: "text-green-500" },
              { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61572334738737", label: "Facebook", color: "text-blue-600" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/fazal-shahid-mentor/", label: "LinkedIn", color: "text-blue-700" },
              { Icon: Instagram, href: "https://www.instagram.com/bookmethat/", label: "Instagram", color: "text-pink-600" }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-[0_4px_0_0_rgba(0,0,0,0.05)] border border-gray-100 hover:text-gray-900 transition-all group relative"
                title={social.label}
              >
                <social.Icon size={20} className={`transition-colors group-hover:${social.color}`} />
                <div className="absolute inset-px rounded-full border border-white/50 pointer-events-none"></div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} Mentor Arena. All rights reserved. Built for Pakistan.
      </div>
    </div>
  </footer>
);

const LoginPortal = ({ isOpen, onClose, onLoginSuccess }: { isOpen: boolean, onClose: () => void, onLoginSuccess: (user: any) => void }) => {
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for student login
    setTimeout(() => {
      onLoginSuccess({ email, role: 'student', name: email.split('@')[0] });
      setLoading(false);
      onClose();
    }, 1200);
  };

  const handleGitHubLogin = async () => {
    setLoading(true);
    // Simulation of GitHub OAuth for SuperAdmin
    setTimeout(() => {
      onLoginSuccess({ 
        email: 'admin@mentorarena.online', 
        role: 'admin', 
        name: 'Authority Admin' 
      });
      setLoading(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="flex">
          <button 
            onClick={() => setActiveTab('student')}
            className={`flex-1 py-6 font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'student' ? 'bg-white text-brand-blue border-b-4 border-brand-green' : 'bg-gray-50 text-gray-400'}`}
          >
            Student Access
          </button>
          <button 
            onClick={() => setActiveTab('admin')}
            className={`flex-1 py-6 font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'admin' ? 'bg-white text-brand-blue border-b-4 border-brand-green' : 'bg-gray-50 text-gray-400'}`}
          >
            SuperAdmin
          </button>
        </div>

        <div className="p-10">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-brand-blue/5 rounded-3xl flex items-center justify-center text-brand-blue mx-auto mb-6">
              {activeTab === 'student' ? <GraduationCap size={40} /> : <Lock size={40} />}
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              {activeTab === 'student' ? 'Student Portal' : 'Admin Authority'}
            </h2>
            <p className="text-gray-500 text-sm">
              {activeTab === 'student' 
                ? 'Welcome back! Ready to continue your project?' 
                : 'Secure entry for Mentor Arena content managers.'}
            </p>
          </div>

          {activeTab === 'student' ? (
            <form onSubmit={handleManualLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-brand-blue text-white rounded-2xl font-black text-lg hover:bg-brand-blue/90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-blue/20"
              >
                {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Enter Portal'}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <p className="text-center text-sm text-gray-400 leading-relaxed bg-gray-50 p-6 rounded-2xl">
                SuperAdmin access is restricted to authorized owners. Managed via GitHub.
              </p>
              <button 
                onClick={handleGitHubLogin}
                disabled={loading}
                className="w-full py-5 bg-[#24292F] text-white rounded-2xl font-black text-lg hover:bg-[#24292F]/90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/20"
              >
                {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : (
                  <>
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    Continue as SuperAdmin
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | 'cookies' | 'refund' | null>(null);
  const [config, setConfig] = useState<LayoutConfig>(DEFAULT_LAYOUT);

  // Check for stored user session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('ma_session');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('ma_session');
      }
    }
  }, []);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    localStorage.setItem('ma_session', JSON.stringify(userData));
    if (userData.role === 'admin') {
      setShowAdmin(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setShowAdmin(false);
    localStorage.removeItem('ma_session');
  };

  // Initial fetch from server
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/config');
        if (response.ok) {
          const data = await response.json();
          if (data && Object.keys(data).length > 0) {
            setConfig({
              ...DEFAULT_LAYOUT,
              ...data,
              sections: { ...DEFAULT_LAYOUT.sections, ...(data.sections || {}) },
              images: { ...DEFAULT_LAYOUT.images, ...(data.images || {}) },
              availability: { ...DEFAULT_LAYOUT.availability, ...(data.availability || {}) },
              content: { ...DEFAULT_LAYOUT.content, ...(data.content || {}) },
            });
          }
        }
      } catch (err) {
        console.error('Failed to fetch config from server');
      }
    };
    fetchConfig();
  }, []);

  const handleUpdateConfig = async (newConfig: LayoutConfig) => {
    setConfig(newConfig);
    try {
      await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig),
      });
    } catch (err) {
      console.error('Failed to save config to server');
    }
  };

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-brand-blue/10 selection:text-brand-blue">
      <Navbar 
        onAdminClick={() => setShowAdmin(true)} 
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}
        user={user}
      />
      
      <main>
        {config.sections.hero && (
          <HeroSection 
            heroBg={config.images.heroBg} 
            onLoginClick={() => setShowLogin(true)}
            onAdminClick={() => setShowAdmin(true)}
            user={user}
          />
        )}
        {config.sections.who && <WhoThisIsFor />}
        <AuthoritySyllabus />
        {config.sections.courses && <CoursesOffered paths={config.content.skillPaths} />}
        {config.sections.method && <MethodSection videoUrl={config.images.methodVideo} posterUrl={config.images.methodPoster} />}
        {config.sections.comparison && <ComparisonSection />}
        {config.sections.pricing && <PricingSection />}
        {config.sections.how && <HowItWorks />}
        <TestimonialsSection caseStudyImage={config.images.caseStudy} />
        {config.sections.schedule && <ScheduleSection availability={config.availability} />}
        {config.sections.booking && <BookingSection paths={config.content.skillPaths} slots={config.content.timeSlots} />}
        {config.sections.about && <AboutMentor image={config.images.mentor} guestImage={config.images.guestMentor} />}
        {config.sections.faq && <FAQSection />}
        {config.sections.cta && <FinalCTA />}
        <MapSection />
      </main>

      <AnimatePresence>
        {showAdmin && (
          <React.Suspense fallback={
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center">
              <div className="bg-white p-8 rounded-2xl animate-pulse text-brand-blue font-bold">Loading Admin...</div>
            </div>
          }>
            <AdminPanel 
              onClose={() => setShowAdmin(false)} 
              config={config}
              onUpdate={handleUpdateConfig}
            />
          </React.Suspense>
        )}
        {showLogin && (
          <LoginPortal 
            isOpen={showLogin} 
            onClose={() => setShowLogin(false)} 
            onLoginSuccess={handleLoginSuccess}
          />
        )}
        {legalType && (
          <LegalModal type={legalType} onClose={() => setLegalType(null)} />
        )}
      </AnimatePresence>

      <Footer onOpenLegal={setLegalType} />
      <ChatbotLauncher />
    </div>
  );
}
