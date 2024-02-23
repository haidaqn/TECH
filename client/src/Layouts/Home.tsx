import Blog from '@/features/Blog';
import Faq from '@/features/FAQ';
import Products from '@/features/Products';
import { DetailProduct } from '@/features/Products/Components';
import Home from '@/features/home';
import { HomeStore } from '@/features/home/HomeComponents';
import Service from '@/features/home/Service';
import { SearchProvider } from '@/router/SearchProvider';
import { Route, Routes } from 'react-router-dom';

export const HomeRouter = () => {
    return (
        <SearchProvider>
            <div className="w-full ">
                <Routes>
                    <Route path="/" element={<Home />}>
                        <Route path="products/:pid" element={<DetailProduct />} />
                        {/* <Route path="category/:category" element={<Category />} /> */}
                        <Route path="/" element={<HomeStore />} />
                        <Route path="products" element={<Products />} />
                        <Route path="blog" element={<Blog />} />
                        <Route path="service" element={<Service />} />
                        <Route path="faq" element={<Faq />} />
                    </Route>
                </Routes>
            </div>
        </SearchProvider>
    );
};
