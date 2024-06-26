import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginForm, User } from '../../models';

export interface AuthState {
    logging?: boolean;
    registering?: boolean;
    actionAuth: 'No action' | 'Success' | 'Failed';
    currentUser?: User;
}

const initialState: AuthState = {
    logging: false,
    registering: false,
    actionAuth: 'No action',
    currentUser: undefined
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginForm>) {
            console.log(action);
            state.logging = true;
            state.actionAuth = 'No action';
        },

        loginSuccess(state, action: PayloadAction<User>) {
            state.logging = false;
            state.actionAuth = 'Success';
            state.currentUser = action.payload;
        },
        loginFailed(state) {
            state.logging = false;
            state.actionAuth = 'Failed';
        },
        logout(state) {
            state.logging = false;
            state.registering = false;
            state.actionAuth = 'No action';
            state.currentUser = undefined;
        },
        resetAction(state) {
            state.actionAuth = 'No action';
        }
        // ...các action khác
    }
});

export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
