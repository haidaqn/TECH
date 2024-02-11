import axiosClient from './axiosClient';
import { LoginForm, RegisterForm, UpdateInfo , ChangePasswordUser} from '@/models';
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
        return axiosClient.post(url, data)
    },
};
export default authApi;
