import { useState, useEffect } from 'react';
import RepoCard from './RepoCard';
import { FiGithub } from 'react-icons/fi';

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME;

export default function Projects({ topRepos, repos }) {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const displayed = showAll ? repos.slice(0,12) : topRepos;

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return (
    <section id="projects" style={{ padding: isMobile?'5rem 1.2rem':'7rem 2rem', maxWidth:1100, margin:'0 auto' }}>
      <div style={{ textAlign:'center', marginBottom: isMobile?'2.5rem':'4rem' }}>
        <p style={{ color:'#7c3aed', fontFamily:'Space Mono', fontSize:'0.7rem', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'0.75rem' }}>
          ✦ open source work ✦
        </p>
        <h2 style={{ fontFamily:'Syne', fontWeight:800, fontSize:'clamp(2rem,5vw,3.2rem)' }}>
          My <span style={{ background:'linear-gradient(135deg,#7c3aed,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Works</span>
        </h2>
        <p style={{ color:'#6b6b8a', marginTop:'0.75rem', fontSize: isMobile?'0.8rem':'0.88rem' }}>
          {repos.length} public repositories · sorted by stars
        </p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns: isMobile?'1fr':'repeat(auto-fit,minmax(300px,1fr))', gap: isMobile?'1rem':'1.4rem', marginBottom:'2rem' }}>
        {displayed.map((repo,i) => <RepoCard key={repo.id} repo={repo} index={i} />)}
      </div>

      <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center', flexWrap:'wrap', flexDirection: isMobile?'column':'row', alignItems:'center', padding: isMobile?'0 0.5rem':0 }}>
        {repos.length > 6 && (
          <button onClick={()=>setShowAll(p=>!p)} style={{ padding:'0.75rem 1.8rem', width: isMobile?'100%':'auto', maxWidth: isMobile?340:'none', background:'transparent', border:'1px solid #1c1c35', borderRadius:8, color:'#7c3aed', fontSize:'0.85rem', cursor:'none', transition:'all 0.2s', fontFamily:'Syne' }}
            onMouseEnter={e=>e.currentTarget.style.borderColor='#7c3aed'}
            onMouseLeave={e=>e.currentTarget.style.borderColor='#1c1c35'}
          >{showAll?'← Show Less':`Show More (${repos.length-6} more)`}</button>
        )}
        <a href={`https://github.com/${USERNAME}?tab=repositories`} target="_blank" rel="noreferrer"
          style={{ padding:'0.75rem 1.8rem', width: isMobile?'100%':'auto', maxWidth: isMobile?340:'none', background:'linear-gradient(135deg,#7c3aed,#06b6d4)', color:'#fff', border:'none', borderRadius:8, fontSize:'0.85rem', textDecoration:'none', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem', transition:'all 0.2s', boxShadow:'0 4px 16px rgba(124,58,237,0.3)' }}
          onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
          onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
        ><FiGithub/> View All on GitHub</a>
      </div>
    </section>
  );
}
