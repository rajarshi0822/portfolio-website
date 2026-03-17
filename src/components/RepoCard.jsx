import { FiStar, FiGitBranch, FiExternalLink, FiGithub, FiEye } from 'react-icons/fi';

const langColors = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572a5',
  Java: '#b07219', CSS: '#563d7c', HTML: '#e34c26', Go: '#00add8',
  Rust: '#dea584', 'C++': '#f34b7d', default: '#10b981',
};

export default function RepoCard({ repo, index }) {
  const color = langColors[repo.language] || langColors.default;

  return (
    <div style={{
      background: '#0a1a14', border: '1px solid #1a3328', borderRadius: 14,
      padding: '1.6rem', display: 'flex', flexDirection: 'column',
      gap: '0.8rem', transition: 'all 0.3s ease',
      animation: `fadeUp 0.5s ease ${index * 0.08}s both`,
      position: 'relative', overflow: 'hidden',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#10b981';
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(16,185,129,0.12)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#1a3328';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(to right, ${color}, transparent)`,
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ecfdf5', lineHeight: 1.3, flex: 1 }}>
          {repo.name}
        </h3>
        <div style={{ display: 'flex', gap: '0.6rem', marginLeft: '0.5rem', flexShrink: 0 }}>
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noreferrer"
              style={{ color: '#6b7280', transition: 'color 0.2s', fontSize: '0.9rem' }}
              onMouseEnter={e => e.target.style.color = '#10b981'}
              onMouseLeave={e => e.target.style.color = '#6b7280'}>
              <FiExternalLink />
            </a>
          )}
          <a href={repo.html_url} target="_blank" rel="noreferrer"
            style={{ color: '#6b7280', transition: 'color 0.2s', fontSize: '0.9rem' }}
            onMouseEnter={e => e.target.style.color = '#10b981'}
            onMouseLeave={e => e.target.style.color = '#6b7280'}>
            <FiGithub />
          </a>
        </div>
      </div>

      {/* Description */}
      <p style={{ color: '#6b7280', fontSize: '0.82rem', lineHeight: 1.65, flexGrow: 1 }}>
        {repo.description || 'No description provided.'}
      </p>

      {/* Topics */}
      {repo.topics?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {repo.topics.slice(0, 3).map(t => (
            <span key={t} style={{
              padding: '0.2rem 0.6rem', background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.2)', borderRadius: 999,
              fontSize: '0.7rem', color: '#10b981',
            }}>{t}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid #1a3328' }}>
        {repo.language && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: '#9ca3af' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
            {repo.language}
          </span>
        )}
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: '#9ca3af' }}>
          <FiStar size={11} /> {repo.stargazers_count}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: '#9ca3af' }}>
          <FiGitBranch size={11} /> {repo.forks_count}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: '#9ca3af', marginLeft: 'auto' }}>
          <FiEye size={11} /> {repo.watchers_count}
        </span>
      </div>
    </div>
  );
}
