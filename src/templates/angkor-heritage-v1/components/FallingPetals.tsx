'use client';

import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  type: 'petal' | 'circle';
}

const PETAL_COLORS = [
  'rgba(255, 230, 100, 0.85)',
  'rgba(255, 255, 200, 0.75)',
  'rgba(255, 210, 80, 0.7)',
  'rgba(240, 255, 180, 0.65)',
  'rgba(255, 245, 150, 0.6)',
];

const seed = (n: number) => ((Math.sin(n * 9301 + 49297) * 233280) % 1 + 1) % 1;

export const FallingPetals: React.FC<{ count?: number }> = ({ count = 22 }) => {
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

    const petals: Petal[] = Array.from({ length: count }, (_, i) => ({
      x:             seed(i * 3)     * canvas.width,
      y:             seed(i * 7 + 1) * canvas.height,
      size:          seed(i * 5 + 2) * 10 + 5,
      speedY:        seed(i * 4 + 3) * 1.2 + 0.4,
      speedX:        (seed(i * 6 + 4) - 0.5) * 1.2,
      opacity:       seed(i * 2 + 5) * 0.6 + 0.3,
      rotation:      seed(i * 8 + 6) * Math.PI * 2,
      rotationSpeed: (seed(i * 3 + 7) - 0.5) * 0.04,
      color:         PETAL_COLORS[Math.floor(seed(i * 9 + 8) * PETAL_COLORS.length)],
      type:          seed(i * 11 + 9) > 0.3 ? 'petal' : 'circle',
    }));

    const drawPetal = (ctx: CanvasRenderingContext2D, p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'petal') {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, -p.size * 0.4, p.size * 0.35, p.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        // Vein
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.9);
        ctx.lineTo(0, p.size * 0.1);
        ctx.stroke();
      } else {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        drawPetal(ctx, p);
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.012) * p.speedX;
        p.rotation += p.rotationSpeed;
        if (p.y > canvas.height + p.size) {
          p.y = -p.size;
          p.x = Math.random() * canvas.width;
        }
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    // Guests with motion sensitivity get a single static frame; everyone
    // else gets the animation only while the canvas is on screen, so the
    // rAF loop isn't draining phone batteries for the whole visit.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let running = false;
    const startLoop = () => {
      if (running) return;
      running = true;
      rafRef.current = requestAnimationFrame(function loop() {
        if (!running) return;
        animate();
      });
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };

    let observer: IntersectionObserver | undefined;
    if (reduceMotion) {
      animate();
      cancelAnimationFrame(rafRef.current);
    } else {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) startLoop();
        else stopLoop();
      });
      observer.observe(canvas);
    }

    return () => {
      stopLoop();
      observer?.disconnect();
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
