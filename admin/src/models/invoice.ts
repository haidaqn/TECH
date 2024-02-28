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


export interface DetailInvoice {
    _id: string;
    products: ProductOrder[];
    status: string;
    total: number;
    orderBy: OrderBy;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ProductOrder {
    product: Product2;
    quantity: number;
    color: string;
    _id: string;
}

export interface Product2 {
    _id: string;
    title: string;
    thumb: string;
    price: number;
}


export interface OrderBy {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    address: string;
}