import { useTheme } from '@/components/theme-provider';
import { useEffect, useState } from 'react';
import 'swiper/css';
import { DayDetail, FeaturedProducts, ProductNew, ProductSold } from './Components';
import { SlidebarHome } from './Components/Slidebar';
import { useSearchContext } from '@/context';
export const HomeStore = () => {
    const [productNew, setProductNew] = useState<boolean>(false);
    const { setSearchQuery } = useSearchContext();
    const { theme } = useTheme();
    const handleNewOrSold = (value: boolean): void => {
        setProductNew((prev) => (prev !== value ? value : prev));
    };

    useEffect(() => {
        setSearchQuery('');
    }, []);

    return (
        <div className="flex flex-col gap-6">
            <SlidebarHome />
            <div className="flex w-full gap-5 h-full">
                <div className="flex-1">
                    <DayDetail />
                </div>
                <div className="flex-3 flex-col gap-5 recommend-store ">
                    <div className="flex gap-4">
                        <span
                            onClick={() => handleNewOrSold(false)}
                            className={`px-3 py-1 rounded-[3px] text-[18px] cursor-pointer ${
                                !productNew
                                    ? theme === 'light'
                                        ? 'bg-black/80 text-white'
                                        : 'bg-white/95 text-black'
                                    : theme === 'light'
                                    ? 'bg-gray-100'
                                    : 'bg-gray-700'
                            } `}
                        >
                            Sản phẩm bán chạy
                        </span>
                        <span
                            onClick={() => handleNewOrSold(true)}
                            className={`px-3 py-1 rounded-[3px] text-[18px] cursor-pointer ${
                                productNew
                                    ? theme === 'light'
                                        ? 'bg-black/80 text-white'
                                        : 'bg-white/95 text-black'
                                    : theme === 'light'
                                    ? 'bg-gray-100'
                                    : 'bg-gray-700'
                            } `}
                        >
                            Sản phẩm mới
                        </span>
                    </div>
                    <div className="w-full mt-5">
                        {productNew ? <ProductNew /> : <ProductSold />}
                    </div>
                </div>
            </div>
            <FeaturedProducts />
            <div className="grid grid-cols-4 gap-5">
                <img className="col-span-2 h-full" src="/assets/ImageHome/tainghe.webp" alt="" />
                <div className="col-span-1 h-full flex flex-col gap-5">
                    <img src="/assets/ImageHome/dongho.avif" alt="" />
                    <img src="/assets/ImageHome/sale.avif" alt="" />
                </div>
                <img className="col-span-1 h-full" src="/assets/ImageHome/smart.webp" alt="" />
            </div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.034406756229!2d105.8786921098439!3d21.151028983488537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313507a2346516c7%3A0xb5d95160203d5070!2zTOG7lyBHaWFvIFZp4buHdCBIw7luZyDEkMO0bmcgQW5oIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1682047463963!5m2!1svi!2s"
                width="100%"
                height="350"
                className="w-100"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};
