import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import RepoCard from './RepoCard';
import RepoModal from './RepoModal';
import { SectionDecorations } from './Interactive3D';
import { FiGithub } from 'react-icons/fi';

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME;

export default function Projects({ topRepos, repos }) {
  const [showAll, setShowAll] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const displayed = showAll ? repos.slice(0, 12) : topRepos;

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return (
    <>
      <section id="projects" className="relative overflow-hidden" style={{ padding: isMobile ? '5rem 1.2rem' : '7rem 2rem' }}>
        {/* 3D Background elements */}
        <SectionDecorations variant="projects" />

        <div className="relative z-10" style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
            style={{ marginBottom: isMobile ? '2.5rem' : '4rem' }}
          >
            <p style={{ color: '#7c3aed', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              ✦ open source work ✦
            </p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.2rem)' }}>
              My <span className="grad-text">Works</span>
            </h2>
            <p style={{ color: '#6b6b8a', marginTop: '0.75rem', fontSize: isMobile ? '0.8rem' : '0.88rem' }}>
              {repos.length} public repositories · sorted by stars · click to explore
            </p>
          </motion.div>

          {/* Repo grid */}
          <div className="grid gap-4" style={{ gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {displayed.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} onClick={setSelectedRepo} />
            ))}
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center items-center mt-8"
            style={{ flexDirection: isMobile ? 'column' : 'row', padding: isMobile ? '0 0.5rem' : 0 }}
          >
            {repos.length > 6 && (
              <motion.button
                whileHover={{ y: -3, boxShadow: '0 0 25px rgba(124,58,237,0.2)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowAll(p => !p)}
                className="glass rounded-xl transition-all duration-300"
                style={{ padding: '0.75rem 1.8rem', fontSize: '0.85rem', color: '#7c3aed', fontFamily: 'var(--font-heading)', width: isMobile ? '100%' : 'auto', maxWidth: isMobile ? 340 : 'none' }}
              >
                {showAll ? '← Show Less' : `Show More (${repos.length - 6} more)`}
              </motion.button>
            )}
            <motion.a
              whileHover={{ y: -3, boxShadow: '0 10px 30px rgba(124,58,237,0.5)' }}
              whileTap={{ scale: 0.97 }}
              href={`https://github.com/${USERNAME}?tab=repositories`} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl font-bold text-white"
              style={{ padding: '0.75rem 1.8rem', fontSize: '0.85rem', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', textDecoration: 'none', boxShadow: '0 4px 20px rgba(124,58,237,0.3)', width: isMobile ? '100%' : 'auto', maxWidth: isMobile ? 340 : 'none' }}
            >
              <FiGithub /> View All on GitHub
            </motion.a>
          </motion.div>
        </div>
      </section>

      {selectedRepo && (
        <RepoModal repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
      )}
    </>
  );
}
