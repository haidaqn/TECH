import { ChangePasswordUser, LoginForm, RegisterForm, UpdateInfo } from '@/models';
import axiosClient from './axiosClient';
const authApi = {
    login(data: LoginForm) {
        const url = 'auth/login';
        return axiosClient.post(url, data);
    },
    register(data: RegisterForm) {
        const url = 'auth/register';
        return axiosClient.post(url, data);
    },
    updateInfoUser(data: UpdateInfo) {
        const url = 'user/updateInfo';
        return axiosClient.post(url, data);
    },
    changePassword(data: ChangePasswordUser) {
        const url = 'auth/changepassword';
        return axiosClient.post(url, data);
    },
    forgorPassword(email: string) {
        const url = 'user/forgotpassword';
        return axiosClient.post(url, { email });
    },
    sendmail(email: string) {
        const url = 'auth/sendmail-toast';
        return axiosClient.post(url, { data: email });
    },
    hello() {
        const url = 'brand/hello';
        return axiosClient.get(url);
    },
};
export default authApi;
