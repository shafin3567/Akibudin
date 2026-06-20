import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Briefcase, ChevronDown, ChevronUp, MapPin, Award } from 'lucide-react';
import { DEFAULT_TIMELINE } from '../data';
import AnimatedHeading from './AnimatedHeading';

interface TimelineProps {
  darkMode: boolean;
}

export default function Timeline({ darkMode }: TimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>('time-1'); // Default first expanded

  return (
    <section
      id="timeline"
      className={`py-20 md:py-28 relative ${
        darkMode ? 'bg-[#0b1a0d] text-white' : 'bg-white text-slate-950'
      }`}
    >
      <div className="absolute top-[40%] left-[2%] w-[300px] h-[300px] bg-secondary-purple/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedHeading
            text="Professional Path"
            tag="h2"
            className="text-xs font-mono font-bold tracking-widest text-secondary-purple uppercase"
          />
          <p className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight mt-2.5">
            Experience Timeline
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-secondary-purple to-accent-cyan mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l-2 border-slate-800 dark:border-slate-800 light:border-slate-200 ml-4 md:ml-32 space-y-12">
          
          {DEFAULT_TIMELINE.map((evt, idx) => {
            const isExpanded = expandedId === evt.id;
            
            return (
              <div key={evt.id} className="relative pl-8 md:pl-12 group">
                
                {/* Timeline year node on large screens */}
                <div className="absolute hidden md:flex items-center justify-end -left-36 top-1 text-right w-28">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-cyan flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    {evt.year.split(' ')[0]}
                  </span>
                </div>

                {/* Timeline center bullet */}
                <div className={`absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  isExpanded 
                    ? 'bg-accent-cyan border-accent-cyan scale-110 shadow-[0_0_12px_rgba(6,182,212,0.8)]' 
                    : 'bg-slate-950 border-slate-700 hover:border-accent-cyan'
                }`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                </div>

                {/* Interactive Card */}
                <div 
                  onClick={() => setExpandedId(isExpanded ? null : evt.id)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isExpanded 
                      ? darkMode 
                        ? 'border-accent-cyan bg-slate-900 shadow-xl' 
                        : 'border-primary-blue bg-slate-50 shadow-md'
                      : darkMode 
                        ? 'border-white/5 bg-slate-900/40 hover:bg-slate-900' 
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <span className="md:hidden inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-accent-cyan tracking-wider uppercase mb-1">
                        <Calendar className="w-3 h-3" />
                        {evt.year}
                      </span>
                      
                      <h3 className="text-lg sm:text-xl font-bold font-display tracking-tight hover:text-accent-cyan transition-colors">
                        {evt.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono tracking-wide text-slate-400 font-medium">
                        {evt.subtitle}
                      </p>
                    </div>

                    <button 
                      className={`p-1.5 rounded-lg border text-slate-400 transition-colors ${
                        darkMode ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className={`text-sm mt-3 leading-relaxed ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {evt.description}
                  </p>

                  {/* Achievements section - expanded only */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5 mt-5 border-t border-white/5 space-y-3.5">
                          <h4 className="text-xs font-mono font-bold tracking-widest text-accent-cyan uppercase flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-secondary-purple" />
                            Core Achievements
                          </h4>
                          <ul className="space-y-2 list-none">
                            {evt.accomplishments.map((ac, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-350 leading-relaxed font-normal">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary-purple mt-2 shrink-0" />
                                <span>{ac}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
