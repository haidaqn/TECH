import orderApi from '@/api/orderApi';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Footer, Header, Navbar } from '@/components/common';
import { CartUser } from '@/models';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { cartActions } from '../cart/CartSlice';

const Home = () => {
    const { dataStore } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = (await orderApi.getCartByUser()) as unknown as CartUser[];
                if (res.length) {
                    res.forEach((item) =>
                        dispatch(
                            cartActions.addCartDefault({
                                id: item.product._id,
                                title: item.product.title,
                                quantity: item.quantity,
                                price: item.product.price,
                                img: item.product.thumb,
                                color: item.color,
                                add: true,
                            })
                        )
                    );
                }
                if (dataStore.length) {
                    dataStore.forEach(item => dispatch(cartActions.addCartHome(item)))
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
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
    );
};

export default Home;
