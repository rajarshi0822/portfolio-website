import { motion } from 'framer-motion';
import { FiStar, FiGitBranch, FiEye } from 'react-icons/fi';
import Atropos from 'atropos/react';
import 'atropos/css';

const langColors = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572a5',
  Java: '#b07219', CSS: '#563d7c', HTML: '#e34c26', Go: '#00add8',
  Rust: '#dea584', 'C++': '#f34b7d', Jupyter: '#F37626',
  'Jupyter Notebook': '#F37626', default: '#7c3aed',
};

export default function RepoCard({ repo, index, onClick }) {
  const color = langColors[repo.language] || langColors.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', stiffness: 50, damping: 16, delay: index * 0.06 }}
      style={{ height: '100%', cursor: 'none' }}
    >
      <Atropos
        className="atropos-repo-card h-full w-full"
        activeOffset={40}
        shadowScale={1.05}
        highlight={true}
        style={{ cursor: 'none' }}
        onClick={() => onClick && onClick(repo)}
      >
        <div
          className="group relative overflow-hidden rounded-2xl flex flex-col gap-3 transition-all duration-300 h-full"
          style={{
            background: 'rgba(13, 13, 26, 0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(16,185,129,0.12)',
            padding: '1.5rem',
            transformStyle: 'preserve-3d',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = `${color}60`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(16,185,129,0.12)';
          }}
        >
          {/* Top accent glow line */}
          <div data-atropos-offset="2" className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 opacity-60 group-hover:opacity-100"
            style={{ background: `linear-gradient(to right, ${color}, transparent)` }} />

          {/* Header */}
          <div data-atropos-offset="8" className="relative flex justify-between items-start" style={{ transformStyle: 'preserve-3d' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f0eeff', lineHeight: 1.3, flex: 1, fontFamily: 'var(--font-heading)' }}>
              {repo.name}
            </h3>
            <div data-atropos-offset="12" className="flex items-center gap-1 ml-2 flex-shrink-0">
              <span className="text-xs px-2 py-0.5 rounded-full transition-all duration-200 group-hover:scale-105"
                style={{ background: `${color}12`, color: color, fontSize: '0.65rem', border: `1px solid ${color}25` }}>
                Click for details
              </span>
            </div>
          </div>

          {/* Description */}
          <p data-atropos-offset="4" style={{ color: '#6b6b8a', fontSize: '0.82rem', lineHeight: 1.7, flexGrow: 1 }}>
            {repo.description ? (repo.description.length > 100 ? repo.description.slice(0, 100) + '...' : repo.description) : 'No description provided.'}
          </p>

          {/* Topics */}
          {repo.topics?.length > 0 && (
            <div data-atropos-offset="6" className="flex flex-wrap gap-1.5 mt-2">
              {repo.topics.slice(0, 3).map(t => (
                <span key={t} className="rounded-full transition-transform hover:scale-110"
                  style={{ padding: '2px 10px', fontSize: '0.68rem', background: `${color}0a`, border: `1px solid ${color}22`, color: `${color}cc` }}>
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div data-atropos-offset="2" className="flex items-center gap-4 pt-4 mt-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            {repo.language && (
              <span className="flex items-center gap-1.5" style={{ fontSize: '0.76rem', color: '#9ca3af' }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: color, boxShadow: `0 0 6px ${color}50` }} />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1" style={{ fontSize: '0.76rem', color: '#9ca3af' }}>
              <FiStar size={11} /> {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1" style={{ fontSize: '0.76rem', color: '#9ca3af' }}>
              <FiGitBranch size={11} /> {repo.forks_count}
            </span>
            <span className="flex items-center gap-1 ml-auto" style={{ fontSize: '0.76rem', color: '#9ca3af' }}>
              <FiEye size={11} /> {repo.watchers_count}
            </span>
          </div>
        </div>
      </Atropos>
    </motion.div>
  );
}
