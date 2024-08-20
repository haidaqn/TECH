import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BrandDto {
    @ApiProperty({ type: String, default: "example title" })
    @IsNotEmpty()
    title: string;
}

export class PaginationBrandDto {
    @IsNotEmpty()
    page: number;
    @IsNotEmpty()
    limit: number;
}
