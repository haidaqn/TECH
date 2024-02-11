export type PageConfig = {
    pageSize: number;
    pageIndex: number;
};

export interface ListResponse {
    current_page: number;
    count_page: number;
    data: any;
}
