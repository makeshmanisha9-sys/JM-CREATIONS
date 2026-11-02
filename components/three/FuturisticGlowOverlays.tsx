'use client';

import React from 'react';

export default function FuturisticGlowOverlays() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Deep Cyan Data Surge Ambient Nebula (Top Left) */}
      <div
        className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full opacity-35 mix-blend-screen filter blur-[140px] animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.22) 0%, rgba(0, 112, 243, 0.12) 50%, transparent 70%)',
          animationDuration: '9s',
        }}
      />

      {/* 2. Electric Violet Creative Intelligence Nebula (Middle Right) */}
      <div
        className="absolute top-1/3 -right-40 w-[700px] h-[700px] rounded-full opacity-30 mix-blend-screen filter blur-[150px] animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(138, 43, 226, 0.25) 0%, rgba(121, 40, 202, 0.12) 50%, transparent 70%)',
          animationDuration: '11s',
          animationDelay: '2s',
        }}
      />

      {/* 3. Deep Sapphire Cloud Architecture Aurora (Bottom Left) */}
      <div
        className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] rounded-full opacity-25 mix-blend-screen filter blur-[130px] animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(30, 64, 175, 0.3) 0%, rgba(0, 240, 255, 0.1) 50%, transparent 70%)',
          animationDuration: '13s',
          animationDelay: '4s',
        }}
      />

      {/* 4. Subtle Gold Precision Horizon (Center subtle warmth) */}
      <div
        className="absolute top-2/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 mix-blend-screen filter blur-[140px] animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.22) 0%, rgba(242, 217, 141, 0.08) 50%, transparent 70%)',
          animationDuration: '10s',
          animationDelay: '1.5s',
        }}
      />

      {/* 5. Subtle Horizontal Cyber Light Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 240, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(138, 43, 226, 0.4) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
}
