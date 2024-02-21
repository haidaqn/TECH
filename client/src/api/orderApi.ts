import axiosClient from './axiosClient';
import queryString from 'query-string';
import { PagingOrder } from '@/models';

const orderApi = {
    createOrder() {
        const url = 'order/createOrder';
        return axiosClient.post(url);
    },
    getOrderStatus(query: PagingOrder) {
        const { limit, page, status } = query;
        const queryParams = { page, limit, status };
        const validQueryParams = queryString.stringify(queryParams, {
            skipNull: true,
            skipEmptyString: true,
        });
        const url = `order/user/getAll?${validQueryParams}`;
        return axiosClient.get(url);
    },
    changeOrder(orderID: string) {
        const url = 'order/change-order';
        return axiosClient.post(url, { orderID });
    }
};

export default orderApi;
