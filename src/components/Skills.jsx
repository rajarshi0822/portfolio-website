import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SectionDecorations } from './Interactive3D';

const skillGroups = [
  { cat: 'Frontend', icon: '🎨', color: '#f59e0b', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'HTML5', 'CSS3'] },
  { cat: 'Backend', icon: '⚙️', color: '#06b6d4', items: ['Node.js', 'Express', 'Python', 'FastAPI', 'REST APIs', 'GraphQL'] },
  { cat: 'Database', icon: '🗄️', color: '#8b5cf6', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Prisma'] },
  { cat: 'DevOps & Tools', icon: '🛠️', color: '#10b981', items: ['Git', 'GitHub', 'Docker', 'AWS', 'Linux', 'VS Code'] },
];

/* ── Interactive Skill Card with 3D tilt ── */
function SkillCard({ cat, icon, color, items, gi, isMobile }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouse = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const resetMouse = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: gi * 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      className="glass rounded-2xl transition-all duration-300 group relative overflow-hidden"
      style={{
        padding: isMobile ? '1.3rem' : '1.8rem',
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}50`;
        e.currentTarget.style.boxShadow = `0 16px 40px ${color}12, 0 0 20px ${color}08`;
      }}
    >
      {/* Spotlight follow */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: useTransform(
            [x, y],
            ([xv, yv]) => `radial-gradient(250px circle at ${(xv + 0.5) * 100}% ${(yv + 0.5) * 100}%, ${color}15, transparent 60%)`
          ),
        }}
      />

      <div className="relative" style={{ transform: 'translateZ(15px)' }}>
        <div className="flex items-center gap-2 mb-4">
          <span style={{ fontSize: '1.2rem' }}>{icon}</span>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '0.9rem' : '1rem', color, fontWeight: 700 }}>{cat}</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {items.map((item, si) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: gi * 0.1 + si * 0.05 }}
              whileHover={{ scale: 1.15, y: -3, boxShadow: `0 0 15px ${color}30` }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full transition-all duration-200 cursor-pointer select-none"
              style={{
                padding: '5px 14px', fontSize: isMobile ? '0.74rem' : '0.78rem',
                background: `${color}0c`, border: `1px solid ${color}25`,
                color: '#9494b8',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = `${color}60`; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#9494b8'; e.currentTarget.style.borderColor = `${color}25`; }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return (
    <section id="skills" className="relative overflow-hidden" style={{ padding: isMobile ? '5rem 1.2rem' : '7rem 2rem', background: 'var(--color-bg)' }}>
      {/* 3D Background */}
      <SectionDecorations variant="skills" />

      {/* Ambient glow */}
      <div className="absolute pointer-events-none rounded-full"
        style={{ top: '20%', right: '-10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      <div className="relative z-10" style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center" style={{ marginBottom: isMobile ? '2.5rem' : '4rem' }}>
          <p style={{ color: '#7c3aed', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            ✦ what i work with ✦
          </p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.2rem)' }}>
            Tech <span className="grad-text">Stack</span>
          </h2>
        </motion.div>

        <div className="grid gap-4" style={{ gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {skillGroups.map(({ cat, icon, color, items }, gi) => (
            <SkillCard key={cat} cat={cat} icon={icon} color={color} items={items} gi={gi} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}
