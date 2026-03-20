import { useState, useEffect } from 'react';
import axios from 'axios';

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'rajarshi0822';
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';

const githubAxios = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    Accept: 'application/vnd.github+json',
  },
});

export const useGitHub = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [profileRes, reposRes] = await Promise.all([
          githubAxios.get(`/users/${USERNAME}`),
          githubAxios.get(`/users/${USERNAME}/repos`, {
            params: { sort: 'updated', per_page: 100 },
          }),
        ]);
        setProfile(profileRes.data);
        setRepos(reposRes.data.sort((a, b) => b.stargazers_count - a.stargazers_count));
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
    if (repo.language) {
      languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
    }
  });

  return { profile, repos, topRepos, totalStars, totalForks, languageMap, loading, error };
};