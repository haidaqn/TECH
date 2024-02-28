import axios from 'axios';
import { CreateProduct, PageConfig } from '../models';
import axiosClient from './axiosClient';
const adminApi = {
    getAllUser(page: PageConfig) {
        const url = `user/getAll?page=${page.pageIndex + 1}&limit=${page.pageSize}`;
        return axiosClient.get(url);
    },
    getPagingOrder(page: PageConfig) {
        const url = `order/admin/getAll?page=${page.pageIndex + 1}&limit=${page.pageSize}`;
        return axiosClient.get(url);
    },

    getDetailOrder(orderID:string) {
        const url = `order/detail/${orderID}`
        return axiosClient.get(url);
    },

    hello() {
        const url = 'brand/hello';
        return axiosClient.get(url);
    },
    getAllCategories() {
        const url = `categories/getAll?limit=20&page=1`;
        return axiosClient.get(url);
    },

    deleteUser(data: [string]) {
        const url = 'user/delete';
        return axiosClient.delete(url, { data });
    },

    getPagingProduct(page: PageConfig) {
        const url = `product/getAll?page=${page.pageIndex + 1}&limit=${page.pageSize}`;
        return axiosClient.get(url);
    },
    updateIsBlockUser(isBlocked: boolean, idUser: string) {
        const url = `user/block/${idUser}`;
        return axiosClient.post(url, { block: isBlocked });
    },
    updateStatusOrder(orderId: string, newStatus: string) {
        const url = `order/updateStatus/${orderId}`;
        return axiosClient.post(url, { newStatus });
    },
    getUploadImages(images: FormData) {
        const url = `https://api.cloudinary.com/v1_1/drussspqf/image/upload`;
        return axios.post(url, images);
    },
    createProduct(data: CreateProduct) {
        const url = 'product/create';
        return axiosClient.post(url, data);
    },

    deleteProduct(data: string[]) {
        const url = 'product/delete';
        return axiosClient.delete(url, { data: data });
    },

    getProduct(id: string) {
        const url = `product/${id}`;
        return axiosClient.get(url);
    },
    upDateProduct(pid: string, data: CreateProduct) {
        const url = `product/update/${pid}`;
        return axiosClient.patch(url, data);
    }
};

export default adminApi;
