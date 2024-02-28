export interface CartItemData {
    id: string;
    title: string;
    quantity: number;
    price: number;
    img: string;
    color: string;
    add: boolean;
}


export interface CartUser {
    product: ProductCart;
    quantity: number;
    color: string;
    _id: string;
}

export interface ProductCart {
    _id: string;
    title: string;
    thumb: string;
    price: number;
}