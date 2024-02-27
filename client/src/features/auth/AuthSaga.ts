import authApi from '@/api/authApi';
import StorageKeys from '@/constants/storage-keys';
import { LoginForm } from '@/models';
import History from '@/router/History';

import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { authActions } from './AuthSlice';

type ApiResAuth = {
    status: boolean;
    type: string;
    message: string;
    data: any;
};

function* handleLogin(action: PayloadAction<LoginForm>) {
    try {
        const res: ApiResAuth = yield call(authApi.login, action.payload);
        const user = res.data;
        yield put(authActions.loginSuccess(user));
        localStorage.setItem(StorageKeys.TOKEN, user.token);
        localStorage.setItem(StorageKeys.NAMEUSER, user.data.name);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(user.data));
        localStorage.setItem(StorageKeys.REFRESH_TOKEN, JSON.stringify(user.refreshToken));
        History.push('/store');
    } catch (error) {
        // Handle the error here
        yield put(authActions.loginFailed());
        yield delay(100);
        yield put(authActions.resetAction());
    }
}
function handleLogout() {
    localStorage.removeItem(StorageKeys.TOKEN);
    localStorage.removeItem(StorageKeys.NAMEUSER);
    localStorage.removeItem(StorageKeys.USER);
}

export function* authSaga() {
    yield takeLatest(authActions.login.type, handleLogin);
    yield takeLatest(authActions.logout.type, handleLogout);
}
