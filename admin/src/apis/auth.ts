import axiosClient from './axiosClient';
import { LoginForm } from '../models/auth';

const authApi = {
    login(data: LoginForm) {
        const url = 'auth/login';
        return axiosClient.post(url, data);
    }
};

export default authApi;
