import { Card } from '@/components/ui/card';
import { MdOutlineSecurity } from 'react-icons/md';
import { FaShippingFast, FaGift } from 'react-icons/fa';
import { ReactElement } from 'react';
import { GiReturnArrow } from 'react-icons/gi';
import { FaPhoneVolume } from 'react-icons/fa6';

interface ExtrainfoProps {
    icon: ReactElement;
    title: string;
    content: string;
}

export const Extrainfo = () => {
    const ExtrainInfoItems: ExtrainfoProps[] = [
        {
            icon: <MdOutlineSecurity color="black" size={30} />,
            title: 'Bảo đảm',
            content: 'đảm bảo chất lượng',
        },
        {
            icon: <FaShippingFast color="black" size={30} />,
            title: 'Miễn phí vận chuyển',
            content: 'Miễn phí trên tất cả sản phẩm',
        },
        {
            icon: <FaGift color="black" size={30} />,
            title: 'Thẻ quà tặng đặc biệt',
            content: 'Thẻ quà tặng đặc biệt',
        },
        {
            icon: <GiReturnArrow color="black" size={30} />,
            title: 'Hoàn trả miễn phí',
            content: 'Trong vòng 7 ngày',
        },
        {
            icon: <FaPhoneVolume color="black" size={30} />,
            title: 'Tư vấn',
            content: 'Trọn đời 24/7/356',
        },
    ];

    return (
        <div className="flex flex-col gap-3">
            {ExtrainInfoItems.map((item, index) => (
                <Card
                    key={index + item.title}
                    className="rounded-sm px-3 bg-white py-1 flex items-center gap-5"
                >
                    {item.icon}
                    <div className="flex flex-col ">
                        <span className="text-base text-black font-medium capitalize">
                            {item.title}
                        </span>
                        <span className="text-sm font-normal capitalize text-gray-400">
                            {item.content}
                        </span>
                    </div>
                </Card>
            ))}
        </div>
    );
};
