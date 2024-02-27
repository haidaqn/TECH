import axios from 'axios';
import { STATIC_HOST } from '../constants/common';
import { authActions } from '@/features/auth/AuthSlice';

const axiosClient = axios.create({
    baseURL: `${STATIC_HOST}`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        const statusCode = error.response?.data?.statusCode;
        if (statusCode === 401) {
            const refresh_token = localStorage.getItem('refresh_token');
            if (refresh_token) {
                console.log(refresh_token.slice(1, -1));
                axios
                    .post(`${STATIC_HOST}auth/refresh`, {
                        refresh_token: refresh_token.slice(1, -1),
                    })
                    .then((res: any) => {
                        localStorage.setItem('access_token', res.data.token);
                        localStorage.setItem('refresh_token', res.data.refreshToken);
                        return axiosClient(error.config);
                    })
                    .catch((refreshError) => {
                        window.localStorage.removeItem('access_token');
                        window.localStorage.removeItem('name_user');
                        window.localStorage.removeItem('user');
                        window.localStorage.removeItem('refresh_token');
                        window.location.href = '/auth/login';
                        return Promise.reject(refreshError);
                    });
            } else {
                window.localStorage.removeItem('access_token');
                window.localStorage.removeItem('name_user');
                window.localStorage.removeItem('user');
                window.localStorage.removeItem('refresh_token');
                window.location.href = '/auth/login';
                return Promise.reject(error);
            }
        }
        // Xử lý các trường hợp khác
        return Promise.reject(error.response.data);
    }
);

export default axiosClient;
