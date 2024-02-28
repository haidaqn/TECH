import authApi from '@/api/authApi';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { authActions } from '@/features/auth/AuthSlice';
import { Cart } from '@/features/cart/page';
import { useInforUser } from '@/hooks/InfoUser';
import { useState } from 'react';
import { AiFillMail } from 'react-icons/ai';
import { FaPhone } from 'react-icons/fa6';
import { IoBagSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../theme-provider';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Command } from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cartActions } from '@/features/cart/CartSlice';

export const Header = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const { actionAuth } = useAppSelector((state) => state.auth);
    const user = useInforUser();
    const handleLogout = async () => {
        try {
            await authApi.logout().then(() => {
                dispatch(authActions.logout());
            });
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(cartActions.resetCart());
        }
    };

    const navigate = useNavigate();

    const { lengthProduct } = useAppSelector((state) => state.cart);
    const [openCart, setOpenCart] = useState<boolean>(false);

    return (
        <div className="flex flex-col gap-6">
            <div
                className={`h-12 ${
                    theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'
                }`}
            >
                <header className="px-left-right h-full flex items-center justify-between relative">
                    <span className=" uppercase font-medium">
                        order online or call us (+1800) 000 8808
                    </span>
                    <div className="">
                        {actionAuth === 'Success' && user ? (
                            <div className="flex items-center justify-center gap-5">
                                <h1 className="text-lg font-semibold tracking-widest capitalize">
                                    {user.name}
                                </h1>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage
                                                src={
                                                    user.avatar
                                                        ? user.avatar
                                                        : 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'
                                                }
                                                alt="@shadcn"
                                            />
                                            <AvatarFallback></AvatarFallback>
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="max-w-[200px]">
                                        <Command className="flex flex-col gap-3">
                                            <Button
                                                className="capitalize"
                                                onClick={() => navigate('/user/account/profile')}
                                            >
                                                thông tin cá nhân
                                            </Button>
                                            <Button
                                                className="capitalize"
                                                onClick={() => {
                                                    handleLogout();
                                                    navigate('/store');
                                                }}
                                            >
                                                Đăng Xuất
                                            </Button>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/auth/login"
                                    className=" uppercase font-medium tracking-widest hover:opacity-80 cursor-pointer"
                                >
                                    đăng nhập
                                </Link>
                                <span className=" uppercase font-medium tracking-widest">/</span>
                                <Link
                                    to="/auth/register"
                                    className=" uppercase font-medium tracking-widest hover:opacity-80 cursor-pointer"
                                >
                                    đăng ký
                                </Link>
                            </>
                        )}
                    </div>
                </header>
            </div>
            <div className="px-left-right flex items-center justify-between">
                <img
                    src="/assets/logo.png"
                    alt="logo"
                    className="w-[250px] h-[28px] cursor-pointer"
                    onClick={() => navigate('/store')}
                />
                <div className="flex gap-10">
                    <div className="flex flex-col gap-0 items-center justify-center">
                        <h1 className="flex gap-1">
                            <FaPhone size={20} />
                            <span className="font-medium">(+1800) 000 8808</span>
                        </h1>
                        <span className="text-sm">Hỗ trợ 24/7</span>
                    </div>
                    <div className="flex flex-col gap-0 items-center justify-center">
                        <h1 className="flex gap-1">
                            <AiFillMail size={25} />
                            <span className="font-medium uppercase">haidang02032003@gmail.com</span>
                        </h1>
                        <span className="text-sm">Mon-Sat 9:00AM - 8:00PM</span>
                    </div>
                    <div
                        onClick={() => setOpenCart((prev) => !prev)}
                        className="flex items-center justify-center relative cursor-pointer"
                    >
                        <IoBagSharp size={40} />
                        {lengthProduct > 0 && (
                            <span className="absolute text-sm top-[-5px] bg-gray-300 w-5 h-5 flex items-center justify-center rounded-full right-[-7px]">
                                {lengthProduct}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <Cart open={openCart} setOpen={setOpenCart} />
        </div>
    );
};
