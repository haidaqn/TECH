import { Product } from '@/models';
import { createSlice } from '@reduxjs/toolkit';
import * as actions from './productActions';

interface InitialStateProps {
    productNew: Product[];
    productSold: Product[];
}
const initialState: InitialStateProps = {
    productNew: [],
    productSold: [],
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actions.getNewProducts.fulfilled, (state, actions) => {
            state.productNew = actions.payload.data;
        });
        builder.addCase(actions.getSoldProducts.fulfilled, (state, actions) => {
            state.productSold = actions.payload.data;
        });
    },
});

export default productSlice.reducer;
