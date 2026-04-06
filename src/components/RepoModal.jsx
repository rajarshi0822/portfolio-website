import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiGitBranch, FiExternalLink, FiGithub, FiEye, FiX, FiCalendar, FiCode } from 'react-icons/fi';

const langColors = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572a5',
  Java: '#b07219', CSS: '#563d7c', HTML: '#e34c26', Go: '#00add8',
  Rust: '#dea584', 'C++': '#f34b7d', Jupyter: '#F37626',
  'Jupyter Notebook': '#F37626', default: '#7c3aed',
};

export default function RepoModal({ repo, onClose }) {
  if (!repo) return null;

  const color = langColors[repo.language] || langColors.default;
  const created = new Date(repo.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const updated = new Date(repo.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-[999] flex items-center justify-center"
        style={{
          background: 'rgba(3, 3, 8, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '1.5rem',
        }}
      >
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full overflow-hidden"
          style={{
            maxWidth: 580,
            background: 'rgba(13, 13, 26, 0.95)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: 20,
            boxShadow: '0 0 60px rgba(124,58,237,0.15), 0 25px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Top glow bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: `linear-gradient(to right, ${color}, #7c3aed, #06b6d4)` }} />

          {/* Ambient glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`, filter: 'blur(40px)' }} />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#9494b8',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.color = '#f0eeff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#9494b8'; }}
          >
            <FiX size={16} />
          </button>

          {/* Content */}
          <div style={{ padding: '2rem 2rem 1.5rem' }}>
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}18`, border: `1px solid ${color}35` }}>
                <FiCode size={18} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.25rem', color: '#f0eeff', lineHeight: 1.3, marginBottom: 4 }}>
                  {repo.name}
                </h2>
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: color }} />
                    <span style={{ fontSize: '0.78rem', color: '#9494b8' }}>{repo.language}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <p style={{ color: '#9494b8', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.2rem' }}>
              {repo.description || 'No description provided for this repository.'}
            </p>

            {/* Topics */}
            {repo.topics?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {repo.topics.map(t => (
                  <span key={t} className="rounded-full transition-all duration-200"
                    style={{
                      padding: '4px 12px', fontSize: '0.72rem',
                      background: `${color}12`, border: `1px solid ${color}30`,
                      color: color,
                    }}>
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-2 mb-5">
              {[
                { icon: <FiStar size={14} />, val: repo.stargazers_count, label: 'Stars', clr: '#f59e0b' },
                { icon: <FiGitBranch size={14} />, val: repo.forks_count, label: 'Forks', clr: '#06b6d4' },
                { icon: <FiEye size={14} />, val: repo.watchers_count, label: 'Watchers', clr: '#8b5cf6' },
                { icon: <FiCode size={14} />, val: repo.size ? `${(repo.size / 1024).toFixed(1)}MB` : 'N/A', label: 'Size', clr: '#10b981' },
              ].map(({ icon, val, label, clr }) => (
                <div key={label} className="text-center rounded-xl py-3"
                  style={{ background: `${clr}08`, border: `1px solid ${clr}20` }}>
                  <div className="flex items-center justify-center mb-1" style={{ color: clr }}>{icon}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: clr }}>{val}</div>
                  <div style={{ fontSize: '0.6rem', color: '#6b6b8a', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Dates */}
            <div className="flex items-center gap-4 mb-5" style={{ fontSize: '0.78rem', color: '#6b6b8a' }}>
              <div className="flex items-center gap-1.5">
                <FiCalendar size={12} /> Created: {created}
              </div>
              <div className="flex items-center gap-1.5">
                <FiCalendar size={12} /> Updated: {updated}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <a href={repo.html_url} target="_blank" rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  padding: '0.85rem 1.5rem', fontSize: '0.88rem',
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  boxShadow: '0 6px 24px rgba(124,58,237,0.35)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 36px rgba(124,58,237,0.55)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 6px 24px rgba(124,58,237,0.35)'}
              >
                <FiGithub size={16} /> View on GitHub
              </a>
              {repo.homepage && (
                <a href={repo.homepage} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    padding: '0.85rem 1.5rem', fontSize: '0.88rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#9494b8', textDecoration: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#06b6d4'; e.currentTarget.style.color = '#06b6d4'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#9494b8'; }}
                >
                  <FiExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
