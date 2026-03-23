import axios from 'axios';

const instance = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

instance.interceptors.request.use(
  (config) => {
    if (
      config.url?.startsWith('/faers/summary') ||
      config.url?.startsWith('/faers/timeseries')
    ) {
      config.timeout = 120000;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url ?? '';

    if (error.code === 'ECONNABORTED') {
      console.error(`[API Timeout] ${url}`);
      return Promise.reject(new Error('요청 시간이 초과되었습니다.'));
    }

    if (!error.response) {
      console.error(`[Network Error] ${url}`);
      return Promise.reject(new Error('네트워크 연결을 확인해주세요.'));
    }

    switch (status) {
      case 400:
        console.error(`[400 Bad Request] ${url}`);
        break;
      case 404:
        console.warn(`[404 Not Found] ${url}`);
        break;
      case 500:
        console.error(`[500 Server Error] ${url}`);
        break;
      default:
        console.error(`[API Error ${status}] ${url}`);
    }

    return Promise.reject(error);
  },
);

export default instance;
