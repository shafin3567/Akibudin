import React, { useState, useEffect } from 'react';
import { Sun, Moon, MousePointer, Menu, X, LayoutDashboard, Star, FileText } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
  onOpenDashboard: () => void;
  cursorEnabled: boolean;
  setCursorEnabled: (enabled: boolean) => void;
}

export default function Navbar({
  darkMode,
  toggleDarkMode,
  activeView,
  setActiveView,
  onOpenDashboard,
  cursorEnabled,
  setCursorEnabled,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled shadow effect
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Calculate Scroll Progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    setActiveView('portfolio'); // Back to main portfolio view if they were in dashboard
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80; // height of sticky navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const toggleCursorSetting = () => {
    const next = !cursorEnabled;
    setCursorEnabled(next);
    localStorage.setItem('custom-cursor-enabled', String(next));
    window.dispatchEvent(new CustomEvent('toggle-custom-cursor', { detail: next }));
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'portfolio' },
    { label: 'Timeline', id: 'timeline' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? 'bg-[#0b1a0d]/80 backdrop-blur-md border-b border-white/5 shadow-2xl'
            : 'bg-white/85 backdrop-blur-md border-b border-slate-200/50 shadow-md'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div 
        className="h-[3px] bg-gradient-to-r from-primary-blue via-secondary-purple to-accent-cyan transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand Name */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-blue via-secondary-purple to-accent-cyan flex items-center justify-center font-display font-bold text-white text-lg mr-2.5 transition-transform duration-300 group-hover:rotate-12">
              A
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-semibold text-base leading-none transition-colors ${
                darkMode ? 'text-white group-hover:text-accent-cyan' : 'text-slate-900 group-hover:text-primary-blue'
              }`}>
                Akib Satej
              </span>
              <span className="text-[10px] font-mono tracking-wider opacity-60 mt-0.5 uppercase">
                Full-Stack Dev
              </span>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeView === 'portfolio'
                    ? darkMode
                      ? 'text-slate-300 hover:text-white hover:bg-white/5'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                    : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            {/* Custom Cursor Toggle */}
            <button
              onClick={toggleCursorSetting}
              title={cursorEnabled ? 'Disable custom cursor' : 'Enable custom cursor'}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                cursorEnabled
                  ? darkMode
                    ? 'bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan'
                    : 'bg-primary-blue/10 border-primary-blue/30 text-primary-blue'
                  : darkMode
                    ? 'border-white/10 text-slate-400 hover:bg-white/5'
                    : 'border-slate-200 text-slate-500 hover:bg-slate-100'
              }`}
            >
              <MousePointer className="w-4.5 h-4.5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                darkMode
                  ? 'border-white/10 text-slate-300 hover:bg-white/5'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Content Dashboard Button */}
            <button
              onClick={onOpenDashboard}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm cursor-pointer ${
                activeView === 'dashboard'
                  ? 'bg-gradient-to-r from-primary-blue to-secondary-purple text-white'
                  : darkMode
                    ? 'bg-slate-900 hover:bg-slate-850 text-slate-200 border border-white/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-250'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{activeView === 'dashboard' ? 'Dashboard' : 'Admin Panel'}</span>
            </button>
          </div>

          {/* Mobile Menu Action Row */}
          <div className="flex md:hidden items-center space-x-1.5">
            {/* Quick dark mode toggler on mobile */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                darkMode ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-600'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Quick Admin toggler on mobile */}
            <button
              onClick={onOpenDashboard}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                activeView === 'dashboard'
                  ? 'bg-accent-cyan/10 border-accent-cyan/35 text-accent-cyan'
                  : darkMode ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>

            {/* Drawer trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border cursor-pointer ${
                darkMode ? 'border-white/15 text-slate-300' : 'border-slate-200 text-slate-600'
              }`}
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          className={`md:hidden absolute top-16 left-0 w-full border-b transition-all duration-300 ${
            darkMode 
              ? 'bg-[#0b1a0d] border-white/10 text-slate-300' 
              : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          <div className="px-4 py-4 space-y-2.5 flex flex-col">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  darkMode ? 'hover:bg-white/5 text-slate-300' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                {link.label}
              </button>
            ))}

            <hr className={darkMode ? 'border-white/5' : 'border-slate-100'} />
            
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-mono opacity-60">Custom Cursor</span>
              <button
                onClick={toggleCursorSetting}
                className={`text-xs px-3 py-1.5 rounded border ${
                  cursorEnabled 
                    ? 'bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan' 
                    : darkMode ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'
                }`}
              >
                {cursorEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
