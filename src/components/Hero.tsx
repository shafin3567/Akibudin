import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Download, Mail, ExternalLink, Briefcase } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedHeading from './AnimatedHeading';
import MagneticElement from './MagneticElement';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  darkMode: boolean;
}


export default function Hero({ darkMode }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);
  const [typedText, setTypedText] = useState('');

  // Scroll down indicator GSAP animations
  useEffect(() => {
    const scrollIndicator = scrollIndicatorRef.current;
    if (!scrollIndicator) return;

    // Standard yoyo floating motion for the overall container
    const floatAnim = gsap.to(scrollIndicator, {
      y: 6,
      duration: 1.6,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
    });

    // Dynamic vertical dash slide-fade-down for the wheel indicator core
    const wheel = scrollIndicator.querySelector('.scroll-wheel');
    let wheelAnim;
    if (wheel) {
      wheelAnim = gsap.fromTo(
        wheel,
        { y: 0, opacity: 1 },
        {
          y: 10,
          opacity: 0,
          duration: 1.4,
          repeat: -1,
          ease: 'power1.inInOut',
        }
      );
    }

    // ScrollTrigger to fade out as you scroll down
    const trigger = gsap.to(scrollIndicator, {
      opacity: 0,
      y: -25,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom 82%',
        scrub: true,
      },
    });

    return () => {
      floatAnim.kill();
      if (wheelAnim) wheelAnim.kill();
      trigger.scrollTrigger?.kill();
      trigger.kill();
    };
  }, []);

  const [roles] = useState([
    'Full Stack Web Developer',
    'Cloud Solutions Architect',
    'REST API Specialist',
    'UI/UX Automation Engineer'
  ]);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  // Typing animation effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activeWord = roles[roleIndex];
    
    const tick = () => {
      if (!isDeleting) {
        setTypedText(activeWord.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        
        if (charIndex + 1 === activeWord.length) {
          timer = setTimeout(() => setIsDeleting(true), 2500); // Wait before deleting
          return;
        }
      } else {
        setTypedText(activeWord.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }
    };

    const delay = isDeleting ? 40 : 100;
    timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, roles]);

  // Particle background size management using ResizeObserver
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }> = [];

    const initializeParticles = (w: number, h: number) => {
      particles = [];
      const count = Math.min(Math.floor((w * h) / 16000), 100);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          color: Math.random() > 0.5 ? '#237227' : Math.random() > 0.3 ? '#519A66' : '#FFAA00',
        });
      }
    };

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        initializeParticles(width, height);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update & draw particles
      ctx.globalAlpha = 0.45;
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce boundaries
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw subtle connecting lines
      ctx.globalAlpha = 1;
      ctx.strokeStyle = darkMode ? 'rgba(35, 114, 39, 0.22)' : 'rgba(35, 114, 39, 0.14)';
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    // Initial sizing
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    initializeParticles(canvas.width, canvas.height);
    render();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [darkMode]);

  const scrollToSection = (id: string) => {
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

  const handleDownloadCV = () => {
    setCvOpen(true);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden ${
        darkMode ? 'bg-[#0b1a0d] text-white' : 'bg-slate-55 text-slate-900 border-b border-slate-200'
      }`}
    >
      {/* Particle Overlay */}
      <canvas ref={canvasRef} id="particle-canvas" className="absolute inset-0" />

      {/* Decorative Gradients */}
      <div className="absolute top-[20%] right-[10%] w-[450px] h-[450px] bg-gradient-to-tr from-primary-blue/15 to-secondary-purple/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] bg-gradient-to-tr from-accent-cyan/15 to-primary-blue/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="md:col-span-7 flex flex-col justify-center text-left space-y-6">
            {/* Top Profile Avatar Section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-2"
            >
              <div className="relative group">
                {/* Glowing ring matching current premium gradients */}
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-accent-cyan via-primary-blue to-secondary-purple opacity-75 blur-sm group-hover:opacity-100 transition duration-500" />
                <div className={`relative w-16 h-16 rounded-full overflow-hidden border-2 ${darkMode ? 'border-slate-900 bg-[#0b1a0d]' : 'border-white bg-slate-50'}`}>
                  <img
                    src="https://i.ibb.co.com/v6D34xzk/Messenger-creation-BC26-C2-E9-C3-B7-4731-B86-C-6-B4230-C253-DE.jpg"
                    alt="Md. Akib Uddin Satej Avatar"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Real-time Online status pill */}
                <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full ring-2 ring-slate-950 bg-emerald-400" />
              </div>
              <div>
                <p className={`text-xs font-mono tracking-widest uppercase opacity-75 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Verified Lead Developer</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-semibold text-emerald-400">Available For Work</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary-blue/20 bg-primary-blue/5 text-primary-blue md:max-w-fit"
            >
              <Briefcase className="w-3.5 h-3.5 text-accent-cyan" />
              <span className="text-xs font-mono font-medium tracking-wide uppercase">Open to Hire Projects</span>
            </motion.div>

            <div className="space-y-4">
              <AnimatedHeading 
                text="Hi, I'm"
                gradientText="Md. Akib Uddin Satej"
                tag="h1"
                className="text-4xl sm:text-5xl lg:text-7xl font-bold font-display tracking-tight leading-none block"
              />

              {/* Typing text row */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="h-8 flex items-center"
              >
                <p className="text-lg sm:text-xl md:text-2xl font-mono text-slate-400">
                  <span className={`mr-1 font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>I build</span>
                  <span className="bg-gradient-to-r from-accent-cyan to-secondary-purple bg-clip-text text-transparent font-semibold shadow-inner">
                    {typedText}
                  </span>
                  <span className={`ml-0.5 inline-block w-[3px] h-5 animate-pulse bg-current ${darkMode ? 'text-white' : 'text-slate-800'}`} />
                </p>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className={`text-base sm:text-lg max-w-xl font-normal leading-relaxed ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Building Modern, Scalable & High-Performance Web Applications. Specializing in responsive React/Next architecture, secure Express backends, and scale-to-zero server environments.
            </motion.p>

            {/* Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              {/* Hire Me CTA */}
              <MagneticElement>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="group relative px-6 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-primary-blue to-secondary-purple text-white shadow-[0_4px_20px_rgba(35,114,39,0.3)] hover:shadow-[0_4px_25px_rgba(255,170,0,0.55)] transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-secondary-purple to-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-1.5 z-10 text-sm">
                    Hire Me Now
                    <ChevronRight className="w-4 h-4 transition-transform duration-350 group-hover:translate-x-1" />
                  </span>
                </button>
              </MagneticElement>

              {/* View Projects CTA */}
              <MagneticElement>
                <button
                  onClick={() => scrollToSection('portfolio')}
                  className={`px-6 py-3.5 rounded-xl font-semibold border transition-all text-sm cursor-pointer ${
                    darkMode
                      ? 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-slate-200'
                      : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800 shadow-sm'
                  }`}
                >
                  View Portfolio
                </button>
              </MagneticElement>

              {/* Download CV CTA */}
              <MagneticElement>
                <button
                  onClick={handleDownloadCV}
                  className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold border transition-all text-sm cursor-pointer ${
                    darkMode
                      ? 'border-white/10 bg-slate-900 text-slate-300 hover:bg-slate-850'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </button>
              </MagneticElement>
            </motion.div>
          </div>

          {/* Hero Right Media (Developer Image representation) */}
          <div className="md:col-span-5 flex justify-center items-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
            >
              {/* Spinning glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary-blue via-secondary-purple to-accent-cyan opacity-40 blur-xl animate-pulse" />
              
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-tr from-primary-blue via-secondary-purple to-accent-cyan p-[2px] shadow-2xl overflow-hidden">
                <div className={`w-full h-full rounded-[2.45rem] overflow-hidden relative ${
                  darkMode ? 'bg-[#0b1a0d]' : 'bg-white'
                }`}>
                  <img
                    src="https://i.ibb.co.com/cSfVNgzt/Messenger-creation-11-FAA0-A5-FA2-D-4-FC2-9078-4-C407-CE1857-A.jpg"
                    alt="Md. Akib Uddin Satej"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Decorative glass tag */}
                  <div className="absolute bottom-5 left-5 right-5 p-3 rounded-2xl bg-slate-950/70 border border-white/10 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white font-display font-semibold">Md. Akib Uddin Satej</p>
                      <p className="text-[10px] text-accent-cyan font-mono">Available for projects</p>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-emerald-500 animate-ping absolute -top-1 -right-1" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500 border border-slate-950" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* CV Preview Modal */}
      <AnimatePresence>
        {cvOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCvOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className={`relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl z-20 border ${
                darkMode ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-primary-blue to-secondary-purple text-white flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-display">Md. Akib Uddin Satej — Curriculum Vitae</h3>
                  <p className="text-xs text-blue-200 font-mono mt-0.5">Software Engineering & Web Architecture</p>
                </div>
                <button
                  onClick={() => setCvOpen(false)}
                  className="p-1 px-3.5 bg-white/15 dark:bg-black/15 hover:bg-white/20 hover:text-white rounded-lg text-sm transition-colors text-white cursor-pointer"
                >
                  Close
                </button>
              </div>

              {/* interactive CV view */}
              <div className="p-6 max-h-[60vh] overflow-y-auto space-y-5 text-sm">
                <div>
                  <h4 className="font-bold text-accent-cyan font-display text-base border-b border-white/5 pb-1">Professional Summary</h4>
                  <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 mt-2 leading-relaxed">
                    Senior Full Stack Developer specializing in highly optimal client-side React architecture, Express API integrations, database pruning, and Docker containers.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-accent-cyan font-display text-base border-b border-white/5 pb-1">Core Tech Stack</h4>
                  <div className="flex flex-wrap gap-2 mt-2 font-mono text-xs">
                    {['React', 'Next.js', 'Express', 'NodeJS', 'TypeScript', 'Tailwind', 'MongoDB', 'PostgreSQL', 'Docker', 'Vercel', 'Git'].map(s => (
                      <span key={s} className="px-2 py-1 rounded bg-white/5 border border-white/10">{s}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-accent-cyan font-display text-base border-b border-white/5 pb-1">Experience Highlights</h4>
                  <ul className="space-y-3 mt-2 list-none">
                    <li>
                      <p className="font-semibold text-slate-200">Senior Full-Stack Developer — NexaTech Innovations (2026-Present)</p>
                      <p className="text-xs text-slate-400">Led team of 5; optimized SaaS portals, cutting latency and server spendings by 42%.</p>
                    </li>
                    <li>
                      <p className="font-semibold text-slate-200">Full-Stack Architect — ApexDigital Software (2024-2026)</p>
                      <p className="text-xs text-slate-400">Deployed high-performance Stripe workflows; achieved 98% SEO index ranks.</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* CV Action Footer */}
              <div className={`p-4 bg-slate-950/60 border-t flex items-center justify-end gap-3 ${
                darkMode ? 'border-white/5' : 'border-slate-100'
              }`}>
                <button
                  onClick={() => {
                    const blob = new Blob([
                      `Md. Akib Uddin Satej - Full Stack Developer CV\n--------------------------------------------\nEmail: shafin.bd.d@gmail.com\nTitle: Full Stack Web Developer\nWebsite: https://satej-portfolio.example.com\n\nExperience:\n- Senior Full Stack Developer (NexaTech Innovations LLC, 2026-Present)\n- Full Stack Developer (ApexDigital Software Group, 2024-2026)\n- Frontend Developer (ByteCraft Agency, 2023-2024)\n\nSkills:\n- Frontend: React, Next.js, HTML5, CSS3, JS, Tailwind\n- Backend: Node.js, Express.js\n- Databases: MongoDB, PostgreSQL, SQL, MySQL\n- Tools: Git, Docker, Firebase, Vercel`
                    ], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'Md_Akib_Uddin_Satej_CV.txt';
                    link.click();
                  }}
                  className="flex items-center gap-2 bg-accent-cyan hover:bg-accent-cyan/95 text-slate-950 px-4 py-2.5 rounded-xl font-bold transition-all text-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Save CV Plaintext
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Elegant Minimalist Scroll Down Indicator */}
      <div
        ref={scrollIndicatorRef}
        onClick={() => scrollToSection('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 hover:scale-105 active:scale-95 transition-all"
        title="Scroll Down to About"
      >
        <span className="text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase select-none">Scroll</span>
        <div className="w-6 h-10 rounded-full border border-slate-500/50 flex justify-center p-1 relative">
          <div className="w-1.5 h-1.5 bg-accent-cyan rounded-full scroll-wheel" />
        </div>
      </div>

    </section>
  );
}
