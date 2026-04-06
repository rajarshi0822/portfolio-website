import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiCoffee, FiHeart, FiZap } from 'react-icons/fi';
import { SectionDecorations } from './Interactive3D';

const highlights = [
  { icon: <FiCode size={18} />,   title: 'Clean Code',     desc: 'Writing readable, maintainable code that teams love to work with.' },
  { icon: <FiZap size={18} />,    title: 'Fast Learner',   desc: 'Quick to pick up new technologies and apply them effectively.' },
  { icon: <FiHeart size={18} />,  title: 'Open Source',    desc: 'Passionate about giving back to the developer community.' },
  { icon: <FiCoffee size={18} />, title: 'Problem Solver', desc: 'Turning complex challenges into elegant, simple solutions.' },
];

const timeline = [
  { year: '2024', title: 'Started Open Source',       desc: 'Began contributing to various open source projects on GitHub.' },
  { year: '2023', title: 'Built First Full-Stack App', desc: 'Created and deployed a complete web application from scratch.' },
  { year: '2022', title: 'Learned React',              desc: 'Fell in love with frontend development and component-based architecture.' },
  { year: '2021', title: 'First Line of Code',         desc: 'Started the journey with HTML, CSS and JavaScript fundamentals.' },
];

function RectFrame({ avatarUrl, isMobile }) {
  const imgW = isMobile ? 150 : 200;
  const imgH = isMobile ? 180 : 240;
  return (
    <div className="relative flex justify-center items-center" style={{ minHeight: isMobile ? 220 : 300 }}>
      {!isMobile && <>
        <div className="absolute rounded-full pointer-events-none"
          style={{
            width: 300, height: 300,
            borderRadius: '30% 70% 60% 40% / 40% 50% 50% 60%',
            border: '1px dashed rgba(124,58,237,0.2)',
            animation: 'borderSpin 18s linear infinite',
          }} />
        <div className="absolute rounded-full pointer-events-none"
          style={{
            width: 240, height: 240,
            borderRadius: '60% 40% 30% 70% / 50% 60% 40% 50%',
            border: '1px dashed rgba(6,182,212,0.12)',
            animation: 'borderSpin 12s linear infinite reverse',
          }} />
      </>}
      <div className="relative z-[2]">
        <motion.div
          whileHover={{ scale: 1.03, rotate: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            padding: 3,
            borderRadius: '24px 8px 24px 8px',
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4, #f59e0b, #7c3aed)',
            backgroundSize: '300% 300%',
            animation: 'shimmer 4s linear infinite',
            boxShadow: '0 0 40px rgba(124,58,237,0.3)',
          }}
        >
          {avatarUrl
            ? <img src={avatarUrl} alt="Rajarshi" style={{ width: imgW, height: imgH, objectFit: 'cover', display: 'block', borderRadius: '22px 6px 22px 6px', border: '3px solid #06060f' }} />
            : <div style={{ width: imgW, height: imgH, background: 'linear-gradient(135deg,#0d0d1a,#1a0a2e)', borderRadius: '22px 6px 22px 6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>👨‍💻</div>
          }
        </motion.div>
        {[{ top: -6, left: -6 }, { top: -6, right: -6 }, { bottom: -6, left: -6 }, { bottom: -6, right: -6 }].map((pos, i) => (
          <div key={i} className="absolute" style={{
            width: 11, height: 11, borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            ...pos, boxShadow: '0 0 10px rgba(124,58,237,0.6)',
          }} />
        ))}
      </div>
      <div className="absolute z-[3] glass-strong rounded-xl flex items-center gap-2"
        style={{
          bottom: isMobile ? -14 : 10,
          right: isMobile ? 'auto' : '5%',
          left: isMobile ? '50%' : 'auto',
          transform: isMobile ? 'translateX(-50%)' : 'none',
          padding: '0.45rem 0.85rem',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          whiteSpace: 'nowrap',
        }}
      >
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', animation: 'pulse-dot 2s ease-in-out infinite' }} />
        <span style={{ fontSize: '0.7rem', color: '#9494b8', fontFamily: 'var(--font-mono)' }}>Open to work</span>
      </div>
    </div>
  );
}

export default function About({ profile }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return (
    <section id="about-detail" className="relative overflow-hidden" style={{ padding: isMobile ? '5rem 1.2rem' : '8rem 2rem' }}>
      {/* 3D Background */}
      <SectionDecorations variant="about" />

      {/* Ambient glow */}
      <div className="absolute pointer-events-none rounded-full"
        style={{ top: '50%', left: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: isMobile ? '3rem' : '5rem' }}
        >
          <p style={{ color: '#7c3aed', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>— WHO AM I —</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem,6vw,3.5rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            About <span className="grad-text">Rajarshi</span>
          </h2>
        </motion.div>

        {/* Bio grid */}
        <div className="grid items-center" style={{ gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: isMobile ? '3.5rem' : '4rem', marginBottom: isMobile ? '3.5rem' : '6rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <RectFrame avatarUrl={profile?.avatar_url} isMobile={isMobile} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginTop: isMobile ? '1.5rem' : 0 }}
          >
            <p style={{ color: '#9494b8', lineHeight: 1.9, fontSize: isMobile ? '0.9rem' : '1rem', marginBottom: '1.2rem' }}>
              Hey! I'm <strong style={{ color: '#f0eeff' }}>Rajarshi</strong>, a passionate developer who loves crafting beautiful, functional web experiences. I believe great software is built at the intersection of clean code and thoughtful design.
            </p>
            <p style={{ color: '#6b6b8a', lineHeight: 1.9, fontSize: isMobile ? '0.84rem' : '0.92rem', marginBottom: '1.8rem' }}>
              When I'm not coding, you'll find me exploring new technologies, contributing to open source, or diving deep into system design. I'm always excited to collaborate on projects that make a real difference.
            </p>

            <div className="flex flex-col gap-3 mb-7">
              {[
                { label: 'GitHub', val: `@${profile?.login || 'rajarshi'}` },
                { label: 'Status', val: 'Available for opportunities' },
                { label: 'Focus', val: 'Full Stack Development' },
              ].map(({ label, val }) => (
                <div key={label} className="flex items-center gap-3">
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#7c3aed', width: 55, flexShrink: 0 }}>{label}</span>
                  <div className="flex-1 h-px" style={{ background: '#1c1c35' }} />
                  <span style={{ fontSize: '0.82rem', color: '#9494b8', textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>

            <motion.a
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              href={profile?.html_url || '#'} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl font-bold text-white"
              style={{
                padding: '0.75rem 1.8rem', fontSize: '0.85rem',
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                boxShadow: '0 6px 24px rgba(124,58,237,0.35)',
                textDecoration: 'none', transition: 'box-shadow 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 36px rgba(124,58,237,0.55)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 6px 24px rgba(124,58,237,0.35)'}
            >View GitHub Profile →</motion.a>
          </motion.div>
        </div>

        {/* Highlight cards */}
        <div className="grid gap-4" style={{ gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: isMobile ? '3.5rem' : '6rem' }}>
          {highlights.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.03, boxShadow: '0 20px 45px rgba(124,58,237,0.18)', transition: { duration: 0.25 } }}
              whileTap={{ scale: 0.97 }}
              className="glass rounded-2xl transition-all duration-300 cursor-pointer"
              style={{ padding: isMobile ? '1.2rem' : '1.6rem' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.15)';
              }}
            >
              <motion.div className="mb-2" style={{ color: '#7c3aed' }} whileHover={{ rotate: 15, scale: 1.2 }}>{icon}</motion.div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: isMobile ? '0.85rem' : '0.95rem', marginBottom: '0.4rem' }}>{title}</h3>
              <p style={{ color: '#6b6b8a', fontSize: isMobile ? '0.76rem' : '0.82rem', lineHeight: 1.6 }}>{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.3rem,4vw,1.6rem)', marginBottom: '2.5rem' }}
          >
            My <span className="grad-text">Journey</span>
          </motion.h3>

          {isMobile ? (
            <div className="flex flex-col gap-4" style={{ paddingLeft: '1.2rem', borderLeft: '2px solid rgba(124,58,237,0.3)' }}>
              {timeline.map(({ year, title, desc }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative" style={{ paddingLeft: '1.2rem' }}
                >
                  <div className="absolute" style={{ left: '-1.55rem', top: '0.4rem', width: 11, height: 11, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', boxShadow: '0 0 12px rgba(124,58,237,0.5)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#7c3aed', fontSize: '0.72rem', fontWeight: 700 }}>{year}</span>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.88rem', margin: '0.2rem 0 0.3rem', color: '#f0eeff' }}>{title}</h4>
                  <p style={{ color: '#6b6b8a', fontSize: '0.78rem', lineHeight: 1.6 }}>{desc}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="relative" style={{ maxWidth: 700, margin: '0 auto' }}>
              <div className="absolute" style={{ left: '50%', top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, #7c3aed, transparent)', transform: 'translateX(-50%)' }} />
              <div className="flex flex-col gap-10">
                {timeline.map(({ year, title, desc }, i) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="flex items-start gap-6"
                    style={{ flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }}
                  >
                    <div className="flex-1 glass rounded-xl transition-all duration-300"
                      style={{ padding: '1.2rem 1.4rem', textAlign: i % 2 === 0 ? 'right' : 'left' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(124,58,237,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.3rem' }}>{title}</h4>
                      <p style={{ color: '#6b6b8a', fontSize: '0.8rem', lineHeight: 1.6 }}>{desc}</p>
                    </div>
                    <div className="flex-shrink-0" style={{ paddingTop: '0.8rem' }}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', boxShadow: '0 0 14px rgba(124,58,237,0.5)' }} />
                    </div>
                    <div className="flex-1" style={{ paddingTop: '0.6rem', textAlign: i % 2 === 0 ? 'left' : 'right' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', color: '#7c3aed', fontSize: '0.85rem', fontWeight: 700 }}>{year}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
