import { useState, useEffect } from 'react';
import { FiCode, FiCoffee, FiHeart, FiZap } from 'react-icons/fi';

const highlights = [
  { icon: <FiCode size={18}/>,   title: 'Clean Code',     desc: 'Writing readable, maintainable code that teams love to work with.' },
  { icon: <FiZap size={18}/>,    title: 'Fast Learner',   desc: 'Quick to pick up new technologies and apply them effectively.' },
  { icon: <FiHeart size={18}/>,  title: 'Open Source',    desc: 'Passionate about giving back to the developer community.' },
  { icon: <FiCoffee size={18}/>, title: 'Problem Solver', desc: 'Turning complex challenges into elegant, simple solutions.' },
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
    <div style={{ position:'relative', display:'flex', justifyContent:'center', alignItems:'center', minHeight: isMobile ? 220 : 300 }}>
      {!isMobile && <>
        <div style={{ position:'absolute', width:300, height:300, borderRadius:'30% 70% 60% 40% / 40% 50% 50% 60%', border:'1px dashed rgba(124,58,237,0.2)', animation:'borderSpin 18s linear infinite' }} />
        <div style={{ position:'absolute', width:240, height:240, borderRadius:'60% 40% 30% 70% / 50% 60% 40% 50%', border:'1px dashed rgba(6,182,212,0.12)', animation:'borderSpin 12s linear infinite reverse' }} />
      </>}
      <div style={{ position:'relative', zIndex:2 }}>
        <div style={{ padding:3, borderRadius:'24px 8px 24px 8px', background:'linear-gradient(135deg,#7c3aed,#06b6d4,#f59e0b,#7c3aed)', backgroundSize:'300% 300%', animation:'shimmer 4s linear infinite', boxShadow:'0 0 30px rgba(124,58,237,0.3)' }}>
          {avatarUrl
            ? <img src={avatarUrl} alt="Rajarshi" style={{ width:imgW, height:imgH, objectFit:'cover', display:'block', borderRadius:'22px 6px 22px 6px', border:'3px solid #06060f' }} />
            : <div style={{ width:imgW, height:imgH, background:'linear-gradient(135deg,#0d0d1a,#1a0a2e)', borderRadius:'22px 6px 22px 6px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'3rem' }}>👨‍💻</div>
          }
        </div>
        {[{top:-6,left:-6},{top:-6,right:-6},{bottom:-6,left:-6},{bottom:-6,right:-6}].map((pos,i)=>(
          <div key={i} style={{ position:'absolute', width:11, height:11, borderRadius:'50%', background:'linear-gradient(135deg,#7c3aed,#06b6d4)', ...pos, boxShadow:'0 0 8px rgba(124,58,237,0.6)' }} />
        ))}
      </div>
      <div style={{ position:'absolute', bottom: isMobile?-14:10, right: isMobile?'auto':'5%', left: isMobile?'50%':'auto', transform: isMobile?'translateX(-50%)':'none', zIndex:3, background:'rgba(10,10,20,0.92)', border:'1px solid rgba(124,58,237,0.3)', borderRadius:10, padding:'0.45rem 0.85rem', display:'flex', alignItems:'center', gap:'0.45rem', boxShadow:'0 8px 30px rgba(0,0,0,0.5)', backdropFilter:'blur(8px)', whiteSpace:'nowrap' }}>
        <div style={{ width:7, height:7, borderRadius:'50%', background:'#10b981', boxShadow:'0 0 6px #10b981' }} />
        <span style={{ fontSize:'0.7rem', color:'#9494b8', fontFamily:'Space Mono' }}>Open to work</span>
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
    <section id="about-detail" style={{ padding: isMobile?'5rem 1.2rem':'8rem 2rem', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'50%', left:'-10%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(124,58,237,0.05) 0%,transparent 70%)', pointerEvents:'none' }} />

      <div style={{ maxWidth:1100, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom: isMobile?'3rem':'5rem' }}>
          <p style={{ color:'#7c3aed', fontFamily:'Space Mono', fontSize:'0.7rem', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'0.8rem' }}>— WHO AM I —</p>
          <h2 style={{ fontFamily:'Syne', fontWeight:800, fontSize:'clamp(2rem,6vw,3.5rem)', letterSpacing:'-0.02em', lineHeight:1.1 }}>
            About <span style={{ background:'linear-gradient(135deg,#7c3aed,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Rajarshi</span>
          </h2>
        </div>

        {/* Bio grid — stacks on mobile */}
        <div style={{ display:'grid', gridTemplateColumns: isMobile?'1fr':'repeat(auto-fit,minmax(280px,1fr))', gap: isMobile?'3.5rem':'4rem', marginBottom: isMobile?'3.5rem':'6rem', alignItems:'center' }}>
          <RectFrame avatarUrl={profile?.avatar_url} isMobile={isMobile} />

          <div style={{ marginTop: isMobile?'1.5rem':0 }}>
            <p style={{ color:'#9494b8', lineHeight:1.9, fontSize: isMobile?'0.9rem':'1rem', marginBottom:'1.2rem' }}>
              Hey! I'm <strong style={{ color:'#f0eeff' }}>Rajarshi</strong>, a passionate developer who loves crafting beautiful, functional web experiences. I believe great software is built at the intersection of clean code and thoughtful design.
            </p>
            <p style={{ color:'#6b6b8a', lineHeight:1.9, fontSize: isMobile?'0.84rem':'0.92rem', marginBottom:'1.8rem' }}>
              When I'm not coding, you'll find me exploring new technologies, contributing to open source, or diving deep into system design. I'm always excited to collaborate on projects that make a real difference.
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:'0.7rem', marginBottom:'1.8rem' }}>
              {[
                { label:'GitHub', val:`@${profile?.login || 'rajarshi'}` },
                { label:'Status', val:'Available for opportunities' },
                { label:'Focus',  val:'Full Stack Development' },
              ].map(({label,val}) => (
                <div key={label} style={{ display:'flex', gap:'0.75rem', alignItems:'center' }}>
                  <span style={{ fontFamily:'Space Mono', fontSize:'0.68rem', color:'#7c3aed', width:60, flexShrink:0 }}>{label}</span>
                  <div style={{ flex:1, height:1, background:'#1c1c35' }} />
                  <span style={{ fontSize:'0.82rem', color:'#9494b8', textAlign:'right' }}>{val}</span>
                </div>
              ))}
            </div>

            <a href={profile?.html_url || '#'} target="_blank" rel="noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', padding:'0.75rem 1.8rem', borderRadius:10, background:'linear-gradient(135deg,#7c3aed,#06b6d4)', color:'#fff', textDecoration:'none', fontWeight:700, fontSize:'0.85rem', boxShadow:'0 6px 24px rgba(124,58,237,0.3)', transition:'transform 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
              onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
            >View GitHub Profile →</a>
          </div>
        </div>

        {/* Highlight cards */}
        <div style={{ display:'grid', gridTemplateColumns: isMobile?'1fr 1fr':'repeat(auto-fit,minmax(220px,1fr))', gap:'1rem', marginBottom: isMobile?'3.5rem':'6rem' }}>
          {highlights.map(({icon,title,desc},i) => (
            <div key={title} style={{ background:'#0d0d1a', border:'1px solid #1c1c35', borderRadius:14, padding: isMobile?'1.2rem':'1.6rem', transition:'all 0.3s', animation:`fadeUp 0.6s ease ${i*0.1}s both` }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='#7c3aed';e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 12px 30px rgba(124,58,237,0.1)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='#1c1c35';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';}}
            >
              <div style={{ color:'#7c3aed', marginBottom:'0.6rem' }}>{icon}</div>
              <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize: isMobile?'0.85rem':'0.95rem', marginBottom:'0.4rem' }}>{title}</h3>
              <p style={{ color:'#6b6b8a', fontSize: isMobile?'0.76rem':'0.82rem', lineHeight:1.6 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Timeline — simplified on mobile */}
        <div>
          <h3 style={{ fontFamily:'Syne', fontWeight:800, fontSize:'clamp(1.3rem,4vw,1.6rem)', marginBottom:'2.5rem', textAlign:'center' }}>
            My <span style={{ background:'linear-gradient(135deg,#7c3aed,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Journey</span>
          </h3>

          {isMobile ? (
            /* Mobile: simple vertical list */
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem', paddingLeft:'1.2rem', borderLeft:'2px solid rgba(124,58,237,0.3)' }}>
              {timeline.map(({year,title,desc},i) => (
                <div key={year} style={{ position:'relative', paddingLeft:'1.2rem', animation:`fadeUp 0.5s ease ${i*0.1}s both` }}>
                  <div style={{ position:'absolute', left:'-1.55rem', top:'0.4rem', width:11, height:11, borderRadius:'50%', background:'linear-gradient(135deg,#7c3aed,#06b6d4)', boxShadow:'0 0 10px rgba(124,58,237,0.5)' }} />
                  <span style={{ fontFamily:'Space Mono', color:'#7c3aed', fontSize:'0.72rem', fontWeight:700 }}>{year}</span>
                  <h4 style={{ fontFamily:'Syne', fontWeight:700, fontSize:'0.88rem', margin:'0.2rem 0 0.3rem', color:'#f0eeff' }}>{title}</h4>
                  <p style={{ color:'#6b6b8a', fontSize:'0.78rem', lineHeight:1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          ) : (
            /* Desktop: alternating timeline */
            <div style={{ position:'relative', maxWidth:700, margin:'0 auto' }}>
              <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:1, background:'linear-gradient(to bottom,#7c3aed,transparent)', transform:'translateX(-50%)' }} />
              <div style={{ display:'flex', flexDirection:'column', gap:'2.5rem' }}>
                {timeline.map(({year,title,desc},i) => (
                  <div key={year} style={{ display:'flex', alignItems:'flex-start', gap:'1.5rem', flexDirection:i%2===0?'row':'row-reverse', animation:`fadeUp 0.5s ease ${i*0.12}s both` }}>
                    <div style={{ flex:1, background:'#0d0d1a', border:'1px solid #1c1c35', borderRadius:12, padding:'1.2rem 1.4rem', textAlign:i%2===0?'right':'left', transition:'border-color 0.3s' }}
                      onMouseEnter={e=>e.currentTarget.style.borderColor='#7c3aed'}
                      onMouseLeave={e=>e.currentTarget.style.borderColor='#1c1c35'}
                    >
                      <h4 style={{ fontFamily:'Syne', fontWeight:700, fontSize:'0.92rem', marginBottom:'0.3rem' }}>{title}</h4>
                      <p style={{ color:'#6b6b8a', fontSize:'0.8rem', lineHeight:1.6 }}>{desc}</p>
                    </div>
                    <div style={{ flexShrink:0, paddingTop:'0.8rem' }}>
                      <div style={{ width:14, height:14, borderRadius:'50%', background:'linear-gradient(135deg,#7c3aed,#06b6d4)', boxShadow:'0 0 12px rgba(124,58,237,0.5)' }} />
                    </div>
                    <div style={{ flex:1, paddingTop:'0.6rem', textAlign:i%2===0?'left':'right' }}>
                      <span style={{ fontFamily:'Space Mono', color:'#7c3aed', fontSize:'0.85rem', fontWeight:700 }}>{year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
