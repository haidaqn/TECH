export interface FilterDto {
    propertyName: string;
    value: any;
    comparision: number;
    filterType?: number;
}

export class BaseFilterDto {
    filterItems?: FilterDto[];
    skipCount?: number;
    maxResultCount?: number;
    searchText?: string;
    sort: string;
    sortDirection: number;
}

export class BaseResponseDto<T> {
    data: T;
    message: string;
    status: number;
    success: boolean;
}
