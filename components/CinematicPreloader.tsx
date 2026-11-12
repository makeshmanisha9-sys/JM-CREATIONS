'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function CinematicPreloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if user already saw preloader in this session
    try {
      const seen = sessionStorage.getItem('jm_preloader_seen');
      if (seen) {
        setVisible(false);
        return;
      }
    } catch (e) {}

    const timer = setTimeout(() => {
      dismiss();
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem('jm_preloader_seen', 'true');
    } catch (e) {}
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] bg-[#080808] flex flex-col items-center justify-center p-6 select-none cursor-pointer"
          onClick={dismiss}
          aria-live="polite"
          role="status"
          aria-label="Loading JM Creations experience"
        >
          {/* Subtle Studio Monogram */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-20 h-20 rounded-2xl bg-[#ffd255] border border-gold-500/60 flex items-center justify-center shadow-gold-glow-lg mb-6 relative overflow-hidden"
            >
              <Image
                src="/images/logo-icon.png"
                alt="JM Creations Official Logo"
                width={80}
                height={80}
                priority
                className="w-full h-full object-cover select-none"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
              />
            </motion.div>

            {/* Wordmark Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center space-y-1.5"
            >
              <div className="font-display font-bold text-lg sm:text-xl tracking-[0.25em] text-white">
                JM CREATIONS
              </div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-gold-500/80 uppercase">
                Jina Groups Enterprise
              </div>
            </motion.div>

            {/* Horizontal Gold Hairline Laser */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeInOut' }}
              className="h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mt-6"
            />
          </div>

          {/* Skip Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              dismiss();
            }}
            className="absolute bottom-8 text-[10px] font-mono tracking-widest text-zinc-500 hover:text-gold-400 uppercase transition-colors"
          >
            [ Skip Intro ]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
