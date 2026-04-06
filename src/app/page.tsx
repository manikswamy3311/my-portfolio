'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import DataStream from '@/components/ui/DataStream';

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer glow */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-500 ease-out"
        style={{
          left: pos.x - 20,
          top: pos.y - 20,
          width: 40,
          height: 40,
        }}
      >
        <div
          className={`w-full h-full rounded-full transition-all duration-300 ${
            isHovering
              ? 'scale-150 bg-cyan-400/10 border border-cyan-400/30'
              : 'scale-100 bg-white/5 border border-white/10'
          }`}
        />
      </div>
      {/* Inner dot */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: pos.x - 3,
          top: pos.y - 3,
          width: 6,
          height: 6,
        }}
      >
        <div
          className={`w-full h-full rounded-full bg-white transition-transform duration-150 ${
            isHovering ? 'scale-0' : 'scale-100'
          }`}
        />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className="noise">
      <CustomCursor />
      <Hero />

      <About />
      <DataStream />
      <Experience />
      <DataStream className="opacity-70" />
      <Projects />
      <DataStream />
      <Skills />
      <DataStream className="opacity-70" />
      <Contact />
    </div>
  );
}
