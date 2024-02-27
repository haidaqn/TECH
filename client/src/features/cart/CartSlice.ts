import CartApi from '@/api/cartApi';
import { CartItemData } from '@/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
    lengthProduct: number;
    dataStore: CartItemData[];
}

const initialState: CartState = {
    lengthProduct: 0,
    dataStore: [],
};

const updateCartAsync = async (data: CartItemData) => {
    try {
        await CartApi.updateCart(data);
    } catch (error) {
        console.error(error);
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        resetCart: (state) => {
            state.dataStore = [];
            state.lengthProduct = 0;
        },
        addToCart: (state, action: PayloadAction<CartItemData>) => {
            const { color, id, quantity } = action.payload;
            const existingProduct = state.dataStore.find(
                (item) => item.color === color && item.id === id
            );
            if (existingProduct) {
                state.lengthProduct += quantity;
                existingProduct.quantity += quantity;
            } else {
                state.dataStore.push(action.payload);
                state.lengthProduct += quantity;
            }
            if (localStorage.getItem('access_token')) updateCartAsync(action.payload);
        },
        deleteCart: (state, action: PayloadAction<CartItemData>) => {
            const { color, id } = action.payload;
            const existingProduct = state.dataStore.find(
                (item) => item.color === color && item.id === id
            );
            if (existingProduct) {
                existingProduct.quantity -= 1;
                state.lengthProduct -= 1;
            }
            if (localStorage.getItem('access_token')) updateCartAsync(action.payload);
        },
        removeCart: (state, action: PayloadAction<CartItemData>) => {
            const { color, id, quantity } = action.payload;
            const newData = { ...action.payload, quantity: 0 };

            state.dataStore = state.dataStore.filter(
                (item) => !(item.color === color && item.id === id)
            );
            state.lengthProduct -= quantity;
            if (localStorage.getItem('access_token')) updateCartAsync(newData);
        },
    },
});

export const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
