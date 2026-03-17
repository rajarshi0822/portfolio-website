import { useState, useEffect } from 'react';
import { fetchUserProfile, fetchRepos } from '../utils/githubApi';

export const useGitHub = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [profileData, reposData] = await Promise.all([
          fetchUserProfile(),
          fetchRepos(),
        ]);
        setProfile(profileData);
        setRepos(reposData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
  const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);
  const topRepos = repos.slice(0, 6);
  const languageMap = {};
  repos.forEach((repo) => {
    if (repo.language) languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
  });

  return { profile, repos, topRepos, totalStars, totalForks, languageMap, loading, error };
};