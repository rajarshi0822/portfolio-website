import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiStar, FiGitBranch, FiUsers, FiBook, FiUserCheck, FiActivity } from 'react-icons/fi';
import { SectionDecorations } from './Interactive3D';

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'rajarshi0822';

/* ── Animated Counter ── */
function AnimatedCounter({ value, color, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const num = typeof value === 'number' ? value : 0;
    if (num === 0) { setCount(0); return; }
    let start = 0;
    const duration = 1500;
    const step = Math.max(1, Math.floor(num / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'inherit', fontWeight: 800, color, lineHeight: 1 }}>
      {count}
    </span>
  );
}

/* ── Language Donut Chart ── */
function LanguageDonut({ topLangs, total, langColors, isMobile }) {
  let accumulated = 0;
  const segments = topLangs.map(([lang, count]) => {
    const pct = (count / total) * 100;
    const start = accumulated;
    accumulated += pct;
    return { lang, pct, start, color: langColors[lang] || langColors.default };
  });

  const conicGrad = segments.map(s => `${s.color} ${s.start}% ${s.start + s.pct}%`).join(', ');

  return (
    <div className="flex items-center gap-6" style={{ flexDirection: isMobile ? 'column' : 'row' }}>
      {/* Donut */}
      <div className="relative flex-shrink-0" style={{ width: isMobile ? 120 : 150, height: isMobile ? 120 : 150 }}>
        <div className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${conicGrad})`,
            boxShadow: '0 0 30px rgba(124,58,237,0.15)',
          }} />
        <div className="absolute rounded-full flex items-center justify-center"
          style={{
            inset: isMobile ? 25 : 30,
            background: 'var(--color-surface)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
          }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#6b6b8a' }}>{topLangs.length} langs</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2 flex-1" style={{ minWidth: 0 }}>
        {segments.map(s => (
          <div key={s.lang} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}40` }} />
            <span style={{ fontSize: '0.8rem', color: '#f0eeff', flex: 1 }}>{s.lang}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#6b6b8a' }}>{Math.round(s.pct)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Stat Card ── */
function StatCard({ icon, label, value, color, isMobile, inView, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.25 } }}
      whileTap={{ scale: 0.95 }}
      className="glass relative overflow-hidden rounded-2xl text-center transition-all duration-300 cursor-pointer"
      style={{ padding: isMobile ? '1.2rem 1rem' : '1.8rem 1.5rem' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}50`;
        e.currentTarget.style.boxShadow = `0 16px 40px ${color}15, 0 0 25px ${color}08`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(124,58,237,0.15)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top glow bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: color, opacity: 0.5 }} />

      {/* Ambient glow */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}20, transparent)`, filter: 'blur(20px)' }} />

      <div className="flex justify-center mb-2" style={{ fontSize: isMobile ? '1.3rem' : '1.6rem', color }}>{icon}</div>
      <div style={{ fontSize: isMobile ? '1.7rem' : '2.2rem' }}>
        <AnimatedCounter value={value} color={color} inView={inView} />
      </div>
      <div style={{ color: '#6b6b8a', fontSize: isMobile ? '0.62rem' : '0.7rem', marginTop: '0.4rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {label}
      </div>
    </motion.div>
  );
}

/* ── Main Component ── */
export default function GitHubStats({ profile, repos, totalStars, totalForks, languageMap }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const sectionRef = useRef();
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const topLangs = Object.entries(languageMap).sort((a, b) => b[1] - a[1]).slice(0, 7);
  const total = topLangs.reduce((a, [, v]) => a + v, 0);
  const langColorMap = {
    JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572a5',
    Java: '#b07219', CSS: '#563d7c', HTML: '#e34c26', Go: '#00add8',
    Rust: '#dea584', 'C++': '#f34b7d', Ruby: '#cc342d', Swift: '#f05138',
    Kotlin: '#A97BFF', 'Jupyter Notebook': '#F37626', default: '#7c3aed',
  };

  return (
    <section ref={sectionRef} id="stats" className="relative overflow-hidden" style={{ padding: isMobile ? '5rem 1.2rem' : '7rem 2rem' }}>
      {/* 3D Background */}
      <SectionDecorations variant="stats" />

      <div className="relative z-10" style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
        style={{ marginBottom: isMobile ? '2.5rem' : '4rem' }}
      >
        <p style={{ color: '#7c3aed', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          ✦ live data from github api ✦
        </p>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.2rem)' }}>
          GitHub <span className="grad-text">Stats</span>
        </h2>
      </motion.div>

      {/* Stat cards grid */}
      <div className="grid gap-3" style={{ gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)', marginBottom: isMobile ? '2rem' : '3rem' }}>
        <StatCard icon={<FiStar />}      label="Stars"     value={totalStars}              color="#f59e0b" isMobile={isMobile} inView={inView} delay={0} />
        <StatCard icon={<FiGitBranch />} label="Forks"     value={totalForks}              color="#06b6d4" isMobile={isMobile} inView={inView} delay={0.1} />
        <StatCard icon={<FiBook />}      label="Repos"     value={profile?.public_repos||0} color="#7c3aed" isMobile={isMobile} inView={inView} delay={0.2} />
        <StatCard icon={<FiUsers />}     label="Followers"  value={profile?.followers||0}   color="#8b5cf6" isMobile={isMobile} inView={inView} delay={0.3} />
        <StatCard icon={<FiUserCheck />} label="Following"  value={profile?.following||0}   color="#f43f5e" isMobile={isMobile} inView={inView} delay={0.4} />
      </div>

      {/* Contribution graph */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass rounded-2xl overflow-hidden mb-6"
        style={{ padding: isMobile ? '1.2rem' : '1.8rem' }}
      >
        <h3 className="flex items-center gap-2 mb-4" style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1rem' : '1.15rem', color: '#f0eeff' }}>
          <FiActivity style={{ color: '#7c3aed' }} /> Contribution Activity
        </h3>
        <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(0,0,0,0.2)', padding: '0.8rem' }}>
          <img
            src={`https://ghchart.rshah.org/7c3aed/${USERNAME}`}
            alt="GitHub Contribution Graph"
            className="w-full"
            style={{ filter: 'invert(1) hue-rotate(180deg) brightness(1.1) contrast(1.1)', borderRadius: 8, minHeight: 40 }}
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>
      </motion.div>

      {/* Language breakdown with donut */}
      {topLangs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-2xl"
          style={{ padding: isMobile ? '1.4rem' : '2rem' }}
        >
          <h3 className="flex items-center gap-2 mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1rem' : '1.15rem', color: '#f0eeff' }}>
            <span style={{ color: '#7c3aed' }}>◆</span> Language Breakdown
          </h3>

          <LanguageDonut topLangs={topLangs} total={total} langColors={langColorMap} isMobile={isMobile} />

          {/* Bar breakdown */}
          <div className="flex flex-col gap-3 mt-6">
            {topLangs.map(([lang, count]) => {
              const pct = Math.round((count / total) * 100);
              const color = langColorMap[lang] || langColorMap.default;
              return (
                <div key={lang}>
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}40` }} />
                      <span style={{ fontSize: isMobile ? '0.78rem' : '0.85rem', color: '#f0eeff' }}>{lang}</span>
                    </div>
                    <span style={{ fontSize: isMobile ? '0.7rem' : '0.78rem', color: '#6b6b8a', fontFamily: 'var(--font-mono)' }}>{pct}%</span>
                  </div>
                  <div className="rounded-full overflow-hidden" style={{ background: 'rgba(10,10,24,0.8)', height: 6 }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full"
                      style={{ background: color, boxShadow: `0 0 10px ${color}50` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
      </div>
    </section>
  );
}
