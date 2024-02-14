import './App.css';
import { ThemeProvider, useTheme } from '@emotion/react';
import { LoginPage } from './features/auth/pages/LoginPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectAdmin, ProtectAuth } from './Components/ProtectRouter';
import Admin from './Components/Layout/Admin';
import adminApi from './apis/adminApi';

function App() {
    const theme = useTheme();

    setInterval(() => {
        const fetchData = async () => {
            await adminApi.hello();
        };
        fetchData();
    }, 5 * 60 * 1000);

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route element={<ProtectAuth />}>
                    <Route path="/login" element={<LoginPage />} />
                </Route>
                <Route element={<ProtectAdmin />}>
                    <Route path="/admin/*" element={<Admin />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
