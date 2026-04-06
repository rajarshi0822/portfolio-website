import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/* ═══════════════════════════════════════
   FLOATING 3D DECORATIONS — Pure CSS/Framer
   No extra Canvas = smooth performance
═══════════════════════════════════════ */

const shapes = {
  diamond: (color, size) => (
    <div style={{
      width: size, height: size,
      background: `linear-gradient(135deg, ${color}30, ${color}08)`,
      border: `1px solid ${color}25`,
      borderRadius: '4px',
      transform: 'rotate(45deg)',
      boxShadow: `0 0 20px ${color}15`,
    }} />
  ),
  circle: (color, size) => (
    <div style={{
      width: size, height: size,
      background: `radial-gradient(circle, ${color}20, transparent)`,
      border: `1px solid ${color}18`,
      borderRadius: '50%',
      boxShadow: `0 0 25px ${color}10`,
    }} />
  ),
  ring: (color, size) => (
    <div style={{
      width: size, height: size,
      border: `1.5px solid ${color}20`,
      borderRadius: '50%',
      boxShadow: `0 0 15px ${color}08, inset 0 0 15px ${color}05`,
    }} />
  ),
  cross: (color, size) => (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '15%', right: '15%', height: 1.5, background: `${color}20`, transform: 'translateY(-50%)' }} />
      <div style={{ position: 'absolute', left: '50%', top: '15%', bottom: '15%', width: 1.5, background: `${color}20`, transform: 'translateX(-50%)' }} />
    </div>
  ),
  dot: (color, size) => (
    <div style={{
      width: size * 0.3, height: size * 0.3,
      background: color,
      borderRadius: '50%',
      opacity: 0.3,
      boxShadow: `0 0 12px ${color}40`,
    }} />
  ),
};

/* ── Single floating decoration ── */
function FloatingDeco({ shape, color, size, x, y, delay = 0, duration = 20 }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -15, 5, -10, 0],
        rotate: shape === 'diamond' ? [45, 55, 40, 50, 45] : [0, 5, -3, 4, 0],
        opacity: [0.6, 0.8, 0.5, 0.7, 0.6],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {shapes[shape]?.(color, size)}
    </motion.div>
  );
}

/* ── Section decoration preset ── */
const decoPresets = {
  about: [
    { shape: 'diamond', color: '#7c3aed', size: 18, x: '8%', y: '15%', delay: 0, duration: 18 },
    { shape: 'circle', color: '#06b6d4', size: 25, x: '92%', y: '25%', delay: 2, duration: 22 },
    { shape: 'dot', color: '#a78bfa', size: 30, x: '5%', y: '70%', delay: 1, duration: 15 },
    { shape: 'ring', color: '#7c3aed', size: 35, x: '88%', y: '75%', delay: 3, duration: 20 },
    { shape: 'cross', color: '#06b6d4', size: 14, x: '18%', y: '45%', delay: 0.5, duration: 25 },
  ],
  stats: [
    { shape: 'diamond', color: '#f59e0b', size: 16, x: '6%', y: '20%', delay: 1, duration: 20 },
    { shape: 'circle', color: '#06b6d4', size: 22, x: '94%', y: '30%', delay: 0, duration: 18 },
    { shape: 'dot', color: '#7c3aed', size: 28, x: '90%', y: '70%', delay: 2, duration: 16 },
    { shape: 'ring', color: '#f59e0b', size: 30, x: '10%', y: '80%', delay: 1.5, duration: 22 },
  ],
  projects: [
    { shape: 'diamond', color: '#06b6d4', size: 20, x: '5%', y: '12%', delay: 0, duration: 22 },
    { shape: 'circle', color: '#7c3aed', size: 28, x: '93%', y: '18%', delay: 1, duration: 17 },
    { shape: 'dot', color: '#10b981', size: 26, x: '8%', y: '85%', delay: 2, duration: 20 },
    { shape: 'cross', color: '#06b6d4', size: 16, x: '88%', y: '80%', delay: 0.5, duration: 24 },
    { shape: 'ring', color: '#7c3aed', size: 32, x: '50%', y: '5%', delay: 3, duration: 19 },
  ],
  skills: [
    { shape: 'diamond', color: '#8b5cf6', size: 16, x: '7%', y: '18%', delay: 0.5, duration: 20 },
    { shape: 'circle', color: '#10b981', size: 20, x: '92%', y: '22%', delay: 0, duration: 18 },
    { shape: 'dot', color: '#f59e0b', size: 24, x: '4%', y: '75%', delay: 1, duration: 16 },
    { shape: 'ring', color: '#8b5cf6', size: 28, x: '90%', y: '80%', delay: 2, duration: 22 },
    { shape: 'cross', color: '#06b6d4', size: 12, x: '50%', y: '8%', delay: 1.5, duration: 25 },
  ],
  contact: [
    { shape: 'diamond', color: '#7c3aed', size: 22, x: '6%', y: '20%', delay: 0, duration: 20 },
    { shape: 'circle', color: '#06b6d4', size: 26, x: '94%', y: '30%', delay: 1, duration: 18 },
    { shape: 'dot', color: '#a78bfa', size: 30, x: '10%', y: '75%', delay: 2, duration: 22 },
    { shape: 'ring', color: '#06b6d4', size: 35, x: '88%', y: '70%', delay: 0.5, duration: 24 },
  ],
};

/* ── Exported: decorate a section ── */
export function SectionDecorations({ variant = 'about' }) {
  const decos = decoPresets[variant] || decoPresets.about;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {decos.map((d, i) => (
        <FloatingDeco key={i} {...d} />
      ))}
    </div>
  );
}

/* ── 3D Tilt Card Hook ── */
export function useTilt3D(intensity = 6) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 200, damping: 25 });

  const ref = useRef(null);

  const onMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => { x.set(0); y.set(0); };

  return { ref, onMouseMove, onMouseLeave, style: { rotateX, rotateY, transformStyle: 'preserve-3d' } };
}

/* ── Spotlight Follow Effect ── */
export function useSpotlight(color = '#7c3aed') {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const background = useTransform(
    [x, y],
    ([xv, yv]) => `radial-gradient(350px circle at ${xv * 100}% ${yv * 100}%, ${color}10, transparent 60%)`
  );

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  return { onMouseMove, spotlightStyle: { background } };
}

export default SectionDecorations;
