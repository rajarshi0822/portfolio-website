import { useEffect, useRef, useState } from 'react';
import { useGitHub } from './hooks/useGitHub';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import GitHubStats from './components/GitHubStats';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

/* ── Custom Cursor ── */
function CustomCursor() {
  const dotRef  = useRef();
  const ringRef = useRef();
  const pos     = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const rafId   = useRef();

  useEffect(() => {
    if ('ontouchstart' in window) return;
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const onEnter = (e) => {
      if (!ringRef.current) return;
      if (e.target.closest('a, button')) {
        ringRef.current.style.width  = '56px';
        ringRef.current.style.height = '56px';
        ringRef.current.style.borderColor = 'rgba(124,58,237,0.9)';
        ringRef.current.style.background  = 'rgba(124,58,237,0.1)';
        if (dotRef.current) dotRef.current.style.transform = 'scale(0)';
      }
    };
    const onLeave = (e) => {
      if (!ringRef.current) return;
      if (e.target.closest('a, button')) {
        ringRef.current.style.width  = '36px';
        ringRef.current.style.height = '36px';
        ringRef.current.style.borderColor = 'rgba(124,58,237,0.6)';
        ringRef.current.style.background  = 'transparent';
        if (dotRef.current) dotRef.current.style.transform = 'scale(1)';
      }
    };
    const onClick = (e) => {
      const ripple = document.createElement('div');
      Object.assign(ripple.style, {
        position: 'fixed', left: `${e.clientX - 20}px`, top: `${e.clientY - 20}px`,
        width: '40px', height: '40px', borderRadius: '50%',
        border: '2px solid rgba(124,58,237,0.7)', pointerEvents: 'none', zIndex: '9997',
        animation: 'cursorRipple 0.5s ease forwards',
      });
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    };
    const animate = () => {
      const lerp = (a, b, t) => a + (b - a) * t;
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x - 5}px`;
        dotRef.current.style.top  = `${pos.current.y - 5}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x - 18}px`;
        ringRef.current.style.top  = `${ring.current.y - 18}px`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout',  onLeave);
    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout',  onLeave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{ position:'fixed', width:10, height:10, background:'#7c3aed', borderRadius:'50%', pointerEvents:'none', zIndex:9999, transition:'transform 0.2s ease', mixBlendMode:'difference', willChange:'left,top' }} />
      <div ref={ringRef} style={{ position:'fixed', width:36, height:36, border:'1.5px solid rgba(124,58,237,0.6)', borderRadius:'50%', pointerEvents:'none', zIndex:9998, transition:'width 0.3s,height 0.3s,border-color 0.3s,background 0.3s', willChange:'left,top' }} />
    </>
  );
}

/* ── Scroll Reveal ── */
function ScrollReveal({ children, delay = 0, direction = 'up' }) {
  const ref = useRef();
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const transforms = { up:'translateY(40px)', down:'translateY(-40px)', left:'translateX(-40px)', right:'translateX(40px)' };
  return (
    <div ref={ref} style={{ opacity: vis?1:0, transform: vis?'none':transforms[direction], transition:`opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`, willChange:'opacity,transform' }}>
      {children}
    </div>
  );
}

/* ── Scroll Progress Bar ── */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return <div style={{ position:'fixed', top:0, left:0, zIndex:200, height:3, width:`${pct}%`, background:'linear-gradient(to right, #7c3aed, #06b6d4, #f59e0b)', transition:'width 0.1s linear', pointerEvents:'none' }} />;
}

/* ── Back to Top ── */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} style={{ position:'fixed', bottom:'2rem', right:'2rem', zIndex:150, width:44, height:44, borderRadius:'50%', background:'linear-gradient(135deg,#7c3aed,#06b6d4)', border:'none', color:'#fff', fontSize:'1.1rem', cursor:'none', opacity:show?1:0, transform:show?'translateY(0) scale(1)':'translateY(12px) scale(0.8)', transition:'opacity 0.3s,transform 0.3s', pointerEvents:show?'auto':'none', boxShadow:'0 4px 20px rgba(124,58,237,0.4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      ↑
    </button>
  );
}

/* ── App ── */
export default function App() {
  const { profile, repos, topRepos, totalStars, totalForks, languageMap, loading, error } = useGitHub();

  // ── Loading spinner
  if (loading) return (
    <div style={{ height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'1.5rem', background:'#06060f' }}>
      <div style={{ position:'relative', width:56, height:56 }}>
        <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:'3px solid #1c1c35', borderTop:'3px solid #7c3aed', animation:'spin 0.8s linear infinite' }} />
        <div style={{ position:'absolute', inset:6, borderRadius:'50%', border:'2px solid #1c1c35', borderBottom:'2px solid #06b6d4', animation:'spin 1.2s linear infinite reverse' }} />
      </div>
      <p style={{ fontFamily:'Space Mono', color:'#7c3aed', fontSize:'0.85rem', letterSpacing:'0.12em' }}>Loading portfolio...</p>
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );

  // ── Error: show portfolio anyway with empty data (don't block the page)
  const safeProfile = profile || {
    login: 'rajarshi0822',
    name: 'Rajarshi Lakshman',
    bio: 'Developer · Builder · Open Source Enthusiast',
    avatar_url: `https://github.com/rajarshi0822.png`,
    html_url: 'https://github.com/rajarshi0822',
    public_repos: 0, followers: 0, following: 0,
  };
  const safeRepos = repos || [];
  const safeTopRepos = topRepos || [];

  return (
    <>
      <style>{`
        @keyframes spin         { to { transform:rotate(360deg); } }
        @keyframes borderSpin   { to { transform:rotate(360deg); } }
        @keyframes shimmer      { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes float        { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fadeIn       { from{opacity:0} to{opacity:1} }
        @keyframes fadeUp       { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cursorRipple { 0%{transform:scale(1);opacity:1} 100%{transform:scale(3);opacity:0} }
        * { cursor: none !important; }
        @media (hover: none) { * { cursor: auto !important; } }
      `}</style>

      <CustomCursor />
      <ScrollProgress />
      <BackToTop />
      <Navbar />

      <Hero profile={safeProfile} />

      <ScrollReveal direction="up">
        <About profile={safeProfile} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <GitHubStats profile={safeProfile} repos={safeRepos} totalStars={totalStars||0} totalForks={totalForks||0} languageMap={languageMap||{}} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <Projects topRepos={safeTopRepos} repos={safeRepos} />
      </ScrollReveal>

      <ScrollReveal direction="left">
        <Skills />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <Contact profile={safeProfile} />
      </ScrollReveal>
    </>
  );
}