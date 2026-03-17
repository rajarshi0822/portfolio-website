import { useEffect, useRef, useState } from 'react';

const ROLES = ['Full Stack Developer', 'Open Source Contributor', 'UI/UX Enthusiast', 'Problem Solver'];

/* ══════════════════════════════════════════
   GENERATIVE AVATAR — Morphing DNA Helix
   + floating code fragments + pulse rings
══════════════════════════════════════════ */
function GenerativeAvatar({ isMobile }) {
  const canvasRef = useRef();
  const size = isMobile ? 240 : 300;

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = size; canvas.height = size;
    const cx = size / 2, cy = size / 2;
    let t = 0, raf;

    const codeSnippets = ['</>','{}','()=>','#!','&&','||','::','**','??','fn('];
    const floaters = Array.from({ length: 10 }, (_, i) => ({
      text: codeSnippets[i % codeSnippets.length],
      angle: (i / 10) * Math.PI * 2,
      r: size * (0.35 + Math.random() * 0.1),
      speed: 0.003 + Math.random() * 0.004,
      opacity: 0.3 + Math.random() * 0.4,
      fontSize: 9 + Math.floor(Math.random() * 5),
      dir: i % 2 === 0 ? 1 : -1,
    }));

    const hexRing = Array.from({ length: 18 }, (_, i) => ({
      angle: (i / 18) * Math.PI * 2,
      r: size * 0.40,
      size: 6 + (i % 3) * 2,
      pulse: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.02,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      t += 0.012;

      // ── Outer glow ring
      const grad1 = ctx.createRadialGradient(cx, cy, size*0.28, cx, cy, size*0.48);
      grad1.addColorStop(0, 'rgba(124,58,237,0.0)');
      grad1.addColorStop(0.6, 'rgba(124,58,237,0.08)');
      grad1.addColorStop(1, 'rgba(6,182,212,0.04)');
      ctx.beginPath(); ctx.arc(cx, cy, size*0.47, 0, Math.PI*2);
      ctx.fillStyle = grad1; ctx.fill();

      // ── Dashed orbit circle
      ctx.save();
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = 'rgba(124,58,237,0.18)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, size*0.40, 0, Math.PI*2);
      ctx.stroke(); ctx.restore();

      // ── Hex/diamond nodes on orbit ring
      hexRing.forEach((h, i) => {
        const a = h.angle + t * (i % 2 === 0 ? 0.15 : -0.10);
        const x = cx + h.r * Math.cos(a);
        const y = cy + h.r * Math.sin(a);
        const pulse = Math.sin(t * h.speed * 80 + h.pulse);
        const alpha = 0.25 + pulse * 0.2;
        const s = h.size * (0.9 + pulse * 0.12);
        ctx.save();
        ctx.translate(x, y); ctx.rotate(a + Math.PI/4);
        ctx.strokeStyle = `rgba(124,58,237,${alpha})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(-s/2, -s/2, s, s);
        ctx.restore();
      });

      // ── DNA double helix strands
      const strandH = size * 0.52;
      const strandW = size * 0.10;
      const steps = 30;
      for (let i = 0; i <= steps; i++) {
        const p = i / steps;
        const y = cy - strandH/2 + strandH * p;
        const wave = Math.sin(p * Math.PI * 3 + t * 1.8);
        const x1 = cx - strandW * wave;
        const x2 = cx + strandW * wave;
        const alpha = 0.5 + 0.4 * Math.abs(wave);

        // rung connecting strands
        if (i % 3 === 0) {
          ctx.strokeStyle = `rgba(6,182,212,${alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();
        }
        // strand 1 dots
        const r1 = 1.5 + alpha;
        ctx.beginPath(); ctx.arc(x1, y, r1, 0, Math.PI*2);
        ctx.fillStyle = `rgba(124,58,237,${alpha})`;
        ctx.fill();
        // strand 2 dots
        ctx.beginPath(); ctx.arc(x2, y, r1, 0, Math.PI*2);
        ctx.fillStyle = `rgba(6,182,212,${alpha})`;
        ctx.fill();
      }

      // ── Central glowing core
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size*0.17);
      coreGrad.addColorStop(0, 'rgba(180,140,255,0.95)');
      coreGrad.addColorStop(0.4, 'rgba(124,58,237,0.85)');
      coreGrad.addColorStop(0.8, 'rgba(76,29,149,0.7)');
      coreGrad.addColorStop(1, 'rgba(30,10,60,0)');
      ctx.beginPath(); ctx.arc(cx, cy, size*0.17, 0, Math.PI*2);
      ctx.fillStyle = coreGrad; ctx.fill();

      // shine spot
      ctx.beginPath(); ctx.arc(cx - size*0.05, cy - size*0.05, size*0.06, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fill();

      // Initials text in core
      ctx.font = `700 ${Math.round(size*0.095)}px "Syne", sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('RAJ', cx, cy);

      // ── Floating code fragments
      floaters.forEach(f => {
        f.angle += f.speed * f.dir;
        const x = cx + f.r * Math.cos(f.angle);
        const y = cy + f.r * Math.sin(f.angle);
        const pulse = 0.5 + 0.4 * Math.sin(t * 1.5 + f.angle);
        ctx.font = `${f.fontSize}px "Space Mono", monospace`;
        ctx.fillStyle = `rgba(124,58,237,${f.opacity * pulse})`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(f.text, x, y);
      });

      // ── Pulse rings (expanding)
      for (let r = 0; r < 3; r++) {
        const phase = ((t * 0.4 + r * 0.33) % 1);
        const radius = size * 0.18 + phase * size * 0.30;
        const alpha = (1 - phase) * 0.25;
        ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(124,58,237,${alpha})`;
        ctx.lineWidth = 1.5; ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [size]);

  return (
    <div style={{ position:'relative', flexShrink:0 }}>
      {/* Outer glow */}
      <div style={{ position:'absolute', inset: -20, borderRadius:'50%', background:'radial-gradient(circle,rgba(124,58,237,0.15) 0%,transparent 70%)', filter:'blur(20px)', pointerEvents:'none' }} />
      <canvas ref={canvasRef} width={size} height={size} style={{ display:'block', borderRadius:'50%', position:'relative', zIndex:1 }} />
    </div>
  );
}

/* ══════════════════════════════════════════
   LIQUID GLASS NAVBAR  (exported separately
   but kept here for single-file simplicity)
══════════════════════════════════════════ */
export default function Hero({ profile }) {
  const canvasRef = useRef();
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  // Typewriter
  useEffect(() => {
    const role = ROLES[roleIdx];
    let i = typing ? 0 : role.length;
    const interval = setInterval(() => {
      if (typing) {
        setDisplayed(role.slice(0, i+1)); i++;
        if (i > role.length) { clearInterval(interval); setTimeout(() => setTyping(false), 2000); }
      } else {
        setDisplayed(role.slice(0, i-1)); i--;
        if (i < 0) { clearInterval(interval); setTyping(true); setRoleIdx(p => (p+1) % ROLES.length); }
      }
    }, typing ? 65 : 35);
    return () => clearInterval(interval);
  }, [roleIdx, typing]);

  // bg particles
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);
    const count = window.innerWidth < 768 ? 30 : 70;
    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random()*1.2+0.2, dx: (Math.random()-0.5)*0.2, dy: (Math.random()-0.5)*0.2,
      hue: Math.random()>0.6 ? 192 : 262,
    }));
    let id;
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      dots.forEach(d => {
        ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
        ctx.fillStyle=`hsla(${d.hue},80%,65%,0.35)`; ctx.fill();
        d.x+=d.dx; d.y+=d.dy;
        if(d.x<0||d.x>canvas.width) d.dx*=-1;
        if(d.y<0||d.y>canvas.height) d.dy*=-1;
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize',resize); };
  }, []);

  return (
    <section id="about" style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding: isMobile ? '90px 1.2rem 3rem' : '100px 2rem 2rem' }}>
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, opacity:0.4 }} />

      {/* Ambient glows */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'5%', left:'-5%', width: isMobile?220:480, height: isMobile?220:480, borderRadius:'50%', background:'radial-gradient(circle,rgba(124,58,237,0.13) 0%,transparent 70%)', filter:'blur(50px)' }} />
        <div style={{ position:'absolute', bottom:'10%', right:'-5%', width: isMobile?160:340, height: isMobile?160:340, borderRadius:'50%', background:'radial-gradient(circle,rgba(6,182,212,0.09) 0%,transparent 70%)', filter:'blur(40px)' }} />
      </div>

      {/* Layout: text LEFT, avatar RIGHT on desktop; stacked on mobile */}
      <div style={{
        position:'relative', zIndex:1,
        display:'flex', flexDirection: isMobile ? 'column' : 'row',
        alignItems:'center', justifyContent:'center',
        gap: isMobile ? '2.5rem' : '6rem',
        maxWidth:1100, width:'100%',
      }}>

        {/* ── Text block ── */}
        <div style={{ flex:1, textAlign: isMobile?'center':'left', maxWidth: isMobile?'100%':500 }}>
          {/* Status chip */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 12px', borderRadius:999, background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.25)', marginBottom:'1.2rem' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#10b981', boxShadow:'0 0 6px #10b981', display:'inline-block' }} />
            <span style={{ fontFamily:'Space Mono', fontSize:'0.6rem', color:'#10b981', letterSpacing:'0.12em' }}>AVAILABLE FOR WORK</span>
          </div>

          <p style={{ color:'#7c3aed', fontFamily:'Space Mono', fontSize: isMobile?'0.62rem':'0.75rem', letterSpacing:'0.2em', marginBottom:'0.8rem', opacity:0.8 }}>
            &lt; HELLO WORLD /&gt;
          </p>

          <h1 style={{ fontFamily:'Syne', fontWeight:800, fontSize: isMobile?'clamp(2.4rem,10vw,3.4rem)':'clamp(3rem,5vw,4.6rem)', lineHeight:1.05, marginBottom:'0.9rem', letterSpacing:'-0.03em' }}>
            I'm{' '}
            <span style={{ background:'linear-gradient(135deg,#7c3aed 0%,#06b6d4 55%,#f59e0b 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', backgroundSize:'200%', animation:'shimmer 4s linear infinite' }}>Rajarshi</span>
          </h1>

          <p style={{ fontFamily:'Space Mono', fontSize: isMobile?'0.68rem':'0.88rem', color:'#9494b8', marginBottom:'1rem', minHeight:'1.5rem' }}>
            {displayed}<span style={{ color:'#7c3aed' }}>|</span>
          </p>

          <p style={{ color:'#6b6b8a', fontSize: isMobile?'0.84rem':'0.93rem', lineHeight:1.8, marginBottom:'2rem', maxWidth: isMobile?'100%':420 }}>
            {profile?.bio || 'Developer · Builder · Open Source Enthusiast'}
          </p>

          {/* Buttons */}
          <div style={{ display:'flex', gap:'0.75rem', justifyContent: isMobile?'center':'flex-start', flexDirection: isMobile?'column':'row', alignItems:'center' }}>
            <a href="#projects" style={{ padding:'0.9rem 2.2rem', borderRadius:12, textDecoration:'none', background:'linear-gradient(135deg,#7c3aed,#06b6d4)', color:'#fff', fontWeight:700, fontSize:'0.9rem', textAlign:'center', boxShadow:'0 6px 24px rgba(124,58,237,0.4)', transition:'all 0.25s', display:'block', width: isMobile?'100%':'auto', maxWidth: isMobile?360:'none', letterSpacing:'0.02em' }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 12px 32px rgba(124,58,237,0.55)';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 6px 24px rgba(124,58,237,0.4)';}}
            >View My Work →</a>
            <a href="#about-detail" style={{ padding:'0.9rem 2.2rem', borderRadius:12, textDecoration:'none', background:'rgba(255,255,255,0.04)', color:'#9494b8', border:'1px solid rgba(255,255,255,0.1)', fontSize:'0.9rem', textAlign:'center', transition:'all 0.25s', display:'block', width: isMobile?'100%':'auto', maxWidth: isMobile?360:'none', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(124,58,237,0.5)';e.currentTarget.style.color='#f0eeff';e.currentTarget.style.background='rgba(124,58,237,0.08)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';e.currentTarget.style.color='#9494b8';e.currentTarget.style.background='rgba(255,255,255,0.04)';}}
            >About Me</a>
          </div>

          {/* Stats strip */}
          {profile && (
            <div style={{ display:'flex', gap: isMobile?'1.5rem':'2.5rem', justifyContent: isMobile?'center':'flex-start', marginTop:'2.5rem', flexWrap:'wrap' }}>
              {[{val:profile.public_repos,label:'Repos'},{val:profile.followers,label:'Followers'},{val:profile.following,label:'Following'}].map(({val,label}) => (
                <div key={label}>
                  <div style={{ fontFamily:'Space Mono', fontSize: isMobile?'1.1rem':'1.3rem', fontWeight:700, color:'#7c3aed', lineHeight:1 }}>{val}</div>
                  <div style={{ fontSize:'0.62rem', color:'#6b6b8a', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:3 }}>{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Generative avatar ── */}
        <div style={{ flexShrink:0, display:'flex', justifyContent:'center' }}>
          <GenerativeAvatar isMobile={isMobile} />
        </div>

      </div>

      {/* Scroll indicator */}
      {!isMobile && (
        <div style={{ position:'absolute', bottom:'1.8rem', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.3rem', animation:'float 2.5s ease-in-out infinite' }}>
          <span style={{ color:'#2a2a4a', fontSize:'0.58rem', letterSpacing:'0.12em', fontFamily:'Space Mono' }}>SCROLL</span>
          <div style={{ width:1, height:40, background:'linear-gradient(to bottom,#7c3aed,transparent)' }} />
        </div>
      )}
    </section>
  );
}
