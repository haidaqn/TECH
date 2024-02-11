export class PagingOrder {
    page: number;
    limit: number;
    status: string;
}

export interface ProductItemCart {
    _id: string;
    title: string;
    price: number;
    thumb: string;
}

export interface ItemCart {
    product: ProductItemCart;
    quantity: number;
    color: string;
    _id: string;
}
