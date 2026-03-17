import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiInstagram, FiFacebook } from 'react-icons/fi';

const socials = [
  {
    icon: <FiLinkedin size={20}/>,
    label: 'LinkedIn',
    href: 'http://www.linkedin.com/in/rajarshi-lakshman-8b9b09353',
    color: '#0a66c2',
    bg: 'rgba(10,102,194,0.08)',
    desc: 'Connect professionally',
  },
  {
    icon: <FiGithub size={20}/>,
    label: 'GitHub',
    href: 'https://github.com/rajarshi0822',
    color: '#f0eeff',
    bg: 'rgba(240,238,255,0.06)',
    desc: 'See my code',
  },
  {
    icon: <FiTwitter size={20}/>,
    label: 'X (Twitter)',
    href: 'https://x.com/LakshmanAayansh',
    color: '#e7e7e7',
    bg: 'rgba(231,231,231,0.06)',
    desc: 'Follow my thoughts',
  },
  {
    icon: <FiMail size={20}/>,
    label: 'Email',
    href: 'mailto:lakshman.rajarshi@gmail.com',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.08)',
    desc: 'lakshman.rajarshi@gmail.com',
  },
  {
    icon: <FiFacebook size={20}/>,
    label: 'Facebook',
    href: 'https://www.facebook.com/raajarshi.laxman/',
    color: '#1877f2',
    bg: 'rgba(24,119,242,0.08)',
    desc: 'Find me on Facebook',
  },
  {
    icon: <FiInstagram size={20}/>,
    label: 'Instagram',
    href: 'https://www.instagram.com/nrz_ascii__008/?hl=en',
    color: '#e1306c',
    bg: 'rgba(225,48,108,0.08)',
    desc: '@nrz_ascii__008',
  },
];

export default function Contact({ profile }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return (
    <section id="contact" style={{
      padding: isMobile ? '5rem 1.2rem' : '7rem 2rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(124,58,237,0.07) 0%, transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:'20%', left:'5%', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(124,58,237,0.05) 0%,transparent 70%)', filter:'blur(40px)', pointerEvents:'none' }} />

      <div style={{ maxWidth: 740, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Section label */}
        <p style={{ color:'#7c3aed', fontFamily:'Space Mono', fontSize:'0.7rem', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'0.75rem' }}>
          ✦ get in touch ✦
        </p>

        <h2 style={{ fontFamily:'Syne', fontWeight:800, fontSize: isMobile?'clamp(1.8rem,7vw,2.8rem)':'clamp(2rem,5vw,3.5rem)', marginBottom:'1rem', lineHeight:1.15 }}>
          Let's Build Something{' '}
          <span style={{ background:'linear-gradient(135deg,#7c3aed,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Together</span>
        </h2>

        <p style={{ color:'#6b6b8a', lineHeight:1.8, marginBottom:'3rem', fontSize: isMobile?'0.85rem':'0.95rem', maxWidth:500, margin:'0 auto 3rem' }}>
          I'm always open to new opportunities, collaborations, or just a friendly chat about tech. Pick your platform and let's connect!
        </p>

        {/* Social cards grid — 3 cols on desktop, 2 on mobile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: isMobile ? '0.75rem' : '1rem',
          marginBottom: '2.5rem',
        }}>
          {socials.map(({ icon, label, href, color, bg, desc }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setHovered(label)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.6rem',
                padding: isMobile ? '1rem' : '1.2rem 1.4rem',
                background: hovered === label ? bg : '#0d0d1a',
                border: `1px solid ${hovered === label ? color : '#1c1c35'}`,
                borderRadius: 14,
                color: hovered === label ? color : '#9494b8',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                transform: hovered === label ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hovered === label ? `0 12px 30px ${color}22` : 'none',
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: hovered === label ? color : 'transparent',
                borderRadius: '14px 14px 0 0',
                transition: 'background 0.3s',
              }} />

              {/* Icon circle */}
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: hovered === label ? `${color}22` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${hovered === label ? color : 'rgba(255,255,255,0.08)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: hovered === label ? color : '#9494b8',
                transition: 'all 0.3s',
                flexShrink: 0,
              }}>
                {icon}
              </div>

              {/* Label & desc */}
              <div>
                <div style={{ fontFamily:'Syne', fontWeight:700, fontSize: isMobile?'0.82rem':'0.9rem', color: hovered === label ? color : '#f0eeff', transition:'color 0.3s', lineHeight:1.2 }}>
                  {label}
                </div>
                {!isMobile && (
                  <div style={{ fontSize:'0.72rem', color: hovered === label ? `${color}bb` : '#6b6b8a', marginTop:'0.2rem', transition:'color 0.3s', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:160 }}>
                    {desc}
                  </div>
                )}
              </div>

              {/* Arrow */}
              <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                fontSize: '0.8rem', color: hovered === label ? color : '#2a2a4a',
                transition: 'all 0.3s',
                transform: hovered === label ? 'translate(2px,-2px)' : 'translate(0,0)',
              }}>↗</div>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'2rem' }}>
          <div style={{ flex:1, height:1, background:'linear-gradient(to right, transparent, #1c1c35)' }} />
          <span style={{ color:'#6b6b8a', fontSize:'0.72rem', letterSpacing:'0.1em', fontFamily:'Space Mono' }}>OR JUST EMAIL ME DIRECTLY</span>
          <div style={{ flex:1, height:1, background:'linear-gradient(to left, transparent, #1c1c35)' }} />
        </div>

        {/* Email CTA button */}
        <a
          href="mailto:lakshman.rajarshi@gmail.com"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: isMobile ? '0.9rem 1.5rem' : '1rem 2.5rem',
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            color: '#fff', borderRadius: 12, textDecoration: 'none',
            fontWeight: 700, fontSize: isMobile ? '0.88rem' : '0.95rem',
            boxShadow: '0 6px 24px rgba(124,58,237,0.4)',
            transition: 'all 0.3s',
            width: isMobile ? '100%' : 'auto',
            justifyContent: 'center',
            maxWidth: isMobile ? 360 : 'none',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(124,58,237,0.55)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 6px 24px rgba(124,58,237,0.4)'; }}
        >
          <FiMail size={18}/> lakshman.rajarshi@gmail.com
        </a>

        {/* Footer */}
        <p style={{ color:'#2a2a4a', fontSize:'0.72rem', marginTop:'4rem', letterSpacing:'0.05em', fontFamily:'Space Mono' }}>
          Built with React + Vite · Powered by GitHub API · © 2026 Rajarshi Lakshman
        </p>
      </div>
    </section>
  );
}
