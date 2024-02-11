import axiosClient from './axiosClient';
import { CartItemData } from '@/models';

const CartApi = {
    updateCart(cartData: CartItemData) {
        const url = 'user/updateCart';
        return axiosClient.post(url, cartData);
    },
};

export default CartApi;
