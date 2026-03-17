import { useEffect, useRef, useState } from 'react';

const ROLES = ['Full Stack Developer', 'Open Source Contributor', 'UI/UX Enthusiast', 'Problem Solver'];

/* Animated SVG avatar — no photo needed */
function AnimatedAvatar({ size = 130 }) {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* Spinning conic border */}
      <div style={{
        position: 'absolute', inset: -4, borderRadius: '38% 62% 55% 45% / 45% 45% 55% 55%',
        background: 'conic-gradient(from 0deg, #7c3aed, #06b6d4, #f59e0b, #10b981, #7c3aed)',
        animation: 'borderSpin 4s linear infinite',
      }} />
      {/* Inner bg */}
      <div style={{
        position: 'absolute', inset: 3, borderRadius: '35% 65% 52% 48% / 42% 48% 52% 58%',
        background: 'linear-gradient(135deg, #0d0d1a, #1a0a2e)',
        overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Glowing orb */}
        <div style={{ position: 'absolute', width: '70%', height: '70%', borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%, rgba(124,58,237,0.5), rgba(6,182,212,0.3), transparent 70%)', filter: 'blur(12px)' }} />
        {/* Code symbol */}
        <svg width={size * 0.45} height={size * 0.45} viewBox="0 0 80 80" fill="none" style={{ position: 'relative', zIndex: 1 }}>
          {/* Bracket left */}
          <path d="M28 20 L14 40 L28 60" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <animate attributeName="stroke-dashoffset" values="60;0;60" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
          </path>
          {/* Bracket right */}
          <path d="M52 20 L66 40 L52 60" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <animate attributeName="stroke-dashoffset" values="60;0;60" dur="3s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" begin="0.5s" repeatCount="indefinite" />
          </path>
          {/* Slash */}
          <line x1="46" y1="22" x2="34" y2="58" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </line>
          {/* Dots */}
          <circle cx="40" cy="40" r="2.5" fill="#10b981">
            <animate attributeName="r" values="2;4;2" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>
        {/* Floating particles inside */}
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 3 + (i % 3), height: 3 + (i % 3),
            borderRadius: '50%',
            background: ['#7c3aed','#06b6d4','#f59e0b','#10b981','#f0eeff'][i],
            top: `${20 + i * 12}%`, left: `${15 + i * 15}%`,
            animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
            opacity: 0.7,
          }} />
        ))}
      </div>
      {/* Online badge */}
      <div style={{ position: 'absolute', bottom: 8, right: 8, width: 14, height: 14, background: '#10b981', borderRadius: '50%', border: '2px solid #06060f', boxShadow: '0 0 8px rgba(16,185,129,0.8)', zIndex: 2 }} />
    </div>
  );
}

export default function Hero({ profile }) {
  const canvasRef = useRef();
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  useEffect(() => {
    const role = ROLES[roleIdx];
    let i = typing ? 0 : role.length;
    const t = setInterval(() => {
      if (typing) { setDisplayed(role.slice(0, i + 1)); i++; if (i > role.length) { clearInterval(t); setTimeout(() => setTyping(false), 1800); } }
      else { setDisplayed(role.slice(0, i - 1)); i--; if (i < 0) { clearInterval(t); setTyping(true); setRoleIdx(p => (p + 1) % ROLES.length); } }
    }, typing ? 65 : 35);
    return () => clearInterval(t);
  }, [roleIdx, typing]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);
    const count = window.innerWidth < 768 ? 40 : 90;
    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.3 + 0.3, dx: (Math.random() - 0.5) * 0.3, dy: (Math.random() - 0.5) * 0.3,
      hue: Math.random() > 0.6 ? 192 : 262,
    }));
    let id;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${d.hue},80%,65%,0.45)`; ctx.fill();
        d.x += d.dx; d.y += d.dy;
        if (d.x < 0 || d.x > canvas.width) d.dx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.dy *= -1;
      });
      if (window.innerWidth >= 768) {
        dots.forEach((a, i) => { for (let j = i+1; j<dots.length; j++) { const b = dots[j], dist = Math.hypot(a.x-b.x,a.y-b.y); if (dist<90) { ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.strokeStyle=`rgba(124,58,237,${0.1*(1-dist/90)})`; ctx.lineWidth=0.5; ctx.stroke(); } } });
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, []);

  const avatarSize = isMobile ? 95 : 130;

  return (
    <section id="about" style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'80px 0 2rem' }}>
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, opacity:0.4 }} />
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'10%', left:'5%', width: isMobile?250:520, height: isMobile?250:520, borderRadius:'50%', background:'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', filter:'blur(40px)' }} />
        <div style={{ position:'absolute', bottom:'5%', right:'5%', width: isMobile?180:360, height: isMobile?180:360, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', filter:'blur(40px)' }} />
      </div>

      <div style={{ position:'relative', zIndex:1, textAlign:'center', padding: isMobile?'0 1.2rem':'0 2rem', maxWidth:780, width:'100%' }}>

        {/* Animated avatar — no photo */}
        <div style={{ marginBottom:'1.8rem', display:'inline-block', animation:'float 5s ease-in-out infinite' }}>
          <AnimatedAvatar size={avatarSize} />
        </div>

        <p style={{ color:'#7c3aed', fontFamily:'Space Mono', fontSize: isMobile?'0.65rem':'0.78rem', letterSpacing:'0.18em', marginBottom:'0.9rem', opacity:0.85 }}>
          &lt; HELLO WORLD /&gt;
        </p>

        <h1 style={{ fontFamily:'Syne', fontWeight:800, fontSize: isMobile?'clamp(2.6rem,12vw,3.8rem)':'clamp(3rem,8vw,5.5rem)', lineHeight:1.05, marginBottom:'1rem', letterSpacing:'-0.03em' }}>
          I'm{' '}
          <span style={{ background:'linear-gradient(135deg,#7c3aed 0%,#06b6d4 60%,#f59e0b 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', backgroundSize:'200%', animation:'shimmer 4s linear infinite' }}>Rajarshi</span>
        </h1>

        <p style={{ fontFamily:'Space Mono', fontSize: isMobile?'0.72rem':'1rem', color:'#9494b8', marginBottom:'0.8rem', minHeight: isMobile?'1.5rem':'2rem' }}>
          {displayed}<span style={{ color:'#7c3aed' }}>|</span>
        </p>

        <p style={{ color:'#6b6b8a', fontSize: isMobile?'0.83rem':'0.95rem', lineHeight:1.75, maxWidth:480, margin:'0 auto 2rem' }}>
          {profile?.bio || 'Developer · Builder · Open Source Enthusiast'}
        </p>

        <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center', flexDirection: isMobile?'column':'row', alignItems:'center', marginBottom:'2rem', padding: isMobile?'0 0.5rem':'0' }}>
          <a href="#projects" style={{ padding: isMobile?'0.9rem 1.5rem':'0.85rem 2.2rem', width: isMobile?'100%':'auto', maxWidth: isMobile?340:'none', borderRadius:10, textDecoration:'none', background:'linear-gradient(135deg,#7c3aed,#06b6d4)', color:'#fff', fontWeight:700, fontSize:'0.88rem', textAlign:'center', boxShadow:'0 6px 24px rgba(124,58,237,0.35)', transition:'transform 0.2s', display:'block' }}
            onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
            onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
          >View My Work →</a>
          <a href="#about-detail" style={{ padding: isMobile?'0.9rem 1.5rem':'0.85rem 2.2rem', width: isMobile?'100%':'auto', maxWidth: isMobile?340:'none', borderRadius:10, textDecoration:'none', background:'transparent', color:'#9494b8', border:'1px solid #1c1c35', fontSize:'0.88rem', textAlign:'center', transition:'all 0.2s', display:'block' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='#7c3aed';e.currentTarget.style.color='#f0eeff';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='#1c1c35';e.currentTarget.style.color='#9494b8';}}
          >About Me</a>
        </div>

        {profile && (
          <div style={{ display:'flex', gap: isMobile?'1.2rem':'2.5rem', justifyContent:'center', flexWrap:'wrap', padding: isMobile?'1rem':'1.2rem 2rem', background:'rgba(13,13,26,0.7)', borderRadius:14, border:'1px solid #1c1c35', backdropFilter:'blur(10px)', maxWidth: isMobile?320:380, margin:'0 auto' }}>
            {[{val:profile.public_repos,label:'Repos'},{val:profile.followers,label:'Followers'},{val:profile.following,label:'Following'}].map(({val,label})=>(
              <div key={label} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:'Space Mono', fontSize: isMobile?'1.1rem':'1.4rem', fontWeight:700, color:'#7c3aed', lineHeight:1 }}>{val}</div>
                <div style={{ fontSize:'0.62rem', color:'#6b6b8a', letterSpacing:'0.08em', textTransform:'uppercase', marginTop:'0.25rem' }}>{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isMobile && (
        <div style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.3rem', animation:'float 2.5s ease-in-out infinite' }}>
          <span style={{ color:'#2a2a4a', fontSize:'0.6rem', letterSpacing:'0.12em', fontFamily:'Space Mono' }}>SCROLL</span>
          <div style={{ width:1, height:44, background:'linear-gradient(to bottom,#7c3aed,transparent)' }} />
        </div>
      )}
    </section>
  );
}
