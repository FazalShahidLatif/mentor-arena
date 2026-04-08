import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  Image as ImageIcon, 
  Mail, 
  Trash2, 
  Plus, 
  Eye, 
  EyeOff, 
  Edit3 
} from 'lucide-react';
import { DAILY_SCHEDULE } from '../constants';

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

interface AdminViewProps {
  onBack: () => void;
  config: LayoutConfig;
  onUpdate: (newConfig: LayoutConfig) => void;
  defaultLayout: LayoutConfig;
}

export const AdminView: React.FC<AdminViewProps> = ({ 
  onBack, 
  config, 
  onUpdate,
  defaultLayout
}) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'schedule' | 'email' | 'media'>('courses');
  const [emailData, setEmailData] = useState({ studentName: '', plan: '1-to-1 Mentorship' });

  const [isUploading, setIsUploading] = useState(false);

  const toggleSection = (section: keyof LayoutConfig['sections']) => {
    onUpdate({
      ...config,
      sections: { ...config.sections, [section]: !config.sections[section] }
    });
  };

  const toggleAvailability = (type: 'clarityCalls' | 'mentorshipSessions', index: number) => {
    const newAvailability = [...config.availability[type]];
    newAvailability[index] = !newAvailability[index];
    onUpdate({
      ...config,
      availability: { ...config.availability, [type]: newAvailability }
    });
  };

  const updateImage = (key: keyof LayoutConfig['images'], value: string) => {
    onUpdate({
      ...config,
      images: { ...config.images, [key]: value }
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: keyof LayoutConfig['images']) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        updateImage(key, data.url);
      } else {
        const error = await response.json();
        alert(error.error || 'Upload failed');
      }
    } catch (err) {
      alert('Connection error during upload');
    } finally {
      setIsUploading(false);
    }
  };

  const generateEmail = () => {
    return `Subject: Booking Confirmation - Mentor Arena

Dear ${emailData.studentName || '[Student Name]'},

I am pleased to confirm your booking for the ${emailData.plan} at Mentor Arena. 

We have received your details and are excited to have you on board. Your journey towards mastering digital skills starts here.

Next Steps:
1. We will finalize your specific start date based on the ${emailData.plan} requirements.
2. You will receive a link to our private Discord/WhatsApp group.
3. Prepare your laptop and ensure a stable internet connection for our first live session.

If you have any questions before we start, feel free to reach out.

Best regards,
Fazal Shahid Latif
Mentor Arena`;
  };

  return (
    <div className="flex-grow overflow-y-auto p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <span className="px-2 py-1 bg-brand-green/10 text-brand-green text-[10px] font-bold rounded uppercase tracking-wider">Live Editing</span>
          </div>
          <button 
            onClick={() => {
              if (window.confirm('Reset all settings to default? This will overwrite your current configuration.')) {
                onUpdate(defaultLayout);
              }
            }}
            className="text-xs font-bold text-gray-400 hover:text-brand-blue transition-colors uppercase tracking-wider"
          >
            Reset to Defaults
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto bg-gray-50/50">
            {[
              { id: 'courses', label: 'Courses', icon: BookOpen },
              { id: 'schedule', label: 'Schedule', icon: Calendar },
              { id: 'media', label: 'Media & Layout', icon: ImageIcon },
              { id: 'email', label: 'Email Composer', icon: Mail }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 font-semibold flex items-center gap-2 whitespace-nowrap relative transition-colors ${activeTab === tab.id ? 'text-brand-blue bg-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <tab.icon size={18} /> {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold mb-4">Manage Course List</h3>
                {config.content.skillPaths.map((path, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <input 
                      type="text" 
                      value={path} 
                      onChange={(e) => {
                        const newPaths = [...config.content.skillPaths];
                        newPaths[i] = e.target.value;
                        onUpdate({ ...config, content: { ...config.content, skillPaths: newPaths } });
                      }}
                      className="flex-grow p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none" 
                    />
                    <button 
                      onClick={() => {
                        const newPaths = config.content.skillPaths.filter((_, idx) => idx !== i);
                        onUpdate({ ...config, content: { ...config.content, skillPaths: newPaths } });
                      }}
                      className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => {
                    onUpdate({ ...config, content: { ...config.content, skillPaths: [...config.content.skillPaths, "New Skill Path"] } });
                  }}
                  className="text-brand-blue font-bold flex items-center gap-2 hover:bg-brand-blue/5 p-2 rounded-lg transition-colors"
                >
                  <Plus size={18} /> Add New Path
                </button>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">Clarity Call Availability</h3>
                  <div className="space-y-4">
                    {DAILY_SCHEDULE.clarityCalls.map((time, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <span className="font-medium text-gray-700">{time}</span>
                        <button 
                          onClick={() => toggleAvailability('clarityCalls', i)}
                          className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${config.availability.clarityCalls[i] ? 'bg-brand-green/10 text-brand-green' : 'bg-red-50 text-red-600'}`}
                        >
                          {config.availability.clarityCalls[i] ? 'Available' : 'Booked'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4">Mentorship Session Availability</h3>
                  <div className="space-y-4">
                    {DAILY_SCHEDULE.mentorshipSessions.map((session, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <div>
                          <span className="font-medium text-gray-700 block">{session.time}</span>
                          <span className="text-xs text-gray-500">{session.duration}</span>
                        </div>
                        <button 
                          onClick={() => toggleAvailability('mentorshipSessions', i)}
                          className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${config.availability.mentorshipSessions[i] ? 'bg-brand-green/10 text-brand-green' : 'bg-red-50 text-red-600'}`}
                        >
                          {config.availability.mentorshipSessions[i] ? 'Live' : 'Closed'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-10">
                <div>
                  <h3 className="text-lg font-bold mb-4">Section Visibility</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {(Object.keys(config.sections) as Array<keyof LayoutConfig['sections']>).map((section) => (
                      <button 
                        key={section}
                        onClick={() => toggleSection(section)}
                        className={`p-4 rounded-xl border flex items-center justify-between transition-all ${config.sections[section] ? 'bg-brand-blue/5 border-brand-blue/20 text-brand-blue' : 'bg-gray-50 border-gray-200 text-gray-400'}`}
                      >
                        <span className="capitalize font-medium">{section}</span>
                        {config.sections[section] ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4">Image Management</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Lead Mentor Profile (Fazal Shahid)</label>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-4">
                          <input 
                            type="text" 
                            placeholder="Image URL"
                            value={config.images.mentor}
                            onChange={(e) => updateImage('mentor', e.target.value)}
                            className="flex-grow p-3 rounded-xl border border-gray-200"
                          />
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                            <img src={config.images.mentor} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" decoding="async" loading="lazy" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className={`cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <Plus size={16} /> {isUploading ? 'Uploading...' : 'Upload New Picture'}
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              disabled={isUploading}
                              onChange={(e) => handleFileUpload(e, 'mentor')}
                            />
                          </label>
                          <span className="text-[10px] text-gray-400">Max 5MB (JPG, PNG, WebP)</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Guest Mentor Profile (Awais Ghani)</label>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-4">
                          <input 
                            type="text" 
                            placeholder="Guest Mentor Image URL"
                            value={config.images.guestMentor}
                            onChange={(e) => updateImage('guestMentor', e.target.value)}
                            className="flex-grow p-3 rounded-xl border border-gray-200"
                          />
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                            <img src={config.images.guestMentor} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" decoding="async" loading="lazy" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className={`cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <Plus size={16} /> {isUploading ? 'Uploading...' : 'Upload Guest Mentor Picture'}
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              disabled={isUploading}
                              onChange={(e) => handleFileUpload(e, 'guestMentor')}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Student Project Case Study (SaaS Dashboard)</label>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-4">
                          <input 
                            type="text" 
                            placeholder="Case Study Image URL"
                            value={config.images.caseStudy}
                            onChange={(e) => updateImage('caseStudy', e.target.value)}
                            className="flex-grow p-3 rounded-xl border border-gray-200"
                          />
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                            <img src={config.images.caseStudy} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" decoding="async" loading="lazy" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className={`cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <Plus size={16} /> {isUploading ? 'Uploading...' : 'Upload Case Study Picture'}
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              disabled={isUploading}
                              onChange={(e) => handleFileUpload(e, 'caseStudy')}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Hero Section Background (Top of Page)</label>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-4">
                          <input 
                            type="text" 
                            placeholder="Background URL"
                            value={config.images.heroBg}
                            onChange={(e) => updateImage('heroBg', e.target.value)}
                            className="flex-grow p-3 rounded-xl border border-gray-200"
                          />
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                            <img src={config.images.heroBg} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" decoding="async" loading="lazy" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className={`cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <Plus size={16} /> {isUploading ? 'Uploading...' : 'Upload New Background'}
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              disabled={isUploading}
                              onChange={(e) => handleFileUpload(e, 'heroBg')}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Methodology Background Video</label>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-4">
                          <input 
                            type="text" 
                            placeholder="Video URL"
                            value={config.images.methodVideo}
                            onChange={(e) => updateImage('methodVideo', e.target.value)}
                            className="flex-grow p-3 rounded-xl border border-gray-200"
                          />
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-100 flex items-center justify-center">
                            <ImageIcon size={20} className="text-gray-400" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className={`cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <Plus size={16} /> {isUploading ? 'Uploading...' : 'Upload New Video'}
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="video/*"
                              disabled={isUploading}
                              onChange={(e) => handleFileUpload(e, 'methodVideo')}
                            />
                          </label>
                          <span className="text-[10px] text-gray-400">Max 5MB (MP4, WebM)</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Methodology Video Poster (Static Thumbnail)</label>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-4">
                          <input 
                            type="text" 
                            placeholder="Poster URL"
                            value={config.images.methodPoster}
                            onChange={(e) => updateImage('methodPoster', e.target.value)}
                            className="flex-grow p-3 rounded-xl border border-gray-200"
                          />
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                            <img src={config.images.methodPoster} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" decoding="async" loading="lazy" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className={`cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <Plus size={16} /> {isUploading ? 'Uploading...' : 'Upload New Poster'}
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              disabled={isUploading}
                              onChange={(e) => handleFileUpload(e, 'methodPoster')}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Student Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter name"
                      className="w-full p-3 rounded-xl border border-gray-200"
                      onChange={(e) => setEmailData({...emailData, studentName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Plan</label>
                    <select 
                      className="w-full p-3 rounded-xl border border-gray-200 bg-white"
                      onChange={(e) => setEmailData({...emailData, plan: e.target.value})}
                    >
                      <option>1-to-1 Mentorship</option>
                      <option>Group Mentorship</option>
                      <option>Clarity Call</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Generated Template</label>
                  <textarea 
                    rows={12}
                    readOnly
                    value={generateEmail()}
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 font-mono text-sm"
                  ></textarea>
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(generateEmail());
                    alert('Copied to clipboard!');
                  }}
                  className="bg-brand-blue text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/20 transition-all"
                >
                  <Edit3 size={18} /> Copy to Clipboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
