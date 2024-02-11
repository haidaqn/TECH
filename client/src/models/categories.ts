export interface Categories {
    _id: string;
    title: string;
    brand: Brand[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Brand {
    _id: string;
    title: string;
}
