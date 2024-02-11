import axiosClient from './axiosClient';
import { QuerryProduct, CreateComment } from '@/models';
import queryString from 'query-string';

const ProductApi = {
    getProduct(query: QuerryProduct) {
        const { page, limit, title, priceTo, priceEnd, sold, color, category } = query;
        const queryParams = {
            page,
            limit,
            title,
            priceTo,
            priceEnd,
            sold,
            color,
            category,
        };
        const validQueryParams = queryString.stringify(queryParams, {
            skipNull: true,
            skipEmptyString: true,
        });
        const url = `product/getAll?${validQueryParams}`;
        return axiosClient.get(url);
    },
    getDetailProduct(id: string) {
        const url = `product/${id}`;
        return axiosClient.get(url);
    },
    createComment(data: CreateComment) {
        const url = 'product/updateRating';
        return axiosClient.post(url, data);
    },
};
export default ProductApi;
