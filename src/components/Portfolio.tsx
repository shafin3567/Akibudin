import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Heart, Eye, ChevronRight, X, Sparkles } from 'lucide-react';
import { Project } from '../types';
import AnimatedHeading from './AnimatedHeading';
import TiltElement from './TiltElement';

interface PortfolioProps {
  darkMode: boolean;
  projects: Project[];
  onLikeProject: (id: string) => void;
  onViewProject: (id: string) => void;
}

export default function Portfolio({ darkMode, projects, onLikeProject, onViewProject }: PortfolioProps) {
  const [filter, setFilter] = useState<'All' | 'Web Applications' | 'SaaS Platforms' | 'E-Commerce' | 'Dashboards'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: ('All' | 'Web Applications' | 'SaaS Platforms' | 'E-Commerce' | 'Dashboards')[] = [
    'All',
    'Web Applications',
    'SaaS Platforms',

    'E-Commerce',
    'Dashboards'
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const handleOpenDetail = (project: Project) => {
    onViewProject(project.id);
    setSelectedProject(project);
  };

  return (
    <section
      id="portfolio"
      className={`py-20 md:py-28 relative border-b ${
        darkMode ? 'bg-[#0b1a0d] text-white border-white/5' : 'bg-slate-50 text-slate-950 border-slate-200'
      }`}
    >
      <div className="absolute top-[30%] right-[3%] w-[350px] h-[350px] bg-secondary-purple/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <AnimatedHeading
            text="My Portfolio"
            tag="h2"
            className="text-xs font-mono font-bold tracking-widest text-primary-blue uppercase"
          />
          <p className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight mt-2.5">
            Dynamic Showcase Gallery
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-blue to-accent-cyan mx-auto mt-4 rounded-full" />
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                filter === cat
                  ? 'bg-gradient-to-r from-primary-blue to-secondary-purple border-transparent text-white shadow-lg shadow-primary-blue/20'
                  : darkMode
                    ? 'border-white/10 bg-slate-900 text-slate-300 hover:bg-slate-850'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                layout
                key={proj.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <TiltElement className="h-full">
                  <div
                    className={`group rounded-2xl overflow-hidden flex flex-col justify-between border h-full transition-all duration-300 hover:shadow-2xl ${
                      darkMode
                        ? 'border-white/10 bg-slate-900/60 hover:bg-slate-900'
                        : 'border-slate-200 bg-white hover:bg-slate-50 shadow-sm'
                    }`}
                  >
                {/* Product/App Header Media */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                  <img
                    src={proj.image || 'https://picsum.photos/seed/placeholder/600/450'}
                    alt={proj.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold font-mono tracking-wider uppercase rounded-full bg-slate-950/70 border border-white/10 text-accent-cyan">
                    {proj.category}
                  </div>
                  
                  {/* Overlay views / likes overlay stats */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2.5 bg-slate-950/75 border border-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-xs">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      {proj.views}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onLikeProject(proj.id);
                      }}
                      className="flex items-center gap-1 hover:text-rose-400 transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      {proj.likes}
                    </button>
                  </div>
                </div>

                {/* Card Content Brief */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold font-display group-hover:text-accent-cyan transition-colors line-clamp-1">
                      {proj.name}
                    </h3>
                    <p className={`text-sm line-clamp-3 leading-relaxed ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {proj.description}
                    </p>
                  </div>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 border border-white/10 tracking-wide text-slate-400 uppercase"
                      >
                        {t}
                      </span>
                    ))}
                    {proj.tech.length > 4 && (
                      <span className="text-[10px] font-mono text-slate-500 mt-0.5">
                        +{proj.tech.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className={`p-6 pt-0 border-t flex items-center justify-between gap-3 ${
                  darkMode ? 'border-white/5' : 'border-slate-100'
                }`}>
                  <button
                    onClick={() => handleOpenDetail(proj)}
                    className="flex items-center gap-1 text-xs font-bold font-mono tracking-wider uppercase text-accent-cyan hover:text-primary-blue transition-colors cursor-pointer"
                  >
                    View Case Study
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-xl border transition-all ${
                        darkMode ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-100'
                      }`}
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-gradient-to-r from-primary-blue to-accent-cyan text-white shadow-md hover:opacity-90 transition-all"
                      title="Live Preview"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                </div>
                </TiltElement>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Case Study Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className={`relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl z-20 border ${
                darkMode ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              {/* Media banner image */}
              <div className="relative h-48 sm:h-64 bg-slate-950">
                <img
                  src={selectedProject.image || 'https://picsum.photos/seed/placeholder/600/400'}
                  alt={selectedProject.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80"
                />
                
                {/* Dismiss X Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/60 border border-white/15 text-white hover:bg-slate-950/90 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold font-mono tracking-wider uppercase rounded bg-accent-cyan/95 text-slate-950">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1 text-shadow">
                    {selectedProject.name}
                  </h3>
                </div>
              </div>

              {/* Description Body */}
              <div className="p-6 max-h-[50vh] overflow-y-auto space-y-5 text-sm sm:text-base leading-relaxed">
                <div className="flex items-center gap-4 text-xs font-mono border-b pb-4 border-white/5">
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-slate-400" />
                    <span>{selectedProject.views} unique views</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span>{selectedProject.likes} likes</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-accent-cyan mb-2">Project Brief</h4>
                  <p className={darkMode ? 'text-slate-330' : 'text-slate-650'}>
                    {selectedProject.description}
                  </p>
                </div>

                {selectedProject.longDescription && (
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-accent-cyan mb-2">Case Study & Key Accomplishments</h4>
                    <pre className={`whitespace-pre-line font-sans text-sm ${
                      darkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {selectedProject.longDescription}
                    </pre>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-accent-cyan mb-2">Technology Blueprint</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 border border-white/10 text-slate-350 tracking-wide">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className={`p-4 bg-slate-950/60 border-t flex items-center justify-between gap-3 ${
                darkMode ? 'border-white/5' : 'border-slate-100'
              }`}>
                <button
                  onClick={() => onLikeProject(selectedProject.id)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold font-mono tracking-wider uppercase bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-bounce" />
                  Like Project
                </button>

                <div className="flex items-center gap-3">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold font-mono tracking-wider uppercase bg-slate-900 border border-white/10 text-slate-300 rounded-xl hover:bg-slate-850"
                  >
                    <Github className="w-4 h-4" />
                    Codebase
                  </a>
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold font-mono tracking-wider uppercase bg-gradient-to-r from-primary-blue to-accent-cyan text-white rounded-xl shadow-md hover:opacity-90"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
