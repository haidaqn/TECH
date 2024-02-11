import { useEffect, useRef } from 'react';
import { AiFillStar } from 'react-icons/ai';

export interface VoteBarProps {
    rating: number;
    countRating: number;
    totalRatings: number;
}

export const VoteBar = (props: VoteBarProps) => {
    const { countRating, rating, totalRatings } = props;

    const percentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (percentRef.current) {
            const widthPercent = Math.round((countRating * 100) / totalRatings);
            percentRef.current.style.cssText = `right: ${100 - widthPercent}%;`;
        }
    }, [countRating, totalRatings]);

    return (
        <div className="flex items-center gap-5">
            <div className="flex gap-2 items-center">
                <span className="font-medium">{rating}</span>
                <AiFillStar color="orange" size={18} />
            </div>
            <div className="w-full flex-9 h-[8px] rounded-lg bg-gray-300 relative">
                <div ref={percentRef} className="bg-red-500 rounded-lg absolute inset-0"></div>
            </div>
            <span className="">{`${countRating || 0} nhận xét`} </span>
        </div>
    );
};
