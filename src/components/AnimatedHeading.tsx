import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with GSAP core
gsap.registerPlugin(ScrollTrigger);

interface AnimatedHeadingProps {
  text: string;
  gradientText?: string;
  tag?: 'h1' | 'h2';
  className?: string;
  id?: string;
}

export default function AnimatedHeading({ text, gradientText, tag = 'h2', className = '', id }: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Grab all character spans
    const chars = el.querySelectorAll('.animated-char');
    if (chars.length === 0) return;

    // Create unique scroll trigger timeline for this heading instance
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          y: 35,
          opacity: 0,
          filter: 'blur(8px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.75,
          stagger: 0.02,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text, gradientText]);

  const words = text.split(' ');
  const gradWords = gradientText ? gradientText.split(' ') : [];

  const HeadingTag = tag;

  return (
    <HeadingTag
      id={id}
      ref={containerRef}
      className={`relative inline-flex flex-wrap overflow-hidden leading-tight ${className}`}
    >
      {/* Standard text words */}
      {words.map((word, wIdx) => (
        <span key={`text-${wIdx}`} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, cIdx) => (
            <span
              key={`c-${cIdx}`}
              className="animated-char inline-block will-change-[transform,opacity,filter]"
            >
              {char}
            </span>
          ))}
        </span>
      ))}

      {/* Gradient text words */}
      {gradWords.map((word, wIdx) => (
        <span 
          key={`grad-${wIdx}`} 
          className="inline-block whitespace-nowrap mr-[0.25em] bg-gradient-to-r from-primary-blue via-secondary-purple to-accent-cyan bg-clip-text text-transparent font-bold"
        >
          {word.split('').map((char, cIdx) => (
            <span
              key={`g-${cIdx}`}
              className="animated-char inline-block text-transparent will-change-[transform,opacity,filter]"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </HeadingTag>
  );
}

