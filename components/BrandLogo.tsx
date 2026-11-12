'use client';

import React from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textClassName?: string;
  subtext?: string;
  variant?: 'emblem' | 'transparent';
  priority?: boolean;
}

export default function BrandLogo({
  className = '',
  size = 'md',
  showText = false,
  textClassName = '',
  subtext = 'Jina Groups Enterprise',
  variant = 'emblem',
  priority = true,
}: BrandLogoProps) {
  const sizeMap = {
    xs: { box: 'w-7 h-7 rounded-lg', dim: 28 },
    sm: { box: 'w-8 h-8 rounded-lg', dim: 32 },
    md: { box: 'w-10 h-10 rounded-xl', dim: 40 },
    lg: { box: 'w-14 h-14 rounded-2xl', dim: 56 },
    xl: { box: 'w-20 h-20 rounded-3xl', dim: 80 },
  };

  const { box, dim } = sizeMap[size];
  const imgSrc =
    variant === 'transparent' ? '/images/logo-transparent.png' : '/images/logo-icon.png';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`${box} relative overflow-hidden shrink-0 border border-gold-500/50 shadow-gold-glow flex items-center justify-center transition-all duration-300 ${
          variant === 'emblem' ? 'bg-[#ffd255]' : 'bg-zinc-950/80'
        }`}
      >
        <Image
          src={imgSrc}
          alt="JM Creations Official Logo"
          width={dim * 2}
          height={dim * 2}
          priority={priority}
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`font-display font-black text-lg tracking-tight text-white group-hover:text-gold-400 transition-colors ${textClassName}`}
          >
            JM CREATIONS
          </span>
          {subtext && (
            <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
              {subtext}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
