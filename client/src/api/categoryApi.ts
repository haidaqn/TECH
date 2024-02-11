import axiosClient from './axiosClient';

const CategoryApi = {
    getAllCategory() {
        const url = 'categories/getAll?page=1&limit=10';
        return axiosClient.get(url);
    },
};

export default CategoryApi;
