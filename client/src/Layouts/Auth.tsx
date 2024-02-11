import { Auth, LoginPage, RegisterPage } from '@/features/auth/pages';
import { Navigate, Route, Routes } from 'react-router-dom';

export function AuthRouter() {
    return (
        <Routes>
            <Route element={<Auth />}>
                <Route index element={<Navigate to={'login'} />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Route>
        </Routes>
    );
}
