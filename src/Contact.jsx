import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi';

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME;

const socials = [
  { icon: <FiGithub size={18}/>,   label:'GitHub',   href:`https://github.com/${USERNAME}`,           color:'#f0eeff' },
  { icon: <FiLinkedin size={18}/>, label:'LinkedIn',  href:'https://linkedin.com/in/yourhandle',       color:'#0a66c2' },
  { icon: <FiTwitter size={18}/>,  label:'Twitter',   href:'https://twitter.com/yourhandle',           color:'#1da1f2' },
  { icon: <FiMail size={18}/>,     label:'Email',     href:'mailto:your@email.com',                    color:'#7c3aed' },
];

export default function Contact({ profile }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return (
    <section id="contact" style={{ padding: isMobile?'5rem 1.2rem':'7rem 2rem', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 50% 60% at 50% 100%,rgba(124,58,237,0.06) 0%,transparent 70%)', pointerEvents:'none' }} />

      <div style={{ maxWidth:680, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
        <p style={{ color:'#7c3aed', fontFamily:'Space Mono', fontSize:'0.7rem', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'0.75rem' }}>
          ✦ get in touch ✦
        </p>
        <h2 style={{ fontFamily:'Syne', fontWeight:800, fontSize: isMobile?'clamp(1.8rem,7vw,2.8rem)':'clamp(2rem,5vw,3.5rem)', marginBottom:'1rem', lineHeight:1.15 }}>
          Let's Build Something{' '}
          <span style={{ background:'linear-gradient(135deg,#7c3aed,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Together</span>
        </h2>
        <p style={{ color:'#6b6b8a', lineHeight:1.8, marginBottom:'2.5rem', fontSize: isMobile?'0.85rem':'0.95rem' }}>
          I'm always open to new opportunities, collaborations, or just a chat about tech. Feel free to reach out!
        </p>

        {/* Social grid — 2x2 on mobile, row on desktop */}
        <div style={{ display:'grid', gridTemplateColumns: isMobile?'1fr 1fr':'repeat(4,1fr)', gap:'0.75rem', marginBottom:'2.5rem' }}>
          {socials.map(({icon,label,href,color}) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display:'flex', alignItems:'center', justifyContent: isMobile?'center':'flex-start', gap:'0.5rem', padding: isMobile?'0.75rem 0.5rem':'0.8rem 1.2rem', background:'#0d0d1a', border:'1px solid #1c1c35', borderRadius:10, color:'#9494b8', textDecoration:'none', fontSize: isMobile?'0.8rem':'0.85rem', fontWeight:500, transition:'all 0.3s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=color;e.currentTarget.style.color=color;e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow=`0 10px 25px ${color}18`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='#1c1c35';e.currentTarget.style.color='#9494b8';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';}}
            >
              {icon} {label}
            </a>
          ))}
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'2rem' }}>
          <div style={{ flex:1, height:1, background:'#1c1c35' }} />
          <span style={{ color:'#6b6b8a', fontSize:'0.72rem', letterSpacing:'0.1em' }}>OR</span>
          <div style={{ flex:1, height:1, background:'#1c1c35' }} />
        </div>

        <a href="mailto:your@email.com" style={{ display:'inline-flex', alignItems:'center', gap:'0.6rem', padding: isMobile?'0.9rem 2rem':'1rem 2.5rem', background:'linear-gradient(135deg,#7c3aed,#06b6d4)', color:'#fff', borderRadius:10, textDecoration:'none', fontWeight:700, fontSize: isMobile?'0.88rem':'0.95rem', border:'none', transition:'all 0.3s', boxShadow:'0 6px 24px rgba(124,58,237,0.35)', width: isMobile?'100%':'auto', justifyContent:'center' }}
          onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
          onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
        >
          <FiMail /> Send me an Email
        </a>

        <p style={{ color:'#1c1c35', fontSize:'0.75rem', marginTop:'3.5rem', letterSpacing:'0.05em' }}>
          Built with React + Vite · Powered by GitHub API · © 2026 Rajarshi
        </p>
      </div>
    </section>
  );
}
