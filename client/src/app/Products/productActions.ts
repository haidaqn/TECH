import ProductApi from '@/api/productApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BaseModel, Product } from '@/models';

export const getNewProducts = createAsyncThunk('product/newProducts', async () => {
    const response: unknown = ProductApi.getProduct({ page: 1, limit: 9 });
    const typeResponse = response as BaseModel<Product>;
    return typeResponse;
});

export const getSoldProducts = createAsyncThunk('product/soldProducts', async () => {
    const response: unknown = ProductApi.getProduct({ page: 1, limit: 9, sold: true });
    const typeResponse = response as BaseModel<Product>;
    return typeResponse;
});
