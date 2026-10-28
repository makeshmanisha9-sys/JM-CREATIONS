'use client';

import React, { useEffect, useRef } from 'react';

export default function HeroKineticObject() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates for subtle tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      targetMouseY = ((e.clientY - rect.top) / height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Mathematical Torus Knot / Kinetic Wave Orb Simulation
    let angle = 0;
    const p = 3;
    const q = 7;
    const nodeCount = 180;

    const render = () => {
      // Smooth interpolation for mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) * 0.32;

      angle += 0.007;

      ctx.save();
      ctx.translate(cx, cy);

      // Draw subtle orbital metallic particle ring
      ctx.beginPath();
      ctx.arc(0, 0, scale * 1.25, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);
      ctx.stroke();
      ctx.setLineDash([]);

      const points: { x: number; y: number; z: number; color: string }[] = [];

      for (let i = 0; i < nodeCount; i++) {
        const u = (i / nodeCount) * Math.PI * 2 * p + angle;
        const r = 0.5 * (2 + Math.sin(q * u / p));

        // 3D coordinates of the Torus Knot
        let x = r * Math.cos(u);
        let y = r * Math.sin(u);
        let z = -Math.sin(q * u / p);

        // Apply mouse tilt & rotation
        const cosY = Math.cos(angle * 0.8 + mouseX * 0.8);
        const sinY = Math.sin(angle * 0.8 + mouseX * 0.8);
        const cosX = Math.cos(mouseY * 0.6);
        const sinX = Math.sin(mouseY * 0.6);

        // Rotate Y
        let rx = x * cosY - z * sinY;
        let rz = x * sinY + z * cosY;

        // Rotate X
        let ry = y * cosX - rz * sinX;
        let finalZ = y * sinX + rz * cosX;

        // Perspective projection
        const fov = 3.5;
        const perspective = fov / (fov + finalZ * 0.4);

        const px = rx * scale * perspective;
        const py = ry * scale * perspective;

        // Metallic depth color shading
        const depthAlpha = Math.max(0.15, Math.min(0.95, (finalZ + 1.5) / 3));
        const isHighlight = i % 7 === 0;

        points.push({
          x: px,
          y: py,
          z: finalZ,
          color: isHighlight
            ? `rgba(255, 244, 225, ${depthAlpha})`
            : `rgba(212, 175, 55, ${depthAlpha * 0.85})`,
        });
      }

      // Sort points back-to-front for proper depth occlusion
      points.sort((a, b) => a.z - b.z);

      // Draw connected energetic filament lines
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        if (i === 0) {
          ctx.moveTo(pt.x, pt.y);
        } else {
          ctx.lineTo(pt.x, pt.y);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Draw metallic nodes
      for (const pt of points) {
        ctx.beginPath();
        const nodeSize = Math.max(1, (pt.z + 2) * 1.5);
        ctx.arc(pt.x, pt.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = pt.z > 0 ? 12 : 2;
        ctx.fill();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] flex items-center justify-center pointer-events-none select-none">
      {/* Background Soft Glow Radial */}
      <div className="absolute inset-0 bg-radial-gradient from-gold-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      <canvas
        ref={canvasRef}
        className="w-full h-full relative z-10 opacity-90 transition-opacity duration-1000"
      />
    </div>
  );
}
