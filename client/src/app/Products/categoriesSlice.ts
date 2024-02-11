import { createSlice } from '@reduxjs/toolkit';
import * as actions from './categoriesActions';
import { BaseModel, Categories } from '@/models';

const initialState: BaseModel<Categories> = {
    count_page: 0,
    current_page: 0,
    data: [],
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actions.getCategories.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.count_page = action.payload.count_page;
            state.current_page = action.payload.current_page;
        });
    },
});

export default categoriesSlice.reducer;
