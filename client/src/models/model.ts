export interface BaseModel<T> {
    count_page: number;
    current_page: number;
    data: T[];
}

export interface TypeTime {
    hour: number;
    minutes: number;
    seconds: number;
}
