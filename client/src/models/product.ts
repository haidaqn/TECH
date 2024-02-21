export interface QuerryProduct {
    page: number;
    limit: number;
    title?: string;
    priceTo?: number;
    priceEnd?: number;
    sold?: boolean;
    color?: string;
    category?: string;
    search?: string;
}

export interface UserComment {
    name: string;
    avatar: string;
}

export interface Rating {
    star: number;
    postedBy?: UserComment;
    comment: string;
    updateAt?: string;
    _id: string;
}

export interface Product {
    color: string[];
    _id: string;
    title: string;
    slug: string;
    thumb: string;
    price: number;
    category: string;
    quantity: number;
    sold: number;
    images: string[];
    description: string[];
    totalRatings: number;
    ratings: Rating[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CreateComment {
    star: number;
    comment: string;
    idProduct: string;
}
