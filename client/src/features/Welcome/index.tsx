import { LoadingPage } from '@/components/common/LoadingPage';
import { ModeToggle } from '@/components/mode-toggle';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import Typed from 'react-typed';
import type { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';
import './styles.css';
import { useAppDispatch } from '@/app/hooks';
import { getCategories } from '@/app/Products/categoriesActions';
import { getNewProducts, getSoldProducts } from '@/app/Products/productActions';

export default function Welcome() {
    const dispatch = useAppDispatch();
    const { theme } = useTheme();
    const [showTyped, setShowTyped] = useState(true);
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getNewProducts());
        dispatch(getSoldProducts());
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowTyped(true);
        }, 2000);
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);
    return (
        <div className="h-screen w-screen relative overflow-hidden">
            <LoadingPage />
            <header>
                <div className="py-5 px-[50px] flex items-center justify-between ">
                    <div className=""></div>
                    <div className="flex items-center gap-5">
                        <Link
                            to="/store"
                            rel="noopener noreferrer"
                            className="text-lg mr-[20px] hover:underline font"
                        >
                            Trang chủ
                        </Link>
                        <a
                            target="_blank"
                            href="https://www.facebook.com/haidang02.03"
                            rel="noopener noreferrer"
                            className="text-lg mr-[20px] hover:underline font"
                        >
                            Liên hệ
                        </a>
                        <Link to="/auth/login">
                            <Button>Đăng nhập</Button>
                        </Link>
                        <ModeToggle />
                    </div>
                </div>
            </header>
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onHover: {
                                enable: true,
                                mode: 'repulse',
                            },
                            resize: true,
                        },
                        modes: {
                            repulse: {
                                distance: 140,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: `${theme == 'dark' ? '#ffffff' : '#000000'}`,
                        },
                        links: {
                            color: `${theme == 'dark' ? '#ffffff' : '#000000'}`,
                            distance: 200,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        move: {
                            direction: 'none',
                            enable: true,
                            outModes: {
                                default: 'bounce',
                            },
                            random: false,
                            speed: 2,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 600,
                            },
                            value: 40,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: 'circle',
                        },
                        size: {
                            value: { min: 1, max: 5 },
                        },
                    },
                    detectRetina: true,
                }}
            />
            <section className="main-content mx-auto">
                <div className="container text-center flex flex-col items-center max-w-[1024px] pt-[100px]">
                    <div className="max-w-[800px]">
                        <h1 className="text-[3.5rem] leading-[1.5] mb-4 font-bold">
                            {showTyped && (
                                <Typed
                                    strings={[
                                        'Chào mừng đến với ứng dụng cửa hàng công nghệ',
                                        'Sản phẩm của nhóm 7',
                                    ]}
                                    typeSpeed={60}
                                    backSpeed={40}
                                    backDelay={1500}
                                    loop
                                />
                            )}
                        </h1>
                        <p className="leading-[1.875] mb-7 px-[10px]">
                            Ứng dụng được phát triển và xây dựng cho môn học ở trường không nhằm mục
                            đích kiếm tiền. Mọi thắc mắc xin liên hệ với{' '}
                            <span className="text-red-500">haidang02032003@gmail.com</span> để được
                            hướng dẫn và giải quyết!{' '}
                        </p>
                        <Link to="/store">
                            <Button
                                className="w-[250px] h-[50px] border-black dark:border-white"
                                variant={'outline'}
                            >
                                Bắt đầu ngay!
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
