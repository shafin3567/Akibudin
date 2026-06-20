import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Timeline from './components/Timeline';
import GithubStats from './components/GithubStats';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Blog from './components/Blog';
import Dashboard from './components/Dashboard';
import SecurityGate from './components/SecurityGate';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';

import { Project, BlogPost, Message, AnalyticsStats } from './types';
import { DEFAULT_PROJECTS, DEFAULT_BLOGS, INITIAL_ANALYTICS } from './data';
import { soundSystem } from './utils/sound';

import { Sparkles, Terminal, Lock } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [cursorEnabled, setCursorEnabled] = useState(true);

  // Register premium global audio feedback listeners on interactive node states
  useEffect(() => {
    let lastHoveredElement: Element | null = null;

    const handleGlobalMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest('button, a, [role="button"], input, select, textarea, .interactive-card, [onclick]');
      if (interactive) {
        if (interactive !== lastHoveredElement) {
          lastHoveredElement = interactive;
          soundSystem.playHover();
        }
      } else {
        lastHoveredElement = null;
      }
    };

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest('button, a, [role="button"], input[type="submit"], input[type="button"], .cursor-pointer');
      if (interactive) {
        soundSystem.playClick();
      }
    };

    window.addEventListener('mouseover', handleGlobalMouseOver);
    window.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('mouseover', handleGlobalMouseOver);
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const [activeView, setActiveView] = useState<'portfolio' | 'dashboard'>('portfolio');
  const [isDashboardUnlocked, setIsDashboardUnlocked] = useState(false);

  // Core synchronized lists
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsStats>(INITIAL_ANALYTICS);

  // Initialize and load from local storage
  useEffect(() => {
    // 1. Initial compiled loading delay
    const loadTimer = setTimeout(() => {
      setLoading(false);
    }, 1800); // 1.8s high-end compiler simulation

    // 2. Load Dark Mode
    const savedTheme = localStorage.getItem('portfolio-dark-mode');
    if (savedTheme !== null) {
      setDarkMode(savedTheme === 'true');
    }

    // 3. Load Cursor Setting
    const savedCursor = localStorage.getItem('custom-cursor-enabled');
    if (savedCursor !== null) {
      setCursorEnabled(savedCursor === 'true');
    }

    // 4. Projects list hydration
    const savedProjects = localStorage.getItem('portfolio-projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(DEFAULT_PROJECTS);
      localStorage.setItem('portfolio-projects', JSON.stringify(DEFAULT_PROJECTS));
    }

    // 5. Blogs list hydration
    const savedBlogs = localStorage.getItem('portfolio-blogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      setBlogs(DEFAULT_BLOGS);
      localStorage.setItem('portfolio-blogs', JSON.stringify(DEFAULT_BLOGS));
    }

    // 6. Contact inquiries logs hydration
    const savedMessages = localStorage.getItem('portfolio-messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Pre-seed some default inquiries to match dashboard analytics metrics
      const seeds: Message[] = [
        {
          id: 'msg-seed-1',
          name: 'Sarah Vance',
          email: 'sarah@saasify.org',
          subject: 'SaaS Metric Integration Case',
          message: 'Hi Akib, we noticed your scale-to-zero microservice graphs on Apex Analytics. We would love to discuss custom consulting for our cluster rewrite.',
          date: 'Jun 15, 2026',
          status: 'unread'
        },
        {
          id: 'msg-seed-2',
          name: 'Marcus Thorne',
          email: 'founder@solstice.fund',
          subject: 'Crypto chart optimization request',
          message: 'Excellent portfolio Satej. Your custom SVG rendering latency is extremely impressive. Do you accept contract consulting projects with modern React/Next.js frameworks?',
          date: 'Jun 14, 2026',
          status: 'read'
        }
      ];
      setMessages(seeds);
      localStorage.setItem('portfolio-messages', JSON.stringify(seeds));
    }

    // 7. Stats hydration
    const savedStats = localStorage.getItem('portfolio-stats');
    if (savedStats) {
      setAnalytics(JSON.parse(savedStats));
    } else {
      setAnalytics(INITIAL_ANALYTICS);
    }

    return () => clearTimeout(loadTimer);
  }, []);

  // Update Theme variables on standard document node
  useEffect(() => {
    const htmlNode = document.documentElement;
    if (darkMode) {
      htmlNode.classList.add('dark');
      htmlNode.style.backgroundColor = '#0b1a0d';
    } else {
      htmlNode.classList.remove('dark');
      htmlNode.style.backgroundColor = '#FCFCFD';
    }
    localStorage.setItem('portfolio-dark-mode', String(darkMode));
  }, [darkMode]);

  // Project Likes Handler
  const handleLikeProject = (id: string) => {
    const next = projects.map(p => {
      if (p.id === id) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    });
    setProjects(next);
    localStorage.setItem('portfolio-projects', JSON.stringify(next));

    // Update cumulative analytic stats
    const updatedStats = { ...analytics, totalViews: analytics.totalViews + 1 };
    setAnalytics(updatedStats);
    localStorage.setItem('portfolio-stats', JSON.stringify(updatedStats));
  };

  // Project Views Tracker
  const handleViewProject = (id: string) => {
    const next = projects.map(p => {
      if (p.id === id) {
        return { ...p, views: p.views + 1 };
      }
      return p;
    });
    setProjects(next);
    localStorage.setItem('portfolio-projects', JSON.stringify(next));

    // Update cumulative analytic metrics
    const updatedStats = { 
      ...analytics, 
      totalViews: analytics.totalViews + 1,
      projectViews: analytics.projectViews + 1 
    };
    setAnalytics(updatedStats);
    localStorage.setItem('portfolio-stats', JSON.stringify(updatedStats));
  };

  // Blog Likes Handler
  const handleLikeBlog = (id: string) => {
    const next = blogs.map(b => {
      if (b.id === id) {
        return { ...b, likes: b.likes + 1 };
      }
      return b;
    });
    setBlogs(next);
    localStorage.setItem('portfolio-blogs', JSON.stringify(next));

    // Update cumulative analytic stats
    const updatedStats = { ...analytics, totalViews: analytics.totalViews + 1 };
    setAnalytics(updatedStats);
    localStorage.setItem('portfolio-stats', JSON.stringify(updatedStats));
  };

  // Blog Views Tracker
  const handleViewBlog = (id: string) => {
    const next = blogs.map(b => {
      if (b.id === id) {
        return { ...b, views: b.views + 1 };
      }
      return b;
    });
    setBlogs(next);
    localStorage.setItem('portfolio-blogs', JSON.stringify(next));

    // Update cumulative analytics
    const updatedStats = {
      ...analytics,
      totalViews: analytics.totalViews + 1,
      blogViews: analytics.blogViews + 1
    };
    setAnalytics(updatedStats);
    localStorage.setItem('portfolio-stats', JSON.stringify(updatedStats));
  };

  // Messages form relay handler
  const handleNewMessage = (msg: Omit<Message, 'id' | 'date' | 'status'>) => {
    const newInquiry: Message = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'unread'
    };

    const next = [newInquiry, ...messages];
    setMessages(next);
    localStorage.setItem('portfolio-messages', JSON.stringify(next));

    // Update telemetry daily metrics list
    const updatedStats = {
      ...analytics,
      messagesReceived: analytics.messagesReceived + 1,
      totalViews: analytics.totalViews + 1
    };
    setAnalytics(updatedStats);
    localStorage.setItem('portfolio-stats', JSON.stringify(updatedStats));
  };

  const handleMarkMessageStatus = (id: string, status: Message['status']) => {
    const next = messages.map(m => {
      if (m.id === id) {
        return { ...m, status };
      }
      return m;
    });
    setMessages(next);
    localStorage.setItem('portfolio-messages', JSON.stringify(next));
  };

  const handleDeleteMessage = (id: string) => {
    const next = messages.filter(m => m.id !== id);
    setMessages(next);
    localStorage.setItem('portfolio-messages', JSON.stringify(next));
  };

  // Dynamic Content Operations (Dashboard interactions)
  const handleAddProject = (p: Omit<Project, 'id' | 'views' | 'likes'>) => {
    const newProj: Project = {
      ...p,
      id: `proj-${Date.now()}`,
      views: 0,
      likes: 0
    };
    const next = [newProj, ...projects];
    setProjects(next);
    localStorage.setItem('portfolio-projects', JSON.stringify(next));
  };

  const handleEditProject = (id: string, p: Partial<Project>) => {
    const next = projects.map(proj => {
      if (proj.id === id) {
        return { ...proj, ...p };
      }
      return proj;
    });
    setProjects(next);
    localStorage.setItem('portfolio-projects', JSON.stringify(next));
  };

  const handleDeleteProject = (id: string) => {
    const next = projects.filter(p => p.id !== id);
    setProjects(next);
    localStorage.setItem('portfolio-projects', JSON.stringify(next));
  };

  const handleAddBlogPost = (b: Omit<BlogPost, 'id' | 'views' | 'likes' | 'author'>) => {
    const newBlog: BlogPost = {
      ...b,
      id: `blog-${Date.now()}`,
      author: 'Md. Akib Uddin Satej',
      views: 0,
      likes: 0
    };
    const next = [newBlog, ...blogs];
    setBlogs(next);
    localStorage.setItem('portfolio-blogs', JSON.stringify(next));
  };

  const handleEditBlogPost = (id: string, b: Partial<BlogPost>) => {
    const next = blogs.map(blog => {
      if (blog.id === id) {
        return { ...blog, ...b };
      }
      return blog;
    });
    setBlogs(next);
    localStorage.setItem('portfolio-blogs', JSON.stringify(next));
  };

  const handleDeleteBlogPost = (id: string) => {
    const next = blogs.filter(b => b.id !== id);
    setBlogs(next);
    localStorage.setItem('portfolio-blogs', JSON.stringify(next));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#0b1a0d] text-white font-mono p-4">
        <div className="max-w-md w-full text-center space-y-6">
          {/* Animated terminal block wrapper */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-blue via-secondary-purple to-accent-cyan mx-auto flex items-center justify-center animate-spin">
            <Terminal className="w-8 h-8 text-white rotate-12" />
          </div>

          <div className="space-y-2">
            <h3 className="font-display font-extrabold text-2xl tracking-tight bg-gradient-to-r from-primary-blue via-secondary-purple to-accent-cyan bg-clip-text text-transparent">
              MIPS AKIB-SATEJ PORTFOLIO
            </h3>
            <p className="text-xs text-slate-400 uppercase tracking-widest leading-none font-bold">
              Compiling system elements...
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5 flex gap-2">
            <Lock className="w-4 h-4 text-accent-cyan shrink-0 animate-pulse" />
            <div className="text-left text-[10px] text-slate-400 space-y-1">
              <p className="font-bold text-accent-cyan">STATION DIRECTORY HYDRATED</p>
              <p>TLS security proxy tunnels verified online.</p>
              <p>Buffer matrix initialized dynamically inside workspace.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0b1a0d] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Custom Floating Cursor Trailer element */}
      <CustomCursor />

      {/* Sticky Top Progress Header */}
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenDashboard={() => setActiveView(activeView === 'portfolio' ? 'dashboard' : 'portfolio')}
        cursorEnabled={cursorEnabled}
        setCursorEnabled={setCursorEnabled}
      />

      {/* RENDER ACTIVE SCREEN CONTROLLERS */}
      {activeView === 'portfolio' ? (
        /* CORE PORTFOLIO SCREEN VIEW */
        <main>
          {/* 1. Hero visual landing */}
          <Hero darkMode={darkMode} />

          {/* 2. About Me details */}
          <About darkMode={darkMode} />

          {/* 3. Skills meters */}
          <Skills darkMode={darkMode} />

          {/* 4. Service Solutions list */}
          <Services darkMode={darkMode} />

          {/* 5. Portfolio Showcase Filterable Gallery */}
          <Portfolio
            darkMode={darkMode}
            projects={projects}
            onLikeProject={handleLikeProject}
            onViewProject={handleViewProject}
          />

          {/* 6. Professional path Experience timeline */}
          <Timeline darkMode={darkMode} />

          {/* 7. Live Github activities log stats */}
          <GithubStats darkMode={darkMode} />

          {/* 8. Carousel Client Testimonials feedback */}
          <Testimonials darkMode={darkMode} />

          {/* 9. Markdown blog integration list */}
          <Blog
            darkMode={darkMode}
            blogs={blogs}
            onLikeBlog={handleLikeBlog}
            onViewBlog={handleViewBlog}
          />

          {/* 10. Forms message relay contact panel */}
          <Contact
            darkMode={darkMode}
            onNewMessage={handleNewMessage}
          />
        </main>
      ) : (
        /* ADMIN CONTROL AND WORKSPACE ANALYTICS SCREEN VIEW */
        <main>
          {!isDashboardUnlocked ? (
            <SecurityGate 
              onUnlock={() => setIsDashboardUnlocked(true)} 
              darkMode={darkMode} 
            />
          ) : (
            <Dashboard
              darkMode={darkMode}
              projects={projects}
              blogs={blogs}
              messages={messages}
              analytics={analytics}
              onAddProject={handleAddProject}
              onEditProject={handleEditProject}
              onDeleteProject={handleDeleteProject}
              onAddBlogPost={handleAddBlogPost}
              onEditBlogPost={handleEditBlogPost}
              onDeleteBlogPost={handleDeleteBlogPost}
              onMarkMessageStatus={handleMarkMessageStatus}
              onDeleteMessage={handleDeleteMessage}
              onLock={() => setIsDashboardUnlocked(false)}
            />
          )}
        </main>
      )}

      {/* Global standard copyright / backlinks footer bar */}
      <Footer darkMode={darkMode} />
    </div>
  );
}
