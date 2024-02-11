import { useAppSelector } from '@/app/hooks';
import { CountTime } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TypeTime } from '@/models';
import { handlePrice, renderStartNumber } from '@/utils';
import { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
let interval: NodeJS.Timeout | null = null; 

export const DayDetail = () => {
    const { productNew } = useAppSelector((state) => state.product);

    const [payload, SetPayload] = useState<TypeTime>({ hour: 0, minutes: 0, seconds: 0 });
    const [expireTime, setExpireTime] = useState<boolean>(false);
    const { title, thumb, price, totalRatings, _id } = productNew[0];

    const navigate = useNavigate();

    const fetchTime = async () => {
        const h = 23 - new Date().getHours();
        const m = 60 - new Date().getMinutes();
        const s = 60 - new Date().getSeconds();
        SetPayload({ hour: h, minutes: m, seconds: s });
    };
    useEffect(() => {
        interval && clearInterval(interval);
        fetchTime();
    }, [expireTime]);

    useEffect(() => {
        interval = setInterval(() => {
            if (payload.seconds > 0) {
                SetPayload((prev) => ({ ...prev, seconds: +prev.seconds - 1 }));
            } else {
                if (payload.minutes > 0) {
                    SetPayload((prev) => ({ ...prev, minutes: +prev.minutes - 1, seconds: 60 }));
                } else {
                    if (payload.hour > 0) {
                        SetPayload((prev) => ({
                            ...prev,
                            hour: +prev.hour - 1,
                            minutes: 60,
                            seconds: 60,
                        }));
                    } else {
                        setExpireTime((prev) => !prev);
                    }
                }
            }
        }, 1000);
        return () => {
            interval && clearInterval(interval);
        };
    }, [payload.seconds, payload.minutes, payload.hour]);

    return (
        <Card className="bg-white cursor-pointer relative flex items-center justify-center flex-col gap-[6px] pb-2 rounded-sm">
            <span className="absolute top-[6px] left-3">
                <AiFillStar size={28} color="red" />
            </span>
            <span className="mt-[6px] text-xl font-bold uppercase text-black">day detail</span>
            <img
                onClick={() => {
                    navigate(`products/${_id}`);
                }}
                className="object-cover bg-center cursor-pointer bg-cover w-[68%] transition-transform transform hover:scale-110"
                src={thumb}
                alt=""
            />
            <div className="flex flex-col items-center justify-center">
                <span
                    onClick={() => {
                        navigate(`products/${_id}`);
                    }}
                    className=" text-xl font-medium text-center"
                >
                    {title}
                </span>
                <span className="flex gap-1 text-xs">{renderStartNumber(totalRatings, 22)}</span>
                <span className="font-medium">{handlePrice(price)}</span>
            </div>
            <div className="w-full flex items-center justify-center flex-col gap-2">
                <div className="flex gap-3 w-full px-8">
                    <CountTime time={payload.hour} name="hour" />
                    <CountTime time={payload.minutes} name="minutes" />
                    <CountTime time={payload.seconds} name="seconds" />
                </div>
                <Button
                    onClick={() => {
                        navigate(`products/${_id}`);
                    }}
                    className="uppercase text-lg font-bold w-[95%] bg-red-600 rounded-none"
                >
                    option
                </Button>
            </div>
        </Card>
    );
};
