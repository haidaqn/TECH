export type PageConfig = {
    page: number;
    limit: number;
    priceTo?: number;
    priceEnd?: number;
    color?: string[];
    category?: string;
};

export interface ListResponse {
    current_page: number;
    count_page: number;
    data: any;
}
