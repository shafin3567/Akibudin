import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { DEFAULT_SERVICES } from '../data';
import { Service } from '../types';
import AnimatedHeading from './AnimatedHeading';
import TiltElement from './TiltElement';

interface ServicesProps {
  darkMode: boolean;
}

export default function Services({ darkMode }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Dynamic Lucide rendering helper
  const renderIcon = (name: string) => {
    const IconComponent = (LucideIcons as any)[name];
    if (!IconComponent) return <LucideIcons.HelpCircle className="w-6 h-6 text-accent-cyan" />;
    return <IconComponent className="w-6 h-6 text-accent-cyan" />;
  };

  return (
    <section
      id="services"
      className={`py-20 md:py-28 relative ${
        darkMode ? 'bg-[#0b1a0d] text-white' : 'bg-white text-slate-950'
      }`}
    >
      <div className="absolute bottom-[20%] left-[3%] w-[250px] h-[250px] bg-primary-blue/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedHeading
            text="Services & Solutions"
            tag="h2"
            className="text-xs font-mono font-bold tracking-widest text-accent-cyan uppercase"
          />
          <p className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight mt-2.5">
            What I Bring To Your Team
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-cyan to-primary-blue mx-auto mt-4 rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEFAULT_SERVICES.map((srv, idx) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="h-full"
            >
              <TiltElement className="h-full">
                <div
                  className={`p-6 rounded-2xl glass-card flex flex-col justify-between transition-all duration-300 relative overflow-hidden group h-full ${
                    darkMode ? 'hover:bg-slate-900/80' : 'hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {/* Highlight bar */}
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary-blue to-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="space-y-4">
                    {/* Icon wrapper */}
                    <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-115">
                      {renderIcon(srv.iconName)}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-display group-hover:text-accent-cyan transition-colors">
                      {srv.title}
                    </h3>

                    <p className={`text-sm leading-relaxed ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => setSelectedService(srv)}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold font-mono tracking-widest uppercase text-accent-cyan hover:text-primary-blue transition-colors cursor-pointer`}
                    >
                      Learn More
                      <LucideIcons.ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </TiltElement>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Detail Slideout Pane / Dialog */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Panel Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className={`relative w-full max-w-lg rounded-2xl p-6 shadow-2xl z-20 border ${
                darkMode ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
                  {renderIcon(selectedService.iconName)}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display">{selectedService.title}</h3>
                  <p className="text-xs text-slate-400 font-mono">Expert Solution Blueprint</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className={`text-sm leading-relaxed ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {selectedService.description}
                </p>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-accent-cyan mb-2">Key Competencies & Features</h4>
                  <ul className="space-y-2">
                    {selectedService.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-300 dark:text-slate-350 light:text-slate-650">
                        <LucideIcons.CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-white/5 mt-6">
                <button
                  onClick={() => setSelectedService(null)}
                  className="bg-gradient-to-r from-primary-blue to-secondary-purple text-white px-5 py-2 rounded-xl font-bold text-xs hover:opacity-90 transition-all cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
