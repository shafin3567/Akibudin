import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Monitor, Server, Database, Hammer, Layers } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

interface SkillsProps {
  darkMode: boolean;
}

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'database' | 'tools';
}

const SKILL_LIST: Skill[] = [
  // Frontend
  { name: 'HTML5', level: 98, category: 'frontend' },
  { name: 'CSS3', level: 95, category: 'frontend' },
  { name: 'JavaScript', level: 96, category: 'frontend' },
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'Next.js', level: 92, category: 'frontend' },
  { name: 'Tailwind CSS', level: 97, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 91, category: 'backend' },
  { name: 'Express.js', level: 94, category: 'backend' },
  { name: 'REST API', level: 95, category: 'backend' },
  { name: 'TypeScript', level: 92, category: 'backend' },
  
  // Database
  { name: 'MongoDB', level: 88, category: 'database' },
  { name: 'MySQL', level: 86, category: 'database' },
  { name: 'PostgreSQL', level: 90, category: 'database' },
  
  // Tools
  { name: 'Git', level: 93, category: 'tools' },
  { name: 'GitHub', level: 94, category: 'tools' },
  { name: 'Docker', level: 84, category: 'tools' },
  { name: 'Firebase', level: 89, category: 'tools' },
  { name: 'Vercel', level: 95, category: 'tools' }
];

export default function Skills({ darkMode }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'database' | 'tools'>('all');

  const categories = [
    { id: 'all', name: 'All Stack', icon: <Layers className="w-4 h-4" /> },
    { id: 'frontend', name: 'Frontend', icon: <Monitor className="w-4 h-4" /> },
    { id: 'backend', name: 'Backend', icon: <Server className="w-4 h-4" /> },
    { id: 'database', name: 'Databases', icon: <Database className="w-4 h-4" /> },
    { id: 'tools', name: 'Tools & DevOps', icon: <Hammer className="w-4 h-4" /> },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? SKILL_LIST 
    : SKILL_LIST.filter(s => s.category === activeCategory);

  return (
    <section
      id="skills"
      className={`py-20 md:py-28 relative border-b ${
        darkMode ? 'bg-[#0b1a0d] text-white border-white/5' : 'bg-slate-50 text-slate-950 border-slate-200'
      }`}
    >
      <div className="absolute top-[40%] right-[3%] w-[300px] h-[300px] bg-accent-cyan/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <AnimatedHeading
            text="Technical Arsenal"
            tag="h2"
            className="text-xs font-mono font-bold tracking-widest text-secondary-purple uppercase"
          />
          <p className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight mt-2.5">
            Skills & Proficiency Metrics
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-secondary-purple to-accent-cyan mx-auto mt-4 rounded-full" />
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-1.8 px-4.5 py-2.5 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-primary-blue to-accent-cyan border-transparent text-white shadow-lg shadow-primary-blue/20'
                  : darkMode
                    ? 'border-white/10 bg-slate-900 text-slate-300 hover:bg-slate-850'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
              className={`p-5 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
                darkMode
                  ? 'border-white/5 bg-slate-900/50 hover:bg-slate-900'
                  : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-display font-semibold text-sm sm:text-base">
                  {skill.name}
                </span>
                <span className="font-mono text-xs font-medium text-accent-cyan">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className={`h-2 rounded-full overflow-hidden w-full ${
                darkMode ? 'bg-slate-800' : 'bg-slate-200'
              }`}>
                {/* Dynamic fluid filler animation */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary-blue via-secondary-purple to-accent-cyan"
                />
              </div>

              {/* Status Note based on values */}
              <p className="text-[10px] font-mono text-slate-400 mt-2 uppercase tracking-wide">
                Level: {skill.level >= 95 ? 'Expert Mastery' : skill.level >= 90 ? 'Advanced' : 'Proficient Specialist'}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
