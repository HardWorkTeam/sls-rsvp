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
  type: 'petal' | 'gold-leaf';
}

export const PetalRain: React.FC<{ count?: number }> = ({ count = 32 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Deterministic random generator for SSR/client matching
    const seed = (n: number) => ((Math.sin(n * 9301 + 49297) * 233280) % 1 + 1) % 1;

    const colors = [
      'rgba(186, 12, 47, 0.7)',  // Crimson
      'rgba(219, 48, 105, 0.65)', // Rose Pink
      'rgba(141, 2, 31, 0.75)',  // Deep Maroon
    ];

    const petals: Petal[] = Array.from({ length: count }, (_, i) => {
      const isGold = seed(i * 12 + 3) > 0.7;
      return {
        x: seed(i * 3.5) * canvas.width,
        y: seed(i * 7.2 + 2) * canvas.height,
        size: seed(i * 4.1 + 5) * 8 + 4,
        speedY: seed(i * 5.1 + 8) * 0.45 + 0.25,
        speedX: (seed(i * 6.3) - 0.5) * 0.25,
        opacity: seed(i * 2.8 + 1) * 0.5 + 0.35,
        rotation: seed(i * 8.9 + 4) * Math.PI * 2,
        rotationSpeed: (seed(i * 3.1 + 9) - 0.5) * 0.015,
        color: isGold ? 'rgba(232, 201, 122, 0.8)' : colors[Math.floor(seed(i * 9.2) * colors.length)],
        type: isGold ? 'gold-leaf' : 'petal',
      };
    });

    const drawPetalShape = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      // Draw a rose-like petal leaf shape
      ctx.moveTo(0, -size);
      ctx.quadraticCurveTo(size * 0.6, -size * 0.6, size * 0.4, 0);
      ctx.quadraticCurveTo(size * 0.7, size * 0.7, 0, size);
      ctx.quadraticCurveTo(-size * 0.7, size * 0.7, -size * 0.4, 0);
      ctx.quadraticCurveTo(-size * 0.6, -size * 0.6, 0, -size);
      ctx.closePath();
    };

    const drawGoldLeafShape = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      // Draw diamond gold flake
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.5, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(-size * 0.5, 0);
      ctx.closePath();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'gold-leaf') {
          // Gold metallic gradient
          const grad = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
          grad.addColorStop(0, '#FFF5CC');
          grad.addColorStop(0.5, p.color);
          grad.addColorStop(1, '#B8860B');
          ctx.fillStyle = grad;
          ctx.globalAlpha = p.opacity;
          drawGoldLeafShape(ctx, p.size);
          ctx.fill();
        } else {
          // Velvet petal gradient
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          grad.addColorStop(0, '#FFA8A8');
          grad.addColorStop(0.4, p.color);
          grad.addColorStop(1, '#5C0214');
          ctx.fillStyle = grad;
          ctx.globalAlpha = p.opacity;
          drawPetalShape(ctx, p.size);
          ctx.fill();

          // Highlight/Veins detail
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(0, p.size);
          ctx.stroke();
        }

        ctx.restore();

        // Update positions
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        // Reset to top when passing viewport height
        if (p.y > canvas.height + p.size) {
          p.y = -p.size;
          p.x = Math.random() * canvas.width;
        }

        // Horizontal wrap
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.x < -p.size) p.x = canvas.width + p.size;
      });

      rafRef.current = requestAnimationFrame(draw);
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
        draw();
      });
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };

    let observer: IntersectionObserver | undefined;
    if (reduceMotion) {
      draw();
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
