export interface RootInvoice {
    totalCount: number;
    success: boolean;
    users: Invoice[];
}

export interface Invoice {
    _id: string;
    products: ProductInvoice[];
    status: string;
    total: number;
    orderBy: OrderByUser;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface OrderByUser {
    _id: string;
    name: string;
}

export interface ProductInvoice {
    product_id: string;
    count: number;
    price: number;
    _id: string;
}
