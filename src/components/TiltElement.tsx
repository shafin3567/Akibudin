import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TiltElementProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number; // Speed/angle bounds of rot depth (degrees)
  perspective?: number; // Total focal projection plane depth in pixels
}

export default function TiltElement({
  children,
  className = '',
  maxRotation = 10,
  perspective = 1000,
}: TiltElementProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      
      // Calculate mouse local coordinates inside the element
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Normalize position to [-0.5, 0.5] range
      const normX = (x / rect.width) - 0.5;
      const normY = (y / rect.height) - 0.5;
      
      // Compute 3D rotation angles
      const rotX = -normY * maxRotation;
      const rotY = normX * maxRotation;

      gsap.to(card, {
        transform: `perspective(${perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.025, 1.025, 1.025)`,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      // Reset rotation with spring dampening
      gsap.to(card, {
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxRotation, perspective]);

  return (
    <div
      ref={cardRef}
      className={`relative transform-gpu will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
