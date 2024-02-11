import { Footer, Header } from '@/components/common';
import { Outlet } from 'react-router-dom';
import { Slidebar } from './Components/Slidebar';

export const HomeProfile = () => {
    return (
        <div className="flex flex-col gap-4 ">
            <Header />
            <div className="px-left-right py-2 flex gap-10 border-t-2 pt-5">
                <div className="flex-1">
                    <Slidebar />
                </div>
                <div className="w-full flex-5">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};
