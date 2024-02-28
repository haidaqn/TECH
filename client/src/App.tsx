import { ThemeProvider } from '@/components/theme-provider';
import { Route, Routes } from 'react-router-dom';
import { AuthRouter, HomeRouter } from './Layouts';
import { FinalRegister } from './Layouts/FinalRegister';
import { ProfileUserRouter } from './Layouts/InfoUser';
import './app.css';
import { ProtectAuth } from './components/ProtectRouter';
import { NotFound } from './components/common';
import Welcome from './features/Welcome';
import { useEffect, useState } from 'react';
import { AiFillCaretUp } from 'react-icons/ai';
import authApi from './api/authApi';

function App() {
    const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

    setInterval(() => {
        const fetchData = async () => {
            await authApi.hello();
        };
        fetchData();
    }, 5 * 60 * 1000);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.scrollY;
            if (currentScrollTop > 200) setShowScrollButton(true);
            else setShowScrollButton(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <ThemeProvider defaultTheme="light" storageKey="theme">
            <div className="relative w-screen h-screen">
                <Routes>
                    <Route element={<ProtectAuth />}>
                        <Route path="/auth/*" element={<AuthRouter />} />
                    </Route>
                    <Route path="/user/*" element={<ProfileUserRouter />} />
                    <Route path="/store/*" element={<HomeRouter />} />
                    <Route path="/finalregister/:status" element={<FinalRegister />} />
                    <Route path="/" element={<Welcome />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            {showScrollButton && (
                <a
                    href="#"
                    className="bg-gray-400 fixed flex justify-center items-center bottom-6 right-6 p-2 bg-main rounded-full"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <AiFillCaretUp size={24} color="white" />
                </a>
            )}
        </ThemeProvider>
    );
}

export default App;
