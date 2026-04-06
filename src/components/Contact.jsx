import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi';
import { SectionDecorations } from './Interactive3D';

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME;

const socials = [
  { icon: <FiGithub size={18} />,   label: 'GitHub',   href: `https://github.com/${USERNAME}`,                              color: '#f0eeff' },
  { icon: <FiLinkedin size={18} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/rajarshi-lakshman-8b9b09353/',  color: '#0a66c2' },
  { icon: <FiTwitter size={18} />,  label: 'X',        href: 'https://x.com/LakshmanAayansh',                             color: '#f0eeff' },
  { icon: <FiMail size={18} />,     label: 'Email',    href: 'mailto:lakshman.rajarshi@gmail.com',                         color: '#7c3aed' },
];

export default function Contact({ profile }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return (
    <section id="contact" className="relative overflow-hidden" style={{ padding: isMobile ? '5rem 1.2rem' : '7rem 2rem' }}>
      {/* 3D Background */}
      <SectionDecorations variant="contact" />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(124,58,237,0.08) 0%, transparent 70%)' }} />

      <div className="relative z-10 text-center" style={{ maxWidth: 680, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{ color: '#7c3aed', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            ✦ get in touch ✦
          </p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: isMobile ? 'clamp(1.8rem,7vw,2.8rem)' : 'clamp(2rem,5vw,3.5rem)', marginBottom: '1rem', lineHeight: 1.15 }}>
            Let's Build Something{' '}
            <span className="grad-text">Together</span>
          </h2>
          <p style={{ color: '#6b6b8a', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
            I'm always open to new opportunities, collaborations, or just a chat about tech. Feel free to reach out!
          </p>
        </motion.div>

        {/* Social grid */}
        <div className="grid gap-3 mb-8" style={{ gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)' }}>
          {socials.map(({ icon, label, href, color }, i) => (
            <motion.a
              key={label}
              href={href} target="_blank" rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass flex items-center gap-2 rounded-xl transition-all duration-300"
              style={{
                padding: isMobile ? '0.75rem 0.5rem' : '0.85rem 1.2rem',
                justifyContent: isMobile ? 'center' : 'flex-start',
                color: '#9494b8', textDecoration: 'none',
                fontSize: isMobile ? '0.8rem' : '0.85rem', fontWeight: 500,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${color}60`;
                e.currentTarget.style.color = color;
                e.currentTarget.style.boxShadow = `0 12px 30px ${color}15, 0 0 20px ${color}08`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.15)';
                e.currentTarget.style.color = '#9494b8';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {icon} {label}
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px" style={{ background: '#1c1c35' }} />
          <span style={{ color: '#6b6b8a', fontSize: '0.72rem', letterSpacing: '0.1em' }}>OR</span>
          <div className="flex-1 h-px" style={{ background: '#1c1c35' }} />
        </div>

        {/* Email CTA */}
        <motion.a
          href="mailto:lakshman.rajarshi@gmail.com"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-white transition-all duration-300"
          style={{
            padding: isMobile ? '0.9rem 2rem' : '1rem 2.5rem',
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            fontSize: isMobile ? '0.88rem' : '0.95rem',
            boxShadow: '0 6px 28px rgba(124,58,237,0.4)',
            textDecoration: 'none',
            width: isMobile ? '100%' : 'auto',
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 14px 40px rgba(124,58,237,0.6)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = '0 6px 28px rgba(124,58,237,0.4)'}
        >
          <FiMail /> Send me an Email
        </motion.a>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ color: '#1c1c35', fontSize: '0.75rem', marginTop: '3.5rem', letterSpacing: '0.05em' }}
        >
          Built with React + Vite · Powered by GitHub API · © 2026 Rajarshi
        </motion.p>
      </div>
    </section>
  );
}
