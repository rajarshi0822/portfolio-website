import { useState, useEffect } from 'react';

const skillGroups = [
  { cat:'Frontend',     icon:'🎨', color:'#f59e0b', items:['React','Next.js','TypeScript','TailwindCSS','HTML5','CSS3'] },
  { cat:'Backend',      icon:'⚙️', color:'#06b6d4', items:['Node.js','Express','Python','FastAPI','REST APIs','GraphQL'] },
  { cat:'Database',     icon:'🗄️', color:'#8b5cf6', items:['PostgreSQL','MongoDB','MySQL','Redis','Prisma'] },
  { cat:'DevOps & Tools',icon:'🛠️',color:'#10b981', items:['Git','GitHub','Docker','AWS','Linux','VS Code'] },
];

export default function Skills() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return (
    <section id="skills" style={{ padding: isMobile?'5rem 1.2rem':'7rem 2rem', background:'#06060f' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom: isMobile?'2.5rem':'4rem' }}>
          <p style={{ color:'#7c3aed', fontFamily:'Space Mono', fontSize:'0.72rem', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'0.75rem' }}>
            ✦ what i work with ✦
          </p>
          <h2 style={{ fontFamily:'Syne', fontWeight:800, fontSize:'clamp(2rem,5vw,3.2rem)' }}>
            Tech <span style={{ background:'linear-gradient(135deg,#7c3aed,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Stack</span>
          </h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns: isMobile?'1fr':'repeat(auto-fit,minmax(240px,1fr))', gap:'1.2rem' }}>
          {skillGroups.map(({cat,icon,color,items}) => (
            <div key={cat} style={{ background:'#0d0d1a', border:'1px solid #1c1c35', borderRadius:14, padding: isMobile?'1.3rem':'1.8rem', transition:'all 0.3s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=color;e.currentTarget.style.transform='translateY(-4px)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='#1c1c35';e.currentTarget.style.transform='translateY(0)';}}
            >
              <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1.2rem' }}>
                <span style={{ fontSize:'1.2rem' }}>{icon}</span>
                <h3 style={{ fontFamily:'Syne', fontSize: isMobile?'0.9rem':'1rem', color, fontWeight:700 }}>{cat}</h3>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
                {items.map(item => (
                  <span key={item} style={{ padding:'0.3rem 0.75rem', background:`${color}10`, border:`1px solid ${color}30`, borderRadius:999, fontSize: isMobile?'0.74rem':'0.78rem', color:'#9494b8', transition:'all 0.2s' }}
                    onMouseEnter={e=>{e.currentTarget.style.color=color;e.currentTarget.style.borderColor=color;}}
                    onMouseLeave={e=>{e.currentTarget.style.color='#9494b8';e.currentTarget.style.borderColor=`${color}30`;}}
                  >{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
