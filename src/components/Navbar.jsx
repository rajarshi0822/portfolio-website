import { useState, useEffect } from 'react';
import { FiGithub, FiMenu, FiX, FiHome, FiUser, FiBarChart2, FiCode, FiLayers, FiMail } from 'react-icons/fi';

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME;

const links = [
  { label:'Home',    href:'#about',        icon:<FiHome size={14}/> },
  { label:'About',   href:'#about-detail', icon:<FiUser size={14}/> },
  { label:'Stats',   href:'#stats',        icon:<FiBarChart2 size={14}/> },
  { label:'Works',   href:'#projects',     icon:<FiCode size={14}/> },
  { label:'Skills',  href:'#skills',       icon:<FiLayers size={14}/> },
  { label:'Contact', href:'#contact',      icon:<FiMail size={14}/> },
];

export default function Navbar() {
  const [active,   setActive]   = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, []);

  const handleClick = (label) => { setActive(label); setMenuOpen(false); };

  return (
    <>
      <style>{`
        /* ── Liquid glass pill ── */
        .glass-nav {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 300;
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(10, 8, 22, 0.55);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            0 8px 32px rgba(0,0,0,0.4),
            0 1px 0 rgba(255,255,255,0.06) inset,
            0 -1px 0 rgba(0,0,0,0.3) inset;
          transition: all 0.4s ease;
        }
        .glass-nav.scrolled {
          background: rgba(6, 5, 18, 0.78);
          border-color: rgba(124,58,237,0.2);
          box-shadow:
            0 12px 40px rgba(0,0,0,0.5),
            0 0 0 1px rgba(124,58,237,0.1),
            0 1px 0 rgba(255,255,255,0.07) inset;
        }

        /* Logo */
        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          color: #f0eeff;
          padding: 6px 14px;
          letter-spacing: -0.02em;
          margin-right: 4px;
          flex-shrink: 0;
        }
        .nav-logo span { color: #7c3aed; }

        /* Separator */
        .nav-sep {
          width: 1px; height: 18px;
          background: rgba(255,255,255,0.1);
          margin: 0 4px; flex-shrink:0;
        }

        /* Nav links */
        .nav-link {
          display: flex; align-items: center; gap: 5px;
          padding: 8px 14px;
          border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          color: rgba(180,170,230,0.7);
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
          position: relative;
          border: 1px solid transparent;
        }
        .nav-link:hover {
          color: #f0eeff;
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.06);
        }
        .nav-link.active {
          color: #fff;
          background: linear-gradient(135deg, rgba(124,58,237,0.9), rgba(91,33,182,0.95));
          border-color: rgba(124,58,237,0.5);
          box-shadow: 0 2px 16px rgba(124,58,237,0.4), 0 0 0 1px rgba(255,255,255,0.08) inset;
        }

        /* GitHub button */
        .nav-gh {
          display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(200,190,240,0.8);
          text-decoration: none;
          transition: all 0.25s;
          flex-shrink: 0;
          margin-left: 4px;
        }
        .nav-gh:hover {
          background: rgba(124,58,237,0.25);
          border-color: rgba(124,58,237,0.5);
          color: #f0eeff;
          box-shadow: 0 0 16px rgba(124,58,237,0.35);
        }

        /* ── Mobile top bar ── */
        .mobile-bar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 300;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 1.2rem;
          height: 60px;
          background: rgba(6, 5, 18, 0.82);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border-bottom: 1px solid rgba(124,58,237,0.15);
          box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset;
        }
        .mobile-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 1.1rem; color: #f0eeff;
        }
        .mobile-logo span { color: #7c3aed; }
        .mobile-actions { display:flex; align-items:center; gap:0.7rem; }
        .mobile-ham {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #f0eeff;
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex; align-items:center; justify-content:center;
          font-size: 1.1rem;
          transition: all 0.2s;
        }
        .mobile-ham:hover { background: rgba(124,58,237,0.2); border-color: rgba(124,58,237,0.4); }

        /* ── Mobile drawer ── */
        .mobile-drawer {
          position: fixed; top: 60px; left: 0; right: 0; z-index: 299;
          background: rgba(6,5,18,0.97);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-bottom: 1px solid rgba(124,58,237,0.15);
          padding: 0.5rem 0 1rem;
          animation: slideDown 0.25s ease;
        }
        @keyframes slideDown {
          from { opacity:0; transform: translateY(-10px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .drawer-link {
          display: flex; align-items: center; gap: 12px;
          padding: 0.85rem 1.5rem;
          color: rgba(180,170,230,0.7);
          text-decoration: none;
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem; font-weight: 500;
          transition: all 0.2s;
          border-left: 2px solid transparent;
        }
        .drawer-link:hover, .drawer-link.active {
          color: #f0eeff;
          background: rgba(124,58,237,0.07);
          border-left-color: #7c3aed;
          padding-left: 1.8rem;
        }
      `}</style>

      {/* ── Desktop glass pill ── */}
      {!isMobile && (
        <nav className={`glass-nav${scrolled ? ' scrolled' : ''}`}>
          <span className="nav-logo">raj<span>.</span>dev</span>
          <div className="nav-sep" />
          {links.map(({ label, href, icon }) => (
            <a key={label} href={href} className={`nav-link${active===label?' active':''}`} onClick={() => handleClick(label)}>
              {icon} {label}
            </a>
          ))}
          <div className="nav-sep" />
          <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer" className="nav-gh">
            <FiGithub size={16} />
          </a>
        </nav>
      )}

      {/* ── Mobile bar ── */}
      {isMobile && (
        <>
          <div className="mobile-bar">
            <span className="mobile-logo">raj<span>.</span>dev</span>
            <div className="mobile-actions">
              <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer" style={{ color:'rgba(200,190,240,0.8)', fontSize:'1.1rem', display:'flex' }}>
                <FiGithub />
              </a>
              <button className="mobile-ham" onClick={() => setMenuOpen(p => !p)}>
                {menuOpen ? <FiX size={16}/> : <FiMenu size={16}/>}
              </button>
            </div>
          </div>
          {menuOpen && (
            <div className="mobile-drawer">
              {links.map(({ label, href, icon }) => (
                <a key={label} href={href} className={`drawer-link${active===label?' active':''}`} onClick={() => handleClick(label)}>
                  {icon} {label}
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
