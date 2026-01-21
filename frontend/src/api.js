import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

export const triggerCrawl = () => api.post('/trigger-crawl/');
export const getNews = () => api.get('/news/');