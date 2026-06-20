import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Github, Flame, GitMerge, Award, GitBranch, Star, Eye } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

interface GithubStatsProps {
  darkMode: boolean;
}

export default function GithubStats({ darkMode }: GithubStatsProps) {
  // Generate a simulated, beautiful GitHub Contribution grid for past several weeks
  // Let's draw 14 columns of 7 squares
  const [hoveredSquare, setHoveredSquare] = useState<{ day: string; count: number } | null>(null);

  const months = ['Mar', 'Apr', 'May', 'Jun'];

  const languages = [
    { name: 'TypeScript', pct: 45, color: '#3178c6' },
    { name: 'JavaScript', pct: 30, color: '#f1e05a' },
    { name: 'React/Svelte', pct: 15, color: '#61dafb' },
    { name: 'Go / Python', pct: 10, color: '#00add8' },
  ];

  // Simulating random contribution weights
  const gridRows = 7;
  const gridCols = 32;
  const totalSlots = gridRows * gridCols;

  const getIntensityClass = (level: number) => {
    switch(level) {
      case 0: return darkMode ? 'bg-slate-900 border-white/5' : 'bg-slate-100 border-slate-200';
      case 1: return 'bg-emerald-900 border-emerald-800/10';
      case 2: return 'bg-emerald-700 border-emerald-600/10';
      case 3: return 'bg-emerald-500 border-emerald-400/10';
      case 4: return 'bg-emerald-300 border-emerald-200/10';
      default: return 'bg-slate-900';
    }
  };

  return (
    <section
      id="github-stats"
      className={`py-20 md:py-28 relative border-b ${
        darkMode ? 'bg-[#0b1a0d] text-white border-white/5' : 'bg-slate-50 text-slate-950 border-slate-200'
      }`}
    >
      <div className="absolute top-[20%] right-[3%] w-[250px] h-[250px] bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-1.5 justify-center">
            <Github className="w-4 h-4 text-[#2ea44f]" />
            <AnimatedHeading
              text="Engineering Activity"
              tag="h2"
              className="text-xs font-mono font-bold tracking-widest text-[#2ea44f] uppercase"
            />
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight mt-1.5">
            Live GitHub Statistics
          </p>
          <div className="w-16 h-1 bg-[#2ea44f] mx-auto mt-4 rounded-full" />
        </div>

        {/* Outer Dashboard layout container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* GitHub Header profile box (collated statistics) */}
          <div className={`col-span-1 lg:col-span-4 p-6 rounded-2xl border flex flex-col justify-between ${
            darkMode ? 'bg-slate-900/60 border-white/10' : 'bg-white border-slate-200'
          }`}>
            <div className="space-y-5">
              <div className="flex items-center gap-3.5 pb-4 border-b border-white/5">
                <div className="w-12 h-12 rounded-xl bg-slate-950 overflow-hidden border border-white/10">
                  <img
                    src="https://i.ibb.co.com/v6D34xzk/Messenger-creation-BC26-C2-E9-C3-B7-4731-B86-C-6-B4230-C253-DE.jpg"
                    alt="Akib"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold font-display text-base">akibsatej</h3>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-accent-cyan hover:underline flex items-center gap-1 mt-0.5"
                  >
                    github.com/akibsatej
                    <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse animate-bounce" />
                  </a>
                </div>
              </div>

              {/* Stats Rows */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                  <p className="text-[10px] font-mono tracking-wider opacity-65 uppercase">Repositories</p>
                  <p className="text-xl font-bold font-display mt-1 text-slate-100">84</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                  <p className="text-[10px] font-mono tracking-wider opacity-65 uppercase">Total Stars</p>
                  <p className="text-xl font-bold font-display mt-1 text-yellow-500 flex items-center justify-center gap-0.5">
                    <Star className="w-4 h-4 fill-current" />
                    342
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                  <p className="text-[10px] font-mono tracking-wider opacity-65 uppercase">Contributions</p>
                  <p className="text-xl font-bold font-display mt-1 text-emerald-500">2,480+</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                  <p className="text-[10px] font-mono tracking-wider opacity-65 uppercase">Total Pulls</p>
                  <p className="text-xl font-bold font-display mt-1 text-slate-100">145</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 mt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/10 transition-colors"
              >
                <Github className="w-4 h-4" />
                Inspect GitHub Profile
              </a>
            </div>
          </div>

          {/* Languages & Heatmap details */}
          <div className={`col-span-1 lg:col-span-8 p-6 rounded-2xl border flex flex-col justify-between space-y-6 ${
            darkMode ? 'bg-slate-900/60 border-white/10' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#2ea44f] uppercase flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                Weekly Contribution Frequency
              </h4>

              {/* Heatmap grid */}
              <div className="relative p-4 rounded-xl bg-slate-950/70 border border-white/5 overflow-x-auto">
                {/* Months line */}
                <div className="flex gap-14 pl-6 text-[10px] font-mono opacity-50 mb-1.5">
                  {months.map(m => <span key={m}>{m}</span>)}
                </div>

                <div className="flex items-start gap-1">
                  {/* Days marker column */}
                  <div className="flex flex-col justify-between text-[8px] font-mono opacity-40 h-[72px] pr-2">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                  </div>

                  {/* Matrix grid drawing */}
                  <div className="grid grid-flow-col grid-rows-7 gap-1">
                    {Array.from({ length: totalSlots }).map((_, idx) => {
                      // Generate commits weight based on pseudo-random distribution
                      const valSeed = (idx * 17 + 5) % 91;
                      const cLvl = valSeed < 40 ? 0 : valSeed < 65 ? 1 : valSeed < 80 ? 2 : valSeed < 92 ? 3 : 4;
                      const exactCommits = cLvl === 0 ? 0 : cLvl * 2 + (idx % 3);
                      
                      const colIdx = Math.floor(idx / 7);
                      const dayVal = `Week ${colIdx + 1}, Day ${(idx % 7) + 1}`;

                      return (
                        <div
                          key={idx}
                          onMouseEnter={() => setHoveredSquare({ day: dayVal, count: exactCommits })}
                          onMouseLeave={() => setHoveredSquare(null)}
                          className={`w-2.5 h-2.5 rounded-xs border transition-colors cursor-pointer ${getIntensityClass(cLvl)} hover:scale-115`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Legend indicator bar */}
                <div className="flex items-center justify-between text-[10px] font-mono mt-3 opacity-60">
                  <div className="h-4 flex items-center">
                    {hoveredSquare && (
                      <span className="text-accent-cyan font-semibold">
                        {hoveredSquare.count} contributions on {hoveredSquare.day}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>Less</span>
                    <div className="w-2.5 h-2.5 rounded-xs bg-slate-900 border border-white/5" />
                    <div className="w-2.5 h-2.5 rounded-xs bg-emerald-950" />
                    <div className="w-2.5 h-2.5 rounded-xs bg-emerald-700" />
                    <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
                    <div className="w-2.5 h-2.5 rounded-xs bg-emerald-300" />
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Languages segment bar */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#2ea44f] uppercase">
                Most Employed Codebases
              </h4>

              {/* Language split line */}
              <div className="h-3 rounded-full flex overflow-hidden w-full bg-slate-900">
                {languages.map(l => (
                  <div
                    key={l.name}
                    className="h-full transition-all"
                    style={{ width: `${l.pct}%`, backgroundColor: l.color }}
                    title={`${l.name}: ${l.pct}%`}
                  />
                ))}
              </div>

              {/* Labels list */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1 font-mono text-xs">
                {languages.map(l => (
                  <div key={l.name} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                    <span className="font-semibold">{l.name}</span>
                    <span className="opacity-60 text-[10px]">{l.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
