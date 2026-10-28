'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports fine pointer (mouse), not touch screens
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsPointerDevice(true);
      setMounted(true);
    } else {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, select, textarea, [data-cursor]');
      if (interactive) {
        setIsHovered(true);
        const text = interactive.getAttribute('data-cursor') || '';
        setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  if (!mounted || !isPointerDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9990] overflow-hidden">
      {/* Outer Follow Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? (cursorText ? 2.4 : 1.6) : 1,
          backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.12)' : 'rgba(212, 175, 55, 0)',
          borderColor: isHovered ? 'rgba(242, 217, 141, 0.8)' : 'rgba(212, 175, 55, 0.4)',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="w-8 h-8 rounded-full border border-gold-500/40 flex items-center justify-center transition-colors"
      >
        {cursorText && (
          <span className="text-[7px] font-mono font-bold tracking-widest text-gold-300 uppercase">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Precision Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
        className="w-1.5 h-1.5 rounded-full bg-gold-400"
      />
    </div>
  );
}
