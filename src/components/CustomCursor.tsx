import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Check if user has turned it off in localStorage
    const saved = localStorage.getItem('custom-cursor-enabled');
    if (saved !== null) {
      setEnabled(saved === 'true');
    }

    const mMove = (el: MouseEvent) => {
      setPosition({ x: el.clientX, y: el.clientY });
      setHidden(false);
    };

    const mLeave = () => {
      setHidden(true);
    };

    const mDown = () => {
      setClicked(true);
    };

    const mUp = () => {
      setClicked(false);
    };

    const addLinkHoverEvents = () => {
      document.querySelectorAll('a, button, select, input, textarea, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    window.addEventListener('mousemove', mMove);
    document.addEventListener('mouseleave', mLeave);
    window.addEventListener('mousedown', mDown);
    window.addEventListener('mouseup', mUp);
    
    // Add hover event listeners for links
    addLinkHoverEvents();

    // Re-check periodically when dynamic elements load
    const interval = setInterval(addLinkHoverEvents, 2000);

    return () => {
      window.removeEventListener('mousemove', mMove);
      document.removeEventListener('mouseleave', mLeave);
      window.removeEventListener('mousedown', mDown);
      window.removeEventListener('mouseup', mUp);
      clearInterval(interval);
    };
  }, []);

  // Listen to custom toggle events from navbar
  useEffect(() => {
    const handleCursorToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      setEnabled(customEvent.detail);
    };
    window.addEventListener('toggle-custom-cursor', handleCursorToggle);
    return () => {
      window.removeEventListener('toggle-custom-cursor', handleCursorToggle);
    };
  }, []);

  if (!enabled || hidden) return null;

  return (
    <>
      {/* Target Dot */}
      <div
        className={`cursor-dot hidden md:block w-3 h-3 rounded-full shadow-[0_0_8px_rgba(255,170,0,0.8)]`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.7 : linkHovered ? 1.5 : 1})`,
          transition: 'transform 0.08s ease-out',
          backgroundColor: linkHovered ? '#519A66' : '#FFAA00',
        }}
      />
      {/* Outer Halo */}
      <div
        className={`cursor-dot hidden md:block w-8 h-8 border rounded-full shadow-[0_0_12px_rgba(81,154,102,0.4)] pointer-events-none`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 1.4 : linkHovered ? 2.0 : 1})`,
          transition: 'transform 0.15s ease-out, border-color 0.2s',
          borderColor: linkHovered ? '#FFAA00' : '#237227',
        }}
      />
    </>
  );
}
