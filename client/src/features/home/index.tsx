import { Footer, Header, Navbar } from '@/components/common';
import { SearchProvider } from '@/router/SearchProvider';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <SearchProvider>
            <div className="flex flex-col gap-4 ">
                <Header />
                <div className="px-left-right py-2 ">
                    <Navbar />
                    <div className="py-4">
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>
        </SearchProvider>
    );
};

export default Home;
