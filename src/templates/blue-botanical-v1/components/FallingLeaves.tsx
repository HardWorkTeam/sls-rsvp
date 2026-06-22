'use client';

import React, { useEffect, useRef } from 'react';

interface Leaf {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  swayAmplitude: number;
  swaySpeed: number;
}

const LEAF_COLORS = [
  'rgba(106, 140, 178, 0.35)', // Soft blue-gray
  'rgba(155, 176, 200, 0.28)', // Lighter botanical wash
  'rgba(74, 111, 148, 0.25)',  // Deep ocean leaf
  'rgba(182, 199, 219, 0.32)', // Icy blue
  'rgba(142, 169, 194, 0.22)', // Soft navy wash
];

const seed = (n: number) => ((Math.sin(n * 9301 + 49297) * 233280) % 1 + 1) % 1;

export const FallingLeaves: React.FC<{ count?: number }> = ({ count = 20 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const leaves: Leaf[] = Array.from({ length: count }, (_, i) => ({
      x:             seed(i * 4)     * canvas.width,
      y:             seed(i * 8 + 1) * canvas.height,
      size:          seed(i * 6 + 2) * 12 + 6,
      speedY:        seed(i * 5 + 3) * 0.7 + 0.3,
      speedX:        (seed(i * 7 + 4) - 0.5) * 0.4,
      opacity:       seed(i * 3 + 5) * 0.55 + 0.25,
      rotation:      seed(i * 9 + 6) * Math.PI * 2,
      rotationSpeed: (seed(i * 2 + 7) - 0.5) * 0.02,
      color:         LEAF_COLORS[Math.floor(seed(i * 10 + 8) * LEAF_COLORS.length)],
      swayAmplitude: seed(i * 12 + 9) * 25 + 10,
      swaySpeed:     seed(i * 11 + 10) * 0.015 + 0.005,
    }));

    const drawLeaf = (ctx: CanvasRenderingContext2D, l: Leaf) => {
      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(l.rotation);
      ctx.globalAlpha = l.opacity;

      ctx.fillStyle = l.color;
      ctx.beginPath();
      // Draw organic lens-like leaf shape using two quadratic curves
      ctx.moveTo(0, -l.size);
      ctx.quadraticCurveTo(l.size * 0.45, -l.size * 0.5, 0, l.size * 0.8);
      ctx.quadraticCurveTo(-l.size * 0.45, -l.size * 0.5, 0, -l.size);
      ctx.fill();

      // Draw subtle leaf vein
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 0.65;
      ctx.beginPath();
      ctx.moveTo(0, -l.size * 0.95);
      ctx.lineTo(0, l.size * 0.5);
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      leaves.forEach((l) => {
        drawLeaf(ctx, l);
        l.y += l.speedY;
        // Sway leaf horizontally in a wave pattern
        l.x += Math.sin(l.y * l.swaySpeed) * 0.55 + l.speedX;
        l.rotation += l.rotationSpeed;

        // Reset to top when off screen
        if (l.y > canvas.height + l.size) {
          l.y = -l.size;
          l.x = Math.random() * canvas.width;
        }
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
};
