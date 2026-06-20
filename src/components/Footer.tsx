import React, { useState } from 'react';
import { ArrowUp, Github, Linkedin, Facebook, Twitter, Heart, Volume2, VolumeX } from 'lucide-react';
import { soundSystem } from '../utils/sound';

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  const [soundActive, setSoundActive] = useState(soundSystem.isEnabled());
  
  const handleToggleSound = () => {
    const nextVal = soundSystem.toggle();
    setSoundActive(nextVal);
    if (nextVal) {
      soundSystem.playClick();
    }
  };
  
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  const handleLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer
      className={`py-12 relative border-t ${
        darkMode ? 'bg-[#0b1a0d] text-white border-white/5' : 'bg-white text-slate-950 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo Brand info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1.5">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-blue via-secondary-purple to-accent-cyan flex items-center justify-center font-display font-black text-white text-md mr-2.5">
                A
              </div>
              <span className="font-display font-bold text-base">Akib Satej</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              High-Perf Web Solutions Blueprinting — Bangladesh Tech
            </p>
          </div>

          {/* Quick links Row */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3.5 text-xs font-medium text-slate-400 font-display">
            {['hero', 'about', 'services', 'portfolio', 'timeline', 'blog', 'contact'].map(linkId => (
              <button
                key={linkId}
                onClick={() => handleLinkClick(linkId)}
                className="hover:text-accent-cyan transition-colors uppercase tracking-wider cursor-pointer"
              >
                {linkId === 'hero' ? 'Home' : linkId === 'portfolio' ? 'Projects' : linkId}
              </button>
            ))}
          </div>

          {/* Custom Back To Top and Ambient Sound Float buttons directly on footer */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSound}
              title={soundActive ? "Mute interactive audio cues" : "Unmute interactive audio cues"}
              className={`p-3 rounded-xl border transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center ${
                darkMode ? 'border-zinc-800 bg-slate-900 text-slate-300 hover:bg-slate-850' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 shadow-sm'
              }`}
            >
              {soundActive ? (
                <Volume2 className="w-4 h-4 text-accent-cyan" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            <button
              onClick={handleBackToTop}
              title="Return to peak of document"
              className={`p-3 rounded-xl border transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center ${
                darkMode ? 'border-zinc-800 bg-slate-900 text-slate-300 hover:bg-slate-850' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 shadow-sm'
              }`}
            >
              <ArrowUp className="w-4 h-4 text-accent-cyan" />
            </button>
          </div>

        </div>

        {/* Divider and Copy segment */}
        <hr className={`my-8 ${darkMode ? 'border-white/5' : 'border-slate-100'}`} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] sm:text-xs opacity-65 text-center">
          <p>© {currentYear} Md. Akib Uddin Satej. All Rights secure.</p>
          <p className="flex items-center justify-center gap-1">
            Formed with
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            for ultra-performing responsive engineering.
          </p>
        </div>

      </div>
    </footer>
  );
}
