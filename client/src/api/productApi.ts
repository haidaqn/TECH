import { CreateComment, QuerryProduct } from '@/models';
import queryString from 'query-string';
import axiosClient from './axiosClient';

const ProductApi = {
    getProduct(query: QuerryProduct) {
        const { page, limit, title, priceTo, priceEnd, sold, color, category,search } = query;
        const queryParams = {
            page,
            limit,
            title,
            priceTo,
            priceEnd,
            sold,
            color,
            category,
            search,
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
