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

    const messages: Record<number, string> = {
      400: '잘못된 요청입니다.',
      401: '인증이 필요합니다.',
      403: '접근 권한이 없습니다.',
      404: '요청한 데이터를 찾을 수 없습니다.',
      500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      502: '서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.',
      503: '서비스를 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요.',
    };

    const message = messages[status] ?? `오류가 발생했습니다. (${status})`;
    console.error(`[API Error ${status}] ${url}`);

    return Promise.reject(new Error(message));
  },
);

export default instance;
