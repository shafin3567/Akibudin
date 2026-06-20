import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number; // Scaling coefficient for mouse displacement effect
  className?: string;
  active?: boolean;
}

export default function MagneticElement({
  children,
  strength = 0.35,
  className = '',
  active = true,
}: MagneticElementProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      
      // Calculate target element absolute midpoint
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Compute delta offset to pointer position
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      
      // Interpolate displacement smoothly via GSAP custom ease
      gsap.to(el, {
        x: dx * strength,
        y: dy * strength,
        duration: 0.35,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      // Return spring-back with elastic bounce dampening
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.75,
        ease: 'elastic.out(1.1, 0.42)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, active]);

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
