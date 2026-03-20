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

export const fetchUserProfile = async () => {
  const res = await githubAxios.get(`/users/${USERNAME}`);
  return res.data;
};

export const fetchRepos = async () => {
  const res = await githubAxios.get(`/users/${USERNAME}/repos`, {
    params: { sort: 'updated', per_page: 100 },
  });
  return res.data.sort((a, b) => b.stargazers_count - a.stargazers_count);
};

export const getUsername = () => USERNAME;