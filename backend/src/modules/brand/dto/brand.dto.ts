import { IsNotEmpty } from 'class-validator';

export class BrandDto {
    @IsNotEmpty()
    title: string;
}

export class PaginationBrandDto {
    @IsNotEmpty()
    page: number;
    @IsNotEmpty()
    limit: number;
}
