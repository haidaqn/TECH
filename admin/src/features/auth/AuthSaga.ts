import History from '../../Router/History';
import authApi from '../../apis/auth';
import StorageKeys from '../../constants/storage-keys';
import { LoginForm } from '../../models';

import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { authActions } from './AuthSlice';

export interface Root {
    success: boolean;
    status: number;
    message: string;
    data: {
        data: UserData;
        token: string;
    };
}

export interface UserData {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    isBlocked: boolean;
    createdAt: string;
    role: number;
    updatedAt: string;
    __v: number;
    address: string;
}

function* handleLogin(action: PayloadAction<LoginForm>) {
    try {
        const res: Root = yield call(authApi.login, action.payload);
        yield put(authActions.loginSuccess(res.data.data));
        localStorage.setItem(StorageKeys.TOKEN, res.data.token);
        localStorage.setItem(StorageKeys.NAMEUSER, res.data.data.name);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(res.data.data));
        History.push('/');
    } catch (error) {
        // Handle the error here
        yield put(authActions.loginFailed());
        yield delay(100);
        yield put(authActions.resetAction());
    }
}
function* handleLogout() {
    localStorage.removeItem(StorageKeys.TOKEN);
    localStorage.removeItem(StorageKeys.NAMEUSER);
    localStorage.removeItem(StorageKeys.USER);
}

export function* authSaga() {
    yield takeLatest(authActions.login.type, handleLogin);
    yield takeLatest(authActions.logout.type, handleLogout);
}
