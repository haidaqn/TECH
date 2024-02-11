import { useAppSelector } from '@/app/hooks';
import { MdOutlineSmartphone } from 'react-icons/md';
import { FaLaptopCode } from 'react-icons/fa6';
import { PiTelevisionSimple } from 'react-icons/pi';
import { AiTwotonePrinter } from 'react-icons/ai';
import { FcSmartphoneTablet } from 'react-icons/fc';
import { MdSpeakerGroup } from 'react-icons/md';
import { useTheme } from '@/components/theme-provider';
import { Link } from 'react-router-dom';

export const SlidebarHome = () => {
    const iconSlidebar = [
        <AiTwotonePrinter size={30} />,
        <PiTelevisionSimple size={30} />,
        <FcSmartphoneTablet size={30} />,
        <MdOutlineSmartphone size={30} />,
        <FaLaptopCode size={30} />,
        <MdSpeakerGroup size={30} />,
    ];
    const { theme } = useTheme();
    const { data } = useAppSelector((state) => state.categories);
    return (
        <div className="flex gap-5 h-full">
            <div className="flex-1 flex flex-col justify-between">
                {data.map((item, index) => (
                    <Link
                        to={`products?category=${item.title}`}
                        key={item._id}
                        onClick={() => console.log(item.title)}
                        className={`${
                            theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-[#27272B]'
                        } flex items-center gap-3 text-xl font-medium cursor-pointer rounded-md px-2 py-1`}
                    >
                        {iconSlidebar[index]}
                        <span>{item.title}</span>
                    </Link>
                ))}
            </div>
            <div className="flex-3">
                <img className="h-full" src="/assets/logo_home.jpg" alt="" />
            </div>
        </div>
    );
};
