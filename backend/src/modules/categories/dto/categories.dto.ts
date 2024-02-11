import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategories {
    @IsNotEmpty()
    title: string;
    @IsOptional()
    brand: string[] | null;
}
export class PaginationCategoriesDto {
    @IsNotEmpty()
    page: number;
    @IsNotEmpty()
    limit: number;
}
