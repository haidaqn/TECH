export interface PagingOrder {
    page: number;
    limit: number;
    status?: string;
}

export interface ProductItemOrder {
    _id: string;
    title: string;
    thumb: string;
    price: number;
}

export interface ProductItem {
    product: ProductItemOrder;
    quantity: number;
    color: string;
}

export interface ProductOrder {
    _id: string;
    products: ProductItem[];
    orderBy: string;
    status: string;
    total: number;
}
