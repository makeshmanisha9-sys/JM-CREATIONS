import React from 'react';

export default function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9980] grain-overlay opacity-30 select-none"
    />
  );
}
