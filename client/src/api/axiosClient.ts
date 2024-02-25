import axios from 'axios';
import { STATIC_HOST } from '../constants/common';
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
    function (response: { data: any }) {
        return response.data;
    },
    function (error: { response: { data: any } }) {
        if (+error.response.data?.statusCode === 401) {
            const refresh_token = localStorage.getItem('refresh_token');
            console.log(refresh_token?.slice(1, -1));
            axios
                .post(`${STATIC_HOST}auth/refresh`, { refresh_token: refresh_token?.slice(1, -1) })
                .then((res: any) => {
                    console.log(res);
                });
        }
        // Token hết hạn, thực hiện các hành động phù hợp ở đây
        // Ví dụ: chuyển hướng người dùng đến trang đăng nhập
        return Promise.reject(error.response.data);
    }
);

export default axiosClient;
