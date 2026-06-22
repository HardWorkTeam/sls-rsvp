'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'diamond' | 'circle' | 'petal';
}

export const GoldParticles: React.FC<{ count?: number }> = ({ count = 28 }) => {
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

    // Seeded-deterministic particle init so SSR & client match
    const seed = (n: number) => ((Math.sin(n * 9301 + 49297) * 233280) % 1 + 1) % 1;

    const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
      x:             seed(i * 3)     * canvas.width,
      y:             seed(i * 7 + 1) * canvas.height,
      size:          seed(i * 5 + 2) * 7 + 3,
      speedY:       -(seed(i * 4 + 3) * 0.22 + 0.08),
      speedX:        (seed(i * 6 + 4) - 0.5) * 0.18,
      opacity:       seed(i * 2 + 5) * 0.55 + 0.25,
      rotation:      seed(i * 8 + 6) * Math.PI * 2,
      rotationSpeed: (seed(i * 3 + 7) - 0.5) * 0.02,
      shape:         (['diamond', 'circle', 'petal'] as const)[Math.floor(seed(i * 9 + 8) * 3)],
    }));

    const drawDiamond = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y - r);
      ctx.lineTo(x + r * 0.6, y);
      ctx.lineTo(x, y + r);
      ctx.lineTo(x - r * 0.6, y);
      ctx.closePath();
    };

    const drawPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
      ctx.beginPath();
      ctx.ellipse(x, y - r * 0.5, r * 0.4, r, 0, 0, Math.PI * 2);
    };

    const goldGradient = (p: Particle) => {
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
      grad.addColorStop(0, `rgba(232, 201, 122, ${p.opacity})`);
      grad.addColorStop(0.5, `rgba(201, 168, 76, ${p.opacity * 0.7})`);
      grad.addColorStop(1, `rgba(139, 105, 20, 0)`);
      return grad;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = goldGradient(p);

        if (p.shape === 'diamond') {
          drawDiamond(ctx, 0, 0, p.size);
        } else if (p.shape === 'petal') {
          drawPetal(ctx, 0, 0, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
        }
        ctx.fill();

        // Add inner shine
        ctx.fillStyle = `rgba(255, 240, 180, ${p.opacity * 0.4})`;
        ctx.beginPath();
        ctx.arc(-p.size * 0.2, -p.size * 0.2, p.size * 0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Update position
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        // Reset to bottom when off top
        if (p.y + p.size < 0) {
          p.y = canvas.height + p.size;
          p.x = Math.random() * canvas.width;
        }
        // Horizontal wrap
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.x < -p.size) p.x = canvas.width + p.size;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};
