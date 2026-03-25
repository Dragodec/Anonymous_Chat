import axios from 'axios';

const DEVURL = 'https://4d0cg8n5-8000.inc1.devtunnels.ms';
const LOCALURL = 'http://127.0.0.1:8000';

const isDevTunnel = localStorage.getItem('use_dev_tunnel') === 'true';
const activeBaseUrl = isDevTunnel ? DEVURL : LOCALURL;

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || activeBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally add interceptors here
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error handling
    return Promise.reject(error);
  }
);

export default apiInstance;
