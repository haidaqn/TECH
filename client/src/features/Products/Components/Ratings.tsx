import { VoteBar } from '@/components/common';
import { Card } from '@/components/ui/card';
import { Rating } from '@/models';
import { renderStartNumber } from '@/utils';
export const Ratings = ({ ratings, totalRatings }: { ratings: Rating[]; totalRatings: number }) => {
    return (
        <Card className="w-full  grid grid-cols-12 gap-4 p-5">
            <div className="col-span-5 flex flex-col gap-2 items-center justify-center border-r-2">
                <span className="text-red-600">
                    <span className="text-xl ">{totalRatings}</span> trên 5
                </span>
                <span className="flex gap-1">{renderStartNumber(totalRatings, 17)}</span>
            </div>
            <div className="col-span-7">
                {Array.from(Array(5).keys())
                    .reverse()
                    .map((item) => (
                        <VoteBar
                            rating={item + 1}
                            key={item}
                            countRating={
                                ratings?.filter((rating) => rating.star === item + 1)?.length
                            }
                            totalRatings={ratings?.length || 1}
                        />
                    ))}
            </div>
        </Card>
    );
};
