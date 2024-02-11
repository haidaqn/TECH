import { Card } from '../ui/card';

export const CountTime = ({ time, name }: { time: number; name: string }) => {
    return (
        <Card className="bg-white rounded-[4px] px-2  flex flex-1 flex-col items-center justify-center">
            <span className="text-base text-black">{time}</span>
            <span className="text-gray-500 text-sm capitalize">{name}</span>
        </Card>
    );
};
