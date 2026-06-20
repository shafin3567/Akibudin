import React, { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  FilePenLine,
  FileDown,
  Plus,
  Trash2,
  Edit3,
  Calendar,
  CheckCircle,
  Eye,
  Heart,
  BarChart3,
  TrendingUp,
  X,
  Lock,
  Wrench,
  CloudLightning,
  Sparkles,
  Shield
} from 'lucide-react';
import { Project, BlogPost, Message, AnalyticsStats } from '../types';
import { calculateReadingTime } from '../utils/readingTime';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface DashboardProps {
  darkMode: boolean;
  projects: Project[];
  blogs: BlogPost[];
  messages: Message[];
  analytics: AnalyticsStats;
  onAddProject: (proj: Omit<Project, 'id' | 'views' | 'likes'>) => void;
  onEditProject: (id: string, proj: Partial<Project>) => void;
  onDeleteProject: (id: string) => void;
  onAddBlogPost: (blog: Omit<BlogPost, 'id' | 'views' | 'likes' | 'author'>) => void;
  onEditBlogPost: (id: string, blog: Partial<BlogPost>) => void;
  onDeleteBlogPost: (id: string) => void;
  onMarkMessageStatus: (id: string, status: 'unread' | 'read' | 'replied') => void;
  onDeleteMessage: (id: string) => void;
  onLock?: () => void;
}

export default function Dashboard({
  darkMode,
  projects,
  blogs,
  messages,
  analytics,
  onAddProject,
  onEditProject,
  onDeleteProject,
  onAddBlogPost,
  onEditBlogPost,
  onDeleteBlogPost,
  onMarkMessageStatus,
  onDeleteMessage,
  onLock
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'blogs' | 'messages' | 'security'>('overview');
  const [isPending, startTransition] = useTransition();

  const renderCustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-xl border font-mono text-xs ${
          darkMode ? 'bg-slate-950/90 border-white/10 text-white shadow-2xl' : 'bg-white border-slate-200 text-slate-800 shadow-md'
        }`}>
          <p className="font-bold mb-1.5 uppercase tracking-wider text-[10px] opacity-70">{label}</p>
          {payload.map((item: any) => (
            <div key={item.name} className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="opacity-85">{item.name}:</span>
              <strong className="font-semibold">{item.value}</strong>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Passcode changing states
  const [currentPasscode, setCurrentPasscode] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmNewPasscode, setConfirmNewPasscode] = useState('');
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState(false);

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    setPwSuccess(false);

    const storedPasscode = localStorage.getItem('portfolio_admin_passcode') || 'admin123';
    if (currentPasscode !== storedPasscode) {
      setPwError('Incorrect current passcode.');
      return;
    }

    if (newPasscode.length < 4) {
      setPwError('New passcode must be at least 4 characters.');
      return;
    }

    if (newPasscode !== confirmNewPasscode) {
      setPwError('New passcodes do not match.');
      return;
    }

    localStorage.setItem('portfolio_admin_passcode', newPasscode);
    setCurrentPasscode('');
    setNewPasscode('');
    setConfirmNewPasscode('');
    setPwSuccess(true);
  };

  // Project dialog states
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    category: 'Web Applications' as Project['category'],
    tech: '',
    demoUrl: '',
    githubUrl: '',
    image: '',
    longDescription: ''
  });

  // Blog dialog states
  const [blogDialogOpen, setBlogDialogOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    brief: '',
    content: '',
    tags: '',
    readTime: '5 min read'
  });

  // Safe report export capability
  const handleExportReport = () => {
    const dataReport = {
      timestamp: new Date().toISOString(),
      developer: 'Md. Akib Uddin Satej',
      statistics: {
        totalSessionsViews: analytics.totalViews,
        portfolioProjectViews: analytics.projectViews,
        blogReadViews: analytics.blogViews,
        inquiriesReceived: messages.length
      },
      projectsList: projects.map(p => ({
        name: p.name,
        category: p.category,
        views: p.views,
        likes: p.likes,
        demoUrl: p.demoUrl
      })),
      blogsList: blogs.map(b => ({
        title: b.title,
        date: b.date,
        views: b.views,
        likes: b.likes
      })),
      messagesReceivedList: messages.map(m => ({
        name: m.name,
        email: m.email,
        subject: m.subject,
        message: m.message,
        date: m.date
      }))
    };

    const blob = new Blob([JSON.stringify(dataReport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Satej_Developer_Telemetry_Report_${new Date().getFullYear()}.json`;
    link.click();
  };

  // Safe project save triggers
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name.trim() || !projectForm.description.trim()) return;

    const parsedTech = projectForm.tech.split(',').map(t => t.trim()).filter(Boolean);

    if (editingProjectId) {
      onEditProject(editingProjectId, {
        name: projectForm.name.trim(),
        description: projectForm.description.trim(),
        category: projectForm.category,
        tech: parsedTech,
        demoUrl: projectForm.demoUrl.trim() || 'https://example.com',
        githubUrl: projectForm.githubUrl.trim() || 'https://github.com',
        image: projectForm.image.trim() || 'https://picsum.photos/seed/placeholder/600/400',
        longDescription: projectForm.longDescription.trim()
      });
    } else {
      onAddProject({
        name: projectForm.name.trim(),
        description: projectForm.description.trim(),
        category: projectForm.category,
        tech: parsedTech,
        demoUrl: projectForm.demoUrl.trim() || 'https://example.com',
        githubUrl: projectForm.githubUrl.trim() || 'https://github.com',
        image: projectForm.image.trim() || 'https://picsum.photos/seed/placeholder/600/400',
        longDescription: projectForm.longDescription.trim()
      });
    }

    setEditingProjectId(null);
    setProjectDialogOpen(false);
    setProjectForm({
      name: '',
      description: '',
      category: 'Web Applications',
      tech: '',
      demoUrl: '',
      githubUrl: '',
      image: '',
      longDescription: ''
    });
  };

  const handleOpenEditProject = (p: Project) => {
    setEditingProjectId(p.id);
    setProjectForm({
      name: p.name,
      description: p.description,
      category: p.category,
      tech: p.tech.join(', '),
      demoUrl: p.demoUrl,
      githubUrl: p.githubUrl,
      image: p.image,
      longDescription: p.longDescription || ''
    });
    setProjectDialogOpen(true);
  };

  // Safe blog save trigger
  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title.trim() || !blogForm.content.trim()) return;

    const parsedTags = blogForm.tags.split(',').map(t => t.trim()).filter(Boolean);

    // Calculate dynamic readTime if left empty or set to defaults
    const finalReadTime = 
      blogForm.readTime.trim() && 
      blogForm.readTime.trim() !== '5 min read' && 
      blogForm.readTime.trim() !== '6 min read'
        ? blogForm.readTime.trim()
        : calculateReadingTime(blogForm.content);

    if (editingBlogId) {
      onEditBlogPost(editingBlogId, {
        title: blogForm.title.trim(),
        brief: blogForm.brief.trim() || blogForm.content.substring(0, 120) + '...',
        content: blogForm.content,
        tags: parsedTags,
        readTime: finalReadTime
      });
    } else {
      onAddBlogPost({
        title: blogForm.title.trim(),
        brief: blogForm.brief.trim() || blogForm.content.substring(0, 120) + '...',
        content: blogForm.content,
        tags: parsedTags,
        readTime: finalReadTime,
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      });
    }

    setEditingBlogId(null);
    setBlogDialogOpen(false);
    setBlogForm({
      title: '',
      brief: '',
      content: '',
      tags: '',
      readTime: '5 min read'
    });
  };

  const handleOpenEditBlog = (b: BlogPost) => {
    setEditingBlogId(b.id);
    setBlogForm({
      title: b.title,
      brief: b.brief,
      content: b.content,
      tags: b.tags.join(', '),
      readTime: b.readTime
    });
    setBlogDialogOpen(true);
  };

  const handleTabChange = (tab: typeof activeTab) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  // Sum total values
  const totalLikes = projects.reduce((sum, p) => sum + p.likes, 0) + blogs.reduce((sum, b) => sum + b.likes, 0);

  return (
    <section
      id="dashboard"
      className={`min-h-[85vh] py-24 relative ${
        darkMode ? 'bg-[#0b1a0d] text-white' : 'bg-slate-50 text-slate-900 border-t border-slate-200'
      }`}
    >
      <div className="absolute top-[20%] right-[3%] w-[350px] h-[350px] bg-primary-blue/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Dashboard Title Panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-[10px] font-bold font-mono uppercase bg-primary-blue/15 text-primary-blue rounded border border-primary-blue/20">
                Performance Observability
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
            
            <h2 className="text-2.5xl sm:text-3xl font-extrabold font-display mt-2 tracking-tight">
              Content Analytics & Admin Control
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {onLock && (
              <button
                onClick={onLock}
                className="flex items-center gap-1.5 px-4.5 py-2.5 bg-rose-600/15 hover:bg-rose-600/25 text-rose-400 border border-rose-500/30 rounded-xl font-bold text-xs transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4 text-rose-400" />
                Lock Control Panel
              </button>
            )}
            <button
               onClick={handleExportReport}
              className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gradient-to-r from-primary-blue to-accent-cyan text-white rounded-xl font-bold text-xs hover:opacity-95 transition-all shadow-md cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              Download Telemetry Report
            </button>
          </div>
        </div>

        {/* Dashboard Sidebar & Tabs Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Controls on Left */}
          <div className="lg:col-span-3 space-y-4">
            <div className={`p-4 rounded-2xl border ${
              darkMode ? 'bg-slate-900/50 border-white/5' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <p className="text-[10px] font-mono tracking-widest opacity-50 uppercase mb-3.5 px-2">Control panel</p>
              
              <div className="space-y-1.5 flex flex-col">
                <button
                  onClick={() => handleTabChange('overview')}
                  className={`w-full flex items-center gap-2.5 px-4.5 py-3 rounded-xl font-bold font-display text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'overview'
                      ? 'bg-primary-blue/10 border-l-4 border-l-primary-blue text-primary-blue font-extrabold'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <LayoutDashboard className="w-4.5 h-4.5" />
                  Performance Outline
                </button>

                <button
                  onClick={() => handleTabChange('projects')}
                  className={`w-full flex items-center gap-2.5 px-4.5 py-3 rounded-xl font-bold font-display text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'projects'
                      ? 'bg-primary-blue/10 border-l-4 border-l-primary-blue text-primary-blue font-extrabold'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <FolderKanban className="w-4.5 h-4.5" />
                  Manage Showcase ({projects.length})
                </button>

                <button
                  onClick={() => handleTabChange('blogs')}
                  className={`w-full flex items-center gap-2.5 px-4.5 py-3 rounded-xl font-bold font-display text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'blogs'
                      ? 'bg-primary-blue/10 border-l-4 border-l-primary-blue text-primary-blue font-extrabold'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <FilePenLine className="w-4.5 h-4.5" />
                  Markdown Blogs ({blogs.length})
                </button>

                <button
                  onClick={() => handleTabChange('messages')}
                  className={`w-full flex items-center gap-2.5 px-4.5 py-3 rounded-xl font-bold font-display text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'messages'
                      ? 'bg-primary-blue/10 border-l-4 border-l-primary-blue text-primary-blue font-extrabold'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <Mail className="w-4.5 h-4.5" />
                  Enquiry Logs ({messages.length})
                </button>

                <button
                  onClick={() => handleTabChange('security')}
                  className={`w-full flex items-center gap-2.5 px-4.5 py-3 rounded-xl font-bold font-display text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'security'
                      ? 'bg-primary-blue/10 border-l-4 border-l-primary-blue text-primary-blue font-extrabold'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <Wrench className="w-4.5 h-4.5" />
                  Security Settings
                </button>
              </div>
            </div>

            {/* Quick telemetry security warning banner */}
            <div className={`p-4 rounded-xl border flex gap-3 text-xs ${
              darkMode ? 'bg-slate-900/20 border-white/5 text-slate-400 font-mono' : 'bg-slate-100 border-slate-200 text-slate-500 font-mono'
            }`}>
              <Lock className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>TLS connection active. Operations securely buffered to internal local storage memory bounds.</span>
            </div>
          </div>

          {/* Tab Content Display Area */}
          <div className="lg:col-span-9">
            {isPending && (
              <div className="space-y-4 pt-10 text-center">
                <div className="w-6 h-6 rounded-full border-2 border-primary-blue border-t-transparent animate-spin mx-auto" />
                <p className="text-xs font-mono opacity-50">Refactoring workspace matrix...</p>
              </div>
            )}
            
            <AnimatePresence mode="wait">
              {!isPending && activeTab === 'overview' && (
                <motion.div
                  key="overview-out"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">Cumulative Views</span>
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                      </div>
                      <p className="text-2.5xl font-extrabold font-display mt-2">{analytics.totalViews + messages.length * 12}</p>
                    </div>

                    <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">Portfolio Clicks</span>
                        <Eye className="w-4 h-4 text-accent-cyan" />
                      </div>
                      <p className="text-2.5xl font-extrabold font-display mt-2">{analytics.projectViews + projects.reduce((acc, p) => acc + p.views, 0)}</p>
                    </div>

                    <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">Blog Readers</span>
                        <BarChart3 className="w-4 h-4 text-secondary-purple" />
                      </div>
                      <p className="text-2.5xl font-extrabold font-display mt-2">{analytics.blogViews + blogs.reduce((acc, b) => acc + b.views, 0)}</p>
                    </div>

                    <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">Interactions Liked</span>
                        <Heart className="w-4 h-4 text-rose-400 fill-rose-500/20" />
                      </div>
                      <p className="text-2.5xl font-extrabold font-display mt-2">{totalLikes}</p>
                    </div>
                  </div>

                  {/* Interactive Recharts Visualization */}
                  <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-white border-slate-200 shadow-md'}`}>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="font-bold font-display text-base">Traffic & Engagement Metrics</h4>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">Over-time correlation of Total Views & Messages Received</p>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                        Interactive Feed
                      </span>
                    </div>

                    <div className="h-72 w-full mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                          data={analytics.dailyViews}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={darkMode ? '#3b82f6' : '#2563eb'} stopOpacity={0.3}/>
                              <stop offset="95%" stopColor={darkMode ? '#3b82f6' : '#2563eb'} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke={darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}
                          />
                          <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            stroke={darkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'}
                            dy={10}
                            style={{ fontSize: '10px', fontFamily: 'JetBrains Mono, monospace' }}
                          />
                          <YAxis
                            yAxisId="left"
                            tickLine={false}
                            axisLine={false}
                            stroke={darkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'}
                            dx={-5}
                            style={{ fontSize: '10px', fontFamily: 'JetBrains Mono, monospace' }}
                          />
                          <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickLine={false}
                            axisLine={false}
                            stroke={darkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'}
                            dx={5}
                            style={{ fontSize: '10px', fontFamily: 'JetBrains Mono, monospace' }}
                          />
                          <Tooltip content={renderCustomTooltip} />
                          <Legend
                            verticalAlign="top"
                            height={36}
                            content={({ payload }) => (
                              <div className="flex gap-4 items-center justify-end font-mono text-[10px] mb-4">
                                {payload?.map((entry: any) => (
                                  <div key={entry.value} className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                                    <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>
                                      {entry.value === 'Total Views' ? 'Total Views (Axis Left)' : 'Messages Received (Axis Right)'}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          />
                          <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="views"
                            name="Total Views"
                            stroke={darkMode ? '#3b82f6' : '#2563eb'}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#viewsGrad)"
                          />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="contactSubmissions"
                            name="Messages Received"
                            stroke={darkMode ? '#10b981' : '#059669'}
                            strokeWidth={2.5}
                            dot={{ r: 4, strokeWidth: 1.5, fill: darkMode ? '#020617' : '#ffffff' }}
                            activeDot={{ r: 6 }}
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB PROJECTS: MANAGE PORTFOLIO */}
              {!isPending && activeTab === 'projects' && (
                <motion.div
                  key="projects-out"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold font-display text-base">Showcase Repositories</h4>
                      <p className="text-xs text-slate-400 font-mono">Create, modify, and delete portfolio grid cards</p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingProjectId(null);
                        setProjectForm({
                          name: '',
                          description: '',
                          category: 'Web Applications',
                          tech: '',
                          demoUrl: '',
                          githubUrl: '',
                          image: '',
                          longDescription: ''
                        });
                        setProjectDialogOpen(true);
                      }}
                      className="flex items-center gap-1 bg-accent-cyan text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs hover:scale-[1.01] transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add Project
                    </button>
                  </div>

                  {/* Glass table listings */}
                  <div className={`overflow-x-auto rounded-2xl border ${
                    darkMode ? 'bg-slate-900/45 border-white/5' : 'bg-white border-slate-200'
                  }`}>
                    <table className="w-full text-left font-sans text-sm">
                      <thead className={`border-b text-xs font-mono uppercase tracking-widest ${
                        darkMode ? 'border-white/5 bg-slate-905' : 'border-slate-200 bg-slate-50'
                      }`}>
                        <tr>
                          <th className="p-4">Project Title</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Metrics</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {projects.map(p => (
                          <tr key={p.id} className={darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                            <td className="p-4 font-bold font-display">{p.name}</td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-white/5 border border-white/10 rounded-full text-accent-cyan uppercase">
                                {p.category}
                              </span>
                            </td>
                            <td className="p-4 font-mono text-xs text-slate-400">
                              <span className="mr-3">{p.views} views</span>
                              <span>{p.likes} likes</span>
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => handleOpenEditProject(p)}
                                className={`p-2 rounded-lg border transition-all ${
                                  darkMode ? 'border-white/10 text-slate-300 hover:bg-white/5' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                                }`}
                                title="Edit project"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => onDeleteProject(p.id)}
                                className="p-2 rounded-lg border border-rose-500/10 text-rose-400 hover:bg-rose-500/10 transition-all"
                                title="Delete project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* TAB BLOGS: MANAGE INSIGHTS */}
              {!isPending && activeTab === 'blogs' && (
                <motion.div
                  key="blogs-out"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold font-display text-base">Markdown Articles</h4>
                      <p className="text-xs text-slate-400 font-mono">Write and publish developer insights</p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingBlogId(null);
                        setBlogForm({
                          title: '',
                          brief: '',
                          content: '',
                          tags: '',
                          readTime: '6 min read'
                        });
                        setBlogDialogOpen(true);
                      }}
                      className="flex items-center gap-1 bg-accent-cyan text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs hover:scale-[1.01] transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add Article
                    </button>
                  </div>

                  {/* Glass list */}
                  <div className={`overflow-x-auto rounded-2xl border ${
                    darkMode ? 'bg-slate-900/45 border-white/5' : 'bg-white border-slate-200'
                  }`}>
                    <table className="w-full text-left font-sans text-sm">
                      <thead className={`border-b text-xs font-mono uppercase tracking-widest ${
                        darkMode ? 'border-white/5' : 'border-slate-200 bg-slate-50'
                      }`}>
                        <tr>
                          <th className="p-4">Post Title</th>
                          <th className="p-4">Tags</th>
                          <th className="p-4">Published</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {blogs.map(b => (
                          <tr key={b.id} className={darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                            <td className="p-4 font-bold font-display max-w-xs truncate">{b.title}</td>
                            <td className="p-4">
                              <span className="text-xs font-mono text-slate-400">
                                {b.tags.join(', ')}
                              </span>
                            </td>
                            <td className="p-4 font-mono text-xs text-slate-400">{b.date}</td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => handleOpenEditBlog(b)}
                                className={`p-2 rounded-lg border transition-all ${
                                  darkMode ? 'border-white/10 text-slate-300 hover:bg-white/5' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                                }`}
                                title="Edit post"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => onDeleteBlogPost(b.id)}
                                className="p-2 rounded-lg border border-rose-500/10 text-rose-400 hover:bg-rose-500/10 transition-all"
                                title="Delete post"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* TAB MESSAGES: ENQUIRIES LOG */}
              {!isPending && activeTab === 'messages' && (
                <motion.div
                  key="messages-out"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h4 className="font-bold font-display text-base">Client Enquiry Inbox</h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">Contact enquiries received statically / buffered dynamically from the frontend contact card</p>
                  </div>

                  {messages.length > 0 ? (
                    <div className="space-y-4">
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 transition-all ${
                            m.status === 'unread'
                              ? darkMode
                                ? 'bg-gradient-to-r from-primary-blue/10 to-transparent border-primary-blue/30'
                                : 'bg-blue-50 border-primary-blue/20'
                              : darkMode ? 'bg-slate-900/40 border-white/5' : 'bg-white border-slate-200 shadow-sm'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h5 className="font-bold font-display text-sm sm:text-base">{m.name}</h5>
                                <span className={`px-2 py-0.5 text-[8px] font-mono tracking-wider rounded-md ${
                                  m.status === 'unread'
                                    ? 'bg-primary-blue/20 text-primary-blue'
                                    : m.status === 'replied' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-400'
                                }`}>
                                  {m.status.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-xs font-mono text-slate-400">{m.email} — {m.date}</p>
                            </div>

                            <div className="flex gap-2">
                              {m.status === 'unread' && (
                                <button
                                  onClick={() => onMarkMessageStatus(m.id, 'read')}
                                  className="p-1 px-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase transition-colors"
                                >
                                  Read
                                </button>
                              )}
                              {m.status !== 'replied' && (
                                <button
                                  onClick={() => onMarkMessageStatus(m.id, 'replied')}
                                  className="p-1 px-2.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono font-bold uppercase transition-colors"
                                >
                                  replied
                                </button>
                              )}
                              <button
                                onClick={() => onDeleteMessage(m.id)}
                                className="p-1 text-rose-400 hover:text-rose-350"
                                title="Delete enquiry log record"
                              >
                                <Trash2 className="w-4.5 h-4.5" />
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2 pt-3 border-t border-white/5">
                            <p className="text-xs font-mono font-bold uppercase tracking-wider text-accent-cyan">Subject: {m.subject}</p>
                            <p className={`text-sm leading-relaxed ${
                              darkMode ? 'text-slate-300' : 'text-slate-600'
                            }`}>
                              "{m.message}"
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center rounded-2xl border border-dashed border-white/10 bg-white/5">
                      <p className="text-sm font-mono text-slate-400">Enquiry logs inbox currently clear.</p>
                    </div>
                  )}
                </motion.div>
              )}

              {!isPending && activeTab === 'security' && (
                <motion.div
                  key="security-pane"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className={`p-6 rounded-2xl border ${
                    darkMode ? 'bg-slate-900/60 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-950 shadow-sm'
                  }`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-xl bg-[#FFAA00]/10 text-[#FFAA00] border border-[#FFAA00]/25">
                        <Shield className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-base font-display font-semibold">Change Master Passcode</h4>
                        <p className="text-xs text-slate-400">Regularly update your local master code credentials to prevent unauthorized edits.</p>
                      </div>
                    </div>

                    <form onSubmit={handlePasswordChangeSubmit} className="space-y-4 max-w-sm mt-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono tracking-wider text-slate-400 uppercase block">Current Passcode</label>
                        <input
                          type="password"
                          value={currentPasscode}
                          onChange={(e) => setCurrentPasscode(e.target.value)}
                          placeholder="••••••••"
                          className={`w-full h-10 px-3.5 text-sm rounded-lg border font-mono focus:outline-none focus:ring-1 ${
                            darkMode 
                              ? 'bg-[#0f2412] border-white/10 text-white focus:border-[#FFAA00] focus:ring-[#FFAA00]' 
                              : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#237227] focus:ring-[#237227]'
                          }`}
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono tracking-wider text-slate-400 uppercase block">New Master Passcode</label>
                        <input
                          type="password"
                          value={newPasscode}
                          onChange={(e) => setNewPasscode(e.target.value)}
                          placeholder="At least 4 characters"
                          className={`w-full h-10 px-3.5 text-sm rounded-lg border font-mono focus:outline-none focus:ring-1 ${
                            darkMode 
                              ? 'bg-[#0f2412] border-white/10 text-white focus:border-[#FFAA00] focus:ring-[#FFAA00]' 
                              : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#237227] focus:ring-[#237227]'
                          }`}
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono tracking-wider text-slate-400 uppercase block">Confirm New Passcode</label>
                        <input
                          type="password"
                          value={confirmNewPasscode}
                          onChange={(e) => setConfirmNewPasscode(e.target.value)}
                          placeholder="Repeat new passcode"
                          className={`w-full h-10 px-3.5 text-sm rounded-lg border font-mono focus:outline-none focus:ring-1 ${
                            darkMode 
                              ? 'bg-[#0f2412] border-white/10 text-white focus:border-[#FFAA00] focus:ring-[#FFAA00]' 
                              : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#237227] focus:ring-[#237227]'
                          }`}
                          required
                        />
                      </div>

                      {pwError && (
                        <p className="text-xs text-rose-400 font-mono font-semibold mt-2">Error: {pwError}</p>
                      )}

                      {pwSuccess && (
                        <p className="text-xs text-emerald-400 font-mono font-semibold mt-2">Success: Passcode updated successfully.</p>
                      )}

                      <button
                        type="submit"
                        className="h-10 px-6 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#FFAA00] to-[#FFD786] hover:opacity-90 shadow transition-all cursor-pointer"
                      >
                        Commit Passcode Change
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* MODAL: ADD / EDIT SHOWCASE PROJECT */}
      <AnimatePresence>
        {projectDialogOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProjectDialogOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border z-20 ${
                darkMode ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="p-5 bg-gradient-to-r from-primary-blue to-accent-cyan text-white flex items-center justify-between">
                <h3 className="font-bold font-display text-lg">{editingProjectId ? 'Modify Project Case Study' : 'Map New Showcase Project'}</h3>
                <button onClick={() => setProjectDialogOpen(false)} className="text-white hover:opacity-80">
                  <X className="w-5 h-5 cursor-pointer" />
                </button>
              </div>

              <form onSubmit={handleProjectSubmit} className="p-6 max-h-[65vh] overflow-y-auto space-y-4 text-sm">
                
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase">Project Title</label>
                  <input
                    type="text"
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border outline-none ${
                      darkMode ? 'bg-slate-950 border-white/10 text-white focus:border-accent-cyan' : 'bg-slate-50 border-slate-200 text-slate-950 focus:border-primary-blue'
                    }`}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase">Category</label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border outline-none ${
                        darkMode ? 'bg-slate-950 border-white/10 text-slate-200 focus:border-accent-cyan' : 'bg-slate-50 border-slate-200 text-slate-950 focus:border-primary-blue'
                      }`}
                    >
                      <option value="Web Applications">Web Applications</option>
                      <option value="SaaS Platforms">SaaS Platforms</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="Dashboards">Dashboards</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={projectForm.tech}
                      onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                      placeholder="React, Next, Go"
                      className={`w-full px-3.5 py-2.5 rounded-xl border outline-none ${
                        darkMode ? 'bg-slate-950 border-white/10 text-white focus:border-accent-cyan' : 'bg-slate-50 border-slate-200 text-slate-950'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase">Short Description Brief</label>
                  <input
                    type="text"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border outline-none ${
                      darkMode ? 'bg-slate-950 border-white/10 text-white focus:border-accent-cyan' : 'bg-slate-50 border-slate-200 text-slate-950'
                    }`}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase">Expanded Case Study Details</label>
                  <textarea
                    rows={4}
                    value={projectForm.longDescription}
                    onChange={(e) => setProjectForm({ ...projectForm, longDescription: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border outline-none resize-none ${
                      darkMode ? 'bg-slate-950 border-white/10 text-white focus:border-accent-cyan' : 'bg-slate-50 border-slate-200 text-slate-950'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase">Demo Link URL</label>
                    <input
                      type="text"
                      value={projectForm.demoUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border outline-none ${
                        darkMode ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase">GitHub Link URL</label>
                    <input
                      type="text"
                      value={projectForm.githubUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border outline-none ${
                        darkMode ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase">Card Image Preview Link</label>
                  <input
                    type="text"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    placeholder="/src/assets/images/saas_dashboard_preview_1781844175428.jpg or CDN Urls"
                    className={`w-full px-3.5 py-2.5 rounded-xl border outline-none ${
                      darkMode ? 'bg-slate-950 border-white/10 text-white focus:border-accent-cyan' : 'bg-slate-50 border-slate-250'
                    }`}
                  />
                </div>

                <div className="flex gap-4 pt-4 justify-end border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setProjectDialogOpen(false)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs border ${
                      darkMode ? 'border-white/10 hover:bg-white/5 text-slate-400' : 'border-slate-250 text-slate-600 hover:bg-slate-100'
                    } cursor-pointer`}
                  >
                    Dismiss
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-primary-blue to-accent-cyan text-white rounded-xl font-bold text-xs hover:opacity-95 transition-all cursor-pointer"
                  >
                    Save Project Grid
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD / EDIT BLOG POSTS  */}
      <AnimatePresence>
        {blogDialogOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBlogDialogOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border z-20 ${
                darkMode ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="p-5 bg-gradient-to-r from-primary-blue to-accent-cyan text-white flex items-center justify-between">
                <h3 className="font-bold font-display text-lg">{editingBlogId ? 'Edit Markdown BlogPost' : 'Compose Blog Article'}</h3>
                <button onClick={() => setBlogDialogOpen(false)} className="text-white hover:opacity-80">
                  <X className="w-5 h-5 cursor-pointer" />
                </button>
              </div>

              <form onSubmit={handleBlogSubmit} className="p-6 max-h-[65vh] overflow-y-auto space-y-4 text-sm">
                
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase">Article Title</label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border outline-none ${
                      darkMode ? 'bg-slate-950 border-white/10 text-white focus:border-accent-cyan' : 'bg-slate-50 border-slate-200 text-slate-950 focus:border-primary-blue'
                    }`}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={blogForm.tags}
                      onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                      placeholder="React, Web, performance"
                      className={`w-full px-3.5 py-2.5 rounded-xl border outline-none ${
                        darkMode ? 'bg-slate-950 border-white/10 text-white Focus:border-accent-cyan' : 'bg-slate-50 border-slate-200 text-slate-950'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase">Read Estimation</label>
                    <input
                      type="text"
                      value={blogForm.readTime}
                      onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border outline-none ${
                        darkMode ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase">Brief Summary Line</label>
                  <input
                    type="text"
                    value={blogForm.brief}
                    onChange={(e) => setBlogForm({ ...blogForm, brief: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border outline-none ${
                      darkMode ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>

                <div className="space-y-1.5 font-sans">
                  <label className="text-xs font-mono font-bold uppercase">Markdown Body content</label>
                  <div className="flex gap-1.5 text-[9px] font-mono opacity-50 uppercase tracking-widest pb-1">
                    <span>Markdown supported: ## Heading2 | ### Heading3 | - list line</span>
                  </div>
                  <textarea
                    rows={8}
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    placeholder="## The Ultimate Guide to Docker Compose..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border font-mono text-xs outline-none resize-none ${
                      darkMode ? 'bg-slate-950 border-white/10 text-white focus:border-accent-cyan' : 'bg-slate-50 border-slate-200 text-slate-950'
                    }`}
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4 justify-end border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setBlogDialogOpen(false)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs border ${
                      darkMode ? 'border-white/10 hover:bg-white/5 text-slate-400' : 'border-slate-250 text-slate-600 hover:bg-slate-100'
                    } cursor-pointer`}
                  >
                    Dismiss
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-primary-blue to-accent-cyan text-white rounded-xl font-bold text-xs hover:opacity-95 transition-all cursor-pointer"
                  >
                    Deploy Article
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
