import { useEffect, useRef } from 'react';

type Point = { x: number; y: number };

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

const WAVE_PALETTE: WaveConfig[] = [
  { offset: 0,              amplitude: 72, frequency: 0.0028, color: '#8c52ff', opacity: 0.30 },
  { offset: Math.PI / 2,   amplitude: 96, frequency: 0.0022, color: '#6b35e8', opacity: 0.22 },
  { offset: Math.PI,       amplitude: 58, frequency: 0.0036, color: '#0071E3', opacity: 0.20 },
  { offset: Math.PI * 1.5, amplitude: 82, frequency: 0.0019, color: '#a78bfa', opacity: 0.16 },
  { offset: Math.PI * 2,   amplitude: 50, frequency: 0.0044, color: '#3b82f6', opacity: 0.13 },
];

export function GlowyWavesBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef    = useRef<Point>({ x: 0, y: 0 });
  const targetRef   = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouseInfluence  = prefersReduced ? 0  : 90;
    const influenceRadius = prefersReduced ? 0  : 500;
    const smoothing       = prefersReduced ? 1  : 0.07;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const mid = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current  = { ...mid };
      targetRef.current = { ...mid };
    };

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();
      const step = 4;
      for (let x = 0; x <= canvas.width; x += step) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const infl = Math.max(0, 1 - dist / influenceRadius);
        const mouseEff = infl * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);

        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.0018 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.38 + time * 0.0028) * (wave.amplitude * 0.42) +
          mouseEff;

        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineWidth     = 2.2;
      ctx.strokeStyle   = wave.color;
      ctx.globalAlpha   = wave.opacity;
      ctx.shadowBlur    = 38;
      ctx.shadowColor   = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      time += 1;
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * smoothing;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      WAVE_PALETTE.forEach(drawWave);
      animId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      targetRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
    };
    const onResize = () => resize();

    resize();
    window.addEventListener('resize',     onResize);
    window.addEventListener('mousemove',  onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize',     onResize);
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: 'block' }}
    />
  );
}
