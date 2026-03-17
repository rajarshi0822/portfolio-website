import { useState, useEffect } from 'react';
import { FiGithub, FiMenu, FiX, FiHome, FiUser, FiCode, FiLayers, FiMail, FiBarChart2 } from 'react-icons/fi';

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME;

const links = [
  { label: 'Home',     href: '#about',       icon: <FiHome size={13}/> },
  { label: 'About',    href: '#about-detail', icon: <FiUser size={13}/> },
  { label: 'Stats',    href: '#stats',        icon: <FiBarChart2 size={13}/> },
  { label: 'Works',    href: '#projects',     icon: <FiCode size={13}/> },
  { label: 'Skills',   href: '#skills',       icon: <FiLayers size={13}/> },
  { label: 'Contact',  href: '#contact',      icon: <FiMail size={13}/> },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState('Home');
  const [isMobile,  setIsMobile]  = useState(window.innerWidth < 900);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const handleClick = (label) => { setActive(label); setMenuOpen(false); };

  return (
    <>
      <style>{`
        .nav-pill {
          position: fixed;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 200;
          display: flex;
          align-items: center;
          gap: 2px;
          background: rgba(10, 10, 20, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(124,58,237,0.18);
          border-radius: 999px;
          padding: 5px 8px;
          box-shadow: 0 4px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04) inset;
          transition: all 0.3s ease;
        }
        .nav-pill:hover {
          border-color: rgba(124,58,237,0.35);
          box-shadow: 0 8px 40px rgba(124,58,237,0.15), 0 0 0 1px rgba(255,255,255,0.06) inset;
        }
        .nav-link {
          display: flex; align-items: center; gap: 5px;
          padding: 6px 13px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 0.76rem;
          font-family: 'Syne', sans-serif;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: #6b6b8a;
          transition: all 0.25s ease;
          white-space: nowrap;
          border: 1px solid transparent;
        }
        .nav-link:hover {
          color: #f0eeff;
          background: rgba(124,58,237,0.1);
        }
        .nav-link.active {
          color: #f0eeff;
          background: linear-gradient(135deg, #7c3aed, #5b21b6);
          border-color: rgba(124,58,237,0.4);
          box-shadow: 0 2px 12px rgba(124,58,237,0.35);
        }
        .nav-divider {
          width: 1px; height: 16px;
          background: rgba(255,255,255,0.08);
          margin: 0 2px;
          flex-shrink: 0;
        }
        .nav-gh {
          display: flex; align-items: center; justify-content: center;
          width: 30px; height: 30px; border-radius: 50%;
          background: rgba(124,58,237,0.12);
          border: 1px solid rgba(124,58,237,0.25);
          color: #9494b8;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.25s ease;
          flex-shrink: 0;
          margin-left: 4px;
        }
        .nav-gh:hover {
          background: rgba(124,58,237,0.25);
          border-color: rgba(124,58,237,0.6);
          color: #f0eeff;
        }
        /* Mobile top bar */
        .nav-mobile-bar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.9rem 1.2rem;
          background: rgba(6,6,15,0.95);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(124,58,237,0.12);
        }
        .nav-hamburger {
          background: none; border: none; color: #f0eeff;
          font-size: 1.3rem; display: flex; padding: 2px;
        }
        .nav-drawer {
          position: fixed; top: 54px; left: 0; right: 0; z-index: 199;
          background: rgba(6,6,15,0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(124,58,237,0.15);
          animation: fadeIn 0.2s ease;
        }
        .nav-drawer-link {
          display: flex; align-items: center; gap: 10px;
          padding: 0.95rem 1.6rem;
          color: #9494b8; text-decoration: none;
          font-size: 0.85rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: all 0.2s;
        }
        .nav-drawer-link:hover, .nav-drawer-link.active {
          color: #7c3aed;
          background: rgba(124,58,237,0.06);
          padding-left: 2rem;
        }
      `}</style>

      {/* ── Desktop pill navbar ── */}
      {!isMobile && (
        <nav className="nav-pill">
          {links.map(({ label, href, icon }, i) => (
            <a key={label} href={href}
              className={`nav-link${active === label ? ' active' : ''}`}
              onClick={() => handleClick(label)}
            >
              {icon} {label}
            </a>
          ))}
          <div className="nav-divider" />
          <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer" className="nav-gh">
            <FiGithub />
          </a>
        </nav>
      )}

      {/* ── Mobile top bar ── */}
      {isMobile && (
        <div className="nav-mobile-bar">
          <span style={{ fontFamily:'Syne', fontWeight:800, fontSize:'1.1rem', color:'#f0eeff' }}>
            raj<span style={{ color:'#7c3aed' }}>.</span>dev
          </span>
          <div style={{ display:'flex', gap:'0.7rem', alignItems:'center' }}>
            <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer"
              style={{ color:'#9494b8', fontSize:'1.15rem', display:'flex' }}>
              <FiGithub />
            </a>
            <button className="nav-hamburger" onClick={() => setMenuOpen(p => !p)}>
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      )}

      {/* ── Mobile drawer ── */}
      {isMobile && menuOpen && (
        <div className="nav-drawer">
          {links.map(({ label, href, icon }) => (
            <a key={label} href={href}
              className={`nav-drawer-link${active === label ? ' active' : ''}`}
              onClick={() => handleClick(label)}
            >
              {icon} {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
