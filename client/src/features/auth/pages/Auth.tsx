import { ModeToggle } from '@/components/mode-toggle';
import { AiOutlineHome } from 'react-icons/ai';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
export const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <div className="absolute top-[20px] right-[20px] z-20">
                <ModeToggle />
            </div>
            <div
                onClick={() => navigate('/store')}
                className="absolute top-[20px] left-[20px] z-20 p-2 rounded-md bg-white cursor-pointer hover:opacity-80 ransition-opacity duration-4000"
            >
                <AiOutlineHome color="black" />
            </div>
            <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r  lg:flex">
                    <div className="absolute inset-0 bg-zinc-800" />
                    <div className="relative z-20 flex items-center text-lg font-medium"></div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;Welcome to haidaqn, your destination for cutting-edge gadgets
                                and technology marvels! Nestled at the intersection of innovation
                                and customer satisfaction, haidaqn is not just a store; it's an
                                experience. As a premier establishment in the realm of technology
                                retail, we take pride in curating a selection that encompasses the
                                latest trends and top-tier brands.&rdquo;
                            </p>
                            <footer className="text-sm">
                                <a href="https://github.com/haidaqn">haidaqn</a>
                            </footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {location.pathname.includes('login') ? 'Đăng nhập' : 'Đăng ký'}
                        </h1>
                        <div className="overflow-hidden">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
