'use client';

import React from 'react';

export default function FuturisticGlowOverlays() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Deep Electric Cyan Data Surge Aurora (Top Left / Hero Area) */}
      <div
        className="absolute -top-24 -left-24 w-[700px] h-[700px] rounded-full opacity-55 mix-blend-screen filter blur-[120px] animate-pulse pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 240, 255, 0.35) 0%, rgba(0, 112, 243, 0.18) 50%, transparent 75%)',
          animationDuration: '7s',
        }}
      />

      {/* 2. Cyber Violet Intelligence Nebula (Upper Right) */}
      <div
        className="absolute top-1/4 -right-32 w-[750px] h-[750px] rounded-full opacity-50 mix-blend-screen filter blur-[130px] animate-pulse pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(138, 43, 226, 0.38) 0%, rgba(121, 40, 202, 0.18) 50%, transparent 75%)',
          animationDuration: '9s',
          animationDelay: '1.5s',
        }}
      />

      {/* 3. Deep Sapphire Cloud Infrastructure Ambient Glow (Mid-Left) */}
      <div
        className="absolute top-1/2 -left-40 w-[700px] h-[700px] rounded-full opacity-45 mix-blend-screen filter blur-[120px] animate-pulse pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 112, 243, 0.32) 0%, rgba(0, 240, 255, 0.15) 50%, transparent 75%)',
          animationDuration: '11s',
          animationDelay: '3s',
        }}
      />

      {/* 4. Luxury Gold & Champagne Value Accent (Bottom Right) */}
      <div
        className="absolute bottom-10 right-1/6 w-[600px] h-[600px] rounded-full opacity-35 mix-blend-screen filter blur-[130px] animate-pulse pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, rgba(242, 217, 141, 0.12) 50%, transparent 75%)',
          animationDuration: '8.5s',
          animationDelay: '2s',
        }}
      />

      {/* 5. Subtle Perspective Cyber Network Floor Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 240, 255, 0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(138, 43, 226, 0.6) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}
