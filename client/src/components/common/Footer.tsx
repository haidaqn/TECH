import authApi from '@/api/authApi';
import { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { FaCcDinersClub, FaCcDiscover, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { RiVisaLine } from 'react-icons/ri';
import { SiAmericanexpress } from 'react-icons/si';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';

export const Footer = () => {
    const { toast } = useToast();
    const [email, setEmail] = useState<string>('');

    const handleBlur = async () => {
        try {
            if (email) {
                const res = await authApi.sendmail(email);
                if (res) {
                    setEmail('');
                    toast({
                        title: 'Đăng ký nhận thông báo thành công !',
                    });
                } else {
                    toast({
                        title: 'Đăng ký nhận thông báo thất bại !',
                        variant: 'destructive',
                    });
                }
            }
        } catch (error) {
            toast({
                title: 'Đăng ký nhận thông báo thất bại !',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="">
            <div className="bg-[#ee3131]">
                <div className="px-left-right flex items-center justify-between py-5">
                    <div className="text-white ">
                        <h1 className="font-bold text-lg uppercase">đăng ký bản tin</h1>
                        <h3 className="text-sm">Đăng ký ngay và nhận bản tin hàng tuần !!!</h3>
                    </div>
                    <div className="relative">
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleBlur();
                                }
                            }}
                            className="w-[450px] py-6 rounded-xl placeholder:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white text-white"
                            placeholder="example@gmail.com"
                        />
                        <span className="absolute top-[15px] right-5">
                            <AiOutlineMail size={24} color="white" />
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-[#191919]">
                <div className="px-left-right py-6 text-white flex flex-col gap-3">
                    <table className="w-full">
                        <thead>
                            <tr className="flex flex-wrap">
                                <td className="flex-2">
                                    <h1 className="px-3 border-l-[3px] border-red-700 uppercase text-lg font-medium">
                                        Về chúng tôi
                                    </h1>
                                    <div className="mt-3 flex flex-col gap-2 ">
                                        <span className="flex items-center">
                                            <IoLocationOutline color="white" size={24} />
                                            <small className="font-medium pl-1">Địa chỉ:</small>
                                            <small className="font-normal text-gray-400 pl-2">
                                                Lo Giao Viet Hung Dong Anh Ha Noi
                                            </small>
                                        </span>
                                        <span className="flex items-center">
                                            <IoLocationOutline color="white" size={24} />
                                            <small className="font-medium pl-1">
                                                Số điện thoại:
                                            </small>
                                            <small className="font-normal text-gray-400 pl-2">
                                                (+1234)56789xxx
                                            </small>
                                        </span>
                                        <span className="flex items-center font-medium">
                                            <IoLocationOutline color="white" size={24} />
                                            <small className="font-medium pl-1">Mail:</small>
                                            <small className="font-normal text-gray-400 pl-2">
                                                haidang02032003@gmail.ccom
                                            </small>
                                        </span>
                                    </div>
                                </td>
                                <td className="flex-1">
                                    <h1 className="px-3 border-l-[3px] border-red-700 uppercase text-lg font-medium">
                                        thông tin
                                    </h1>
                                    <div className="mt-3">
                                        <ul className="text-gray-400">
                                            <li>Vị trí cửa hàng</li>
                                            <li>Liên hệ</li>
                                        </ul>
                                    </div>
                                </td>
                                <td className="flex-1">
                                    <h1 className="px-3 border-l-[3px] border-red-700 uppercase text-lg font-medium">
                                        who we are
                                    </h1>
                                    <div className="mt-3">
                                        <ul className="text-gray-400">
                                            <li>Miễn phí vận chuyển</li>
                                            <li>Trả lại & Trao đổi</li>
                                            <li>Lời chứng thực</li>
                                        </ul>
                                    </div>
                                </td>
                                <td className="flex-1">
                                    <h1 className="px-3 border-l-[3px] border-red-700 uppercase text-lg font-medium">
                                        #DIGITALWORLDSTORE
                                    </h1>
                                </td>
                            </tr>
                        </thead>
                    </table>
                    <div className="pt-5 border-t-[1px] flex gap-4 items-center ">
                        <h1 className="px-3 border-l-[3px] border-red-700 uppercase text-lg font-medium">
                            Người sáng lập:
                        </h1>
                        <ul>
                            <li>
                                <a href="https://github.com/haidaqn?tab=repositories">haidaqn</a>
                            </li>
                            {/* <li>
                                <a href="https://github.com/haidaqn?tab=repositories">haidaqn</a>
                            </li>
                            <li>
                                <a href="https://github.com/haidaqn?tab=repositories">haidaqn</a>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-black ">
                <div className="px-left-right flex items-center justify-between text-gray-300 py-3">
                    <h1>© 2023, Digital World 2 Powered by haidaqn</h1>
                    <div className="flex gap-3 items-center justify-center">
                        <RiVisaLine size={35} color="white" />
                        <FaCcMastercard size={35} color="white" />
                        <SiAmericanexpress size={35} color="white" />
                        <FaCcPaypal size={35} color="white" />
                        <FaCcDinersClub size={35} color="white" />
                        <FaCcDiscover size={35} color="white" />
                    </div>
                </div>
            </div>
        </div>
    );
};
