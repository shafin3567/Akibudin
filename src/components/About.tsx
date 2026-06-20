import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Award, Briefcase, Smile, Cpu } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

interface AboutProps {
  darkMode: boolean;
}

interface CounterProps {
  endValue: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}

function CounterCard({ endValue, suffix = '', label, icon }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // ms
    const increment = Math.max(1, Math.floor(endValue / 30));
    const stepTime = Math.floor(duration / (endValue / increment));
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [endValue]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="p-5 rounded-2xl glass-card text-center transition-all duration-305"
    >
      <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-tr from-primary-blue/20 to-accent-cyan/20 flex items-center justify-center text-accent-cyan mb-3">
        {icon}
      </div>
      <h3 className="text-[10px] font-mono tracking-widest uppercase opacity-60 text-accent-cyan italic mb-1.5">
        Metrics Node
      </h3>
      <p className="text-3xl font-bold font-display tracking-tight bg-gradient-to-r from-white via-slate-100 to-accent-cyan bg-clip-text text-transparent font-bold italic">
        {count}{suffix}
      </p>
      <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wide font-bold italic">
        {label}
      </p>
    </motion.div>
  );
}

export default function About({ darkMode }: AboutProps) {
  return (
    <section
      id="about"
      className={`py-20 md:py-28 relative ${
        darkMode ? 'bg-[#0b1a0d] text-white' : 'bg-white text-slate-950'
      }`}
    >
      <div className="absolute top-[30%] left-[2%] w-[250px] h-[250px] bg-secondary-purple/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedHeading
            text="About Me"
            tag="h2"
            className="text-xs font-mono font-bold tracking-widest text-primary-blue uppercase"
          />
          <p className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight mt-2.5">
            Crafting Digital Solutions, <br />
            <span className="bg-gradient-to-r from-primary-blue via-secondary-purple to-accent-cyan bg-clip-text text-transparent">
              One Line of Code at a Time
            </span>
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-blue to-accent-cyan mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* About Interactive Story Block */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-bold font-display">
              My Journey as Md. Akib Uddin Satej
            </h3>
            
            <p className={`leading-relaxed text-sm sm:text-base font-bold italic ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              I am a meticulous, full-stack software engineer with an immutable passion for structuring clean, fluid architectures. Exploring the depths of Node networks, React client caches, and lightweight edge environments, I write software that is not only high-performing but also delightful to maintain.
            </p>

            <p className={`leading-relaxed text-sm sm:text-base ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              My story started years ago tinkering with plain JavaScript modules and has since expanded to architecting multi-tenant SaaS environments, custom Stripe e-com routers, and highly-optimized relational PostgreSQL schema maps. My execution objective is plain: simple code constructs, flawless performance ratings, and client safety.
            </p>

            <div className={`p-4 rounded-xl border border-dashed rounded-lg ${
              darkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'
            }`}>
              <p className="text-xs font-mono italic text-accent-cyan">
                "Simplicity is the soul of pristine software engineering."
              </p>
            </div>
          </div>

          {/* About Counter Stats Block */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-5">
              <CounterCard
                endValue={4}
                suffix="+"
                label="Years of Experience"
                icon={<Award className="w-5 h-5" />}
              />
              <CounterCard
                endValue={50}
                suffix="+"
                label="Completed Projects"
                icon={<Briefcase className="w-5 h-5" />}
              />
              <CounterCard
                endValue={25}
                suffix="+"
                label="Happy Clients"
                icon={<Smile className="w-5 h-5" />}
              />
              <CounterCard
                endValue={18}
                suffix="+"
                label="Technologies Mastered"
                icon={<Cpu className="w-5 h-5" />}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
