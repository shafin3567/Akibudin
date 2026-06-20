import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { DEFAULT_TESTIMONIALS } from '../data';
import AnimatedHeading from './AnimatedHeading';

interface TestimonialsProps {
  darkMode: boolean;
}

export default function Testimonials({ darkMode }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DEFAULT_TESTIMONIALS.length);
    }, 5500); // 5.5s slide loop

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % DEFAULT_TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + DEFAULT_TESTIMONIALS.length) % DEFAULT_TESTIMONIALS.length);
  };

  const activeTestimonial = DEFAULT_TESTIMONIALS[activeIndex];

  return (
    <section
      id="testimonials"
      className={`py-20 md:py-28 relative ${
        darkMode ? 'bg-[#0b1a0d] text-white' : 'bg-white text-slate-950'
      }`}
    >
      <div className="absolute top-[30%] left-[2%] w-[250px] h-[250px] bg-secondary-purple/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedHeading
            text="Client Verification"
            tag="h2"
            className="text-xs font-mono font-bold tracking-widest text-primary-blue uppercase"
          />
          <p className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight mt-2.5">
            Testimonials & Endorsements
          </p>
          <div className="w-16 h-1 bg-primary-blue mx-auto mt-4 rounded-full" />
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className={`p-8 md:p-12 rounded-3xl border relative flex flex-col justify-between ${
                darkMode ? 'bg-slate-900/60 border-white/5 shadow-2xl' : 'bg-slate-50 border-slate-200 shadow-lg'
              }`}
            >
              {/* Backquote visual marker */}
              <div className="absolute top-6 right-8 opacity-[0.05] text-primary-blue text-8xl font-serif select-none pointer-events-none">
                <Quote className="w-20 h-20 fill-current" />
              </div>

              <div className="space-y-6">
                {/* Five star row */}
                <div className="flex gap-1">
                  {Array.from({ length: activeTestimonial.rating }).map((_, rIdx) => (
                    <Star key={rIdx} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>

                <p className={`text-base sm:text-lg italic leading-relaxed font-normal ${
                  darkMode ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  "{activeTestimonial.content}"
                </p>
              </div>

              {/* Client Info footer */}
              <div className="flex items-center gap-4 pt-8 mt-8 border-t border-white/5">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-950 border border-white/10 shrink-0">
                  <img
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold font-display text-sm sm:text-base">{activeTestimonial.name}</h4>
                  <p className="text-xs font-mono text-slate-400">{activeTestimonial.role} — <span className="text-accent-cyan">{activeTestimonial.company}</span></p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Pagination dots & triggers row */}
          <div className="flex items-center justify-between mt-8 px-4">
            <div className="flex items-center gap-2">
              {DEFAULT_TESTIMONIALS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveIndex(dotIdx);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeIndex === dotIdx ? 'w-6 bg-accent-cyan' : 'w-2 bg-slate-800 hover:bg-slate-700'
                  }`}
                  title={`Testimonial slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  darkMode ? 'border-white/10 hover:bg-white/5 text-slate-400' : 'border-slate-250 hover:bg-slate-100 text-slate-600'
                }`}
                title="Previous feedback"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  darkMode ? 'border-white/10 hover:bg-white/5 text-slate-400' : 'border-slate-250 hover:bg-slate-100 text-slate-600'
                }`}
                title="Next feedback"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
