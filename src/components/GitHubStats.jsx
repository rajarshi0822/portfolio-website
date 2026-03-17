import { useState, useEffect } from 'react';
import { FiStar, FiGitBranch, FiUsers, FiBook, FiUserCheck } from 'react-icons/fi';

const StatCard = ({ icon, label, value, color, isMobile }) => (
  <div style={{ background:'#0d0d1a', border:'1px solid #1c1c35', borderRadius:14, padding: isMobile?'1.2rem 1rem':'1.8rem 1.5rem', textAlign:'center', transition:'all 0.3s', position:'relative', overflow:'hidden' }}
    onMouseEnter={e=>{e.currentTarget.style.borderColor=color;e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow=`0 16px 35px ${color}18`;}}
    onMouseLeave={e=>{e.currentTarget.style.borderColor='#1c1c35';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';}}
  >
    <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:color, opacity:0.6, borderRadius:'14px 14px 0 0' }} />
    <div style={{ fontSize: isMobile?'1.3rem':'1.6rem', color, marginBottom:'0.6rem', display:'flex', justifyContent:'center' }}>{icon}</div>
    <div style={{ fontSize: isMobile?'1.7rem':'2.2rem', fontWeight:800, fontFamily:'Space Mono', color, lineHeight:1 }}>{value}</div>
    <div style={{ color:'#6b6b8a', fontSize: isMobile?'0.65rem':'0.72rem', marginTop:'0.4rem', letterSpacing:'0.08em', textTransform:'uppercase' }}>{label}</div>
  </div>
);

export default function GitHubStats({ profile, repos, totalStars, totalForks, languageMap }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const topLangs = Object.entries(languageMap).sort((a,b)=>b[1]-a[1]).slice(0,7);
  const total = topLangs.reduce((a,[,v])=>a+v,0);
  const langColors = {
    JavaScript:'#f7df1e', TypeScript:'#3178c6', Python:'#3572a5',
    Java:'#b07219', CSS:'#563d7c', HTML:'#e34c26', Go:'#00add8',
    Rust:'#dea584', 'C++':'#f34b7d', Ruby:'#cc342d', Swift:'#f05138',
    Kotlin:'#A97BFF', default:'#7c3aed',
  };

  return (
    <section id="stats" style={{ padding: isMobile?'5rem 1.2rem':'7rem 2rem', maxWidth:1100, margin:'0 auto' }}>
      <div style={{ textAlign:'center', marginBottom: isMobile?'2.5rem':'4rem' }}>
        <p style={{ color:'#7c3aed', fontFamily:'Space Mono', fontSize:'0.7rem', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'0.75rem' }}>
          ✦ live data from github api ✦
        </p>
        <h2 style={{ fontFamily:'Syne', fontWeight:800, fontSize:'clamp(2rem,5vw,3.2rem)' }}>
          GitHub <span style={{ background:'linear-gradient(135deg,#7c3aed,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Stats</span>
        </h2>
      </div>

      {/* Stat cards — 2 cols on mobile, 5 on desktop */}
      <div style={{ display:'grid', gridTemplateColumns: isMobile?'repeat(2,1fr)':'repeat(5,1fr)', gap: isMobile?'0.85rem':'1.2rem', marginBottom: isMobile?'2rem':'3rem' }}>
        <StatCard icon={<FiStar/>}      label="Stars"    value={totalStars}              color="#f59e0b" isMobile={isMobile} />
        <StatCard icon={<FiGitBranch/>} label="Forks"    value={totalForks}              color="#06b6d4" isMobile={isMobile} />
        <StatCard icon={<FiBook/>}      label="Repos"    value={profile?.public_repos||0} color="#7c3aed" isMobile={isMobile} />
        <StatCard icon={<FiUsers/>}     label="Followers" value={profile?.followers||0}   color="#8b5cf6" isMobile={isMobile} />
        <StatCard icon={<FiUserCheck/>} label="Following" value={profile?.following||0}   color="#f43f5e" isMobile={isMobile} />
      </div>

      {/* Language breakdown */}
      {topLangs.length > 0 && (
        <div style={{ background:'#0d0d1a', border:'1px solid #1c1c35', borderRadius:14, padding: isMobile?'1.4rem':'2rem' }}>
          <h3 style={{ fontFamily:'Syne', fontSize: isMobile?'1rem':'1.2rem', marginBottom:'1.5rem', color:'#f0eeff', display:'flex', alignItems:'center', gap:'0.5rem' }}>
            <span style={{ color:'#7c3aed' }}>◆</span> Language Breakdown
          </h3>
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {topLangs.map(([lang,count]) => {
              const pct = Math.round((count/total)*100);
              const color = langColors[lang] || langColors.default;
              return (
                <div key={lang}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.35rem' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.45rem' }}>
                      <span style={{ width:8, height:8, borderRadius:'50%', background:color, display:'inline-block', flexShrink:0 }} />
                      <span style={{ fontSize: isMobile?'0.78rem':'0.85rem', color:'#f0eeff' }}>{lang}</span>
                    </div>
                    <span style={{ fontSize: isMobile?'0.7rem':'0.78rem', color:'#6b6b8a', fontFamily:'Space Mono' }}>{pct}%</span>
                  </div>
                  <div style={{ background:'#0a0a18', borderRadius:999, height:5, overflow:'hidden' }}>
                    <div style={{ width:`${pct}%`, height:'100%', background:color, borderRadius:999, transition:'width 1.2s ease', boxShadow:`0 0 8px ${color}50` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
