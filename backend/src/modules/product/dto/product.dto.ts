import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class ProductDto {
    @ApiProperty({ description: 'The title of the product' })
    @IsNotEmpty({ message: 'Title is required' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'The description of the product' })
    @IsNotEmpty({ message: 'Description is required' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'The brand of the product' })
    @IsNotEmpty({ message: 'Brand is required' })
    @IsString()
    brand: string;

    @ApiProperty({ description: 'The price of the product', type: Number })
    @IsNotEmpty({ message: 'Price is required' })
    @IsNumber()
    price: number;

    @ApiProperty({ description: 'The category of the product' })
    @IsNotEmpty({ message: 'Category is required' })
    @IsString()
    category: string;

    @ApiProperty({ description: 'The thumbnail image URL of the product' })
    @IsNotEmpty({ message: 'Thumbnail image URL is required' })
    @IsString()
    thumb: string;
}

export class deleteMutipleProduct {
    @ApiProperty({
        description: 'Array of product IDs to be deleted',
        type: [String],
    })
    @IsArray()
    ids: string[];
}
export class PaginationProductDto {
    @IsNotEmpty()
    page: number;
    @IsNotEmpty()
    limit: number;

    title: string;
    category: string;
    priceTo: number;
    priceEnd: number;
    color: string;
    sold: boolean;
    search: string;
}

export interface ProductUpdateSold {
    _id: string;
    sold: number;
}

export class Comment {
    @ApiProperty({
        description: 'Star rating of the product',
        minimum: 1,
        maximum: 5,
        example: 4,
    })
    @IsNumber()
    @Min(1, { message: 'Star rating must be at least 1' })
    @Max(5, { message: 'Star rating cannot be more than 5' })
    star: number;

    @ApiProperty({
        description: 'Comment text',
        example: 'Great product!',
    })
    @IsNotEmpty({ message: 'Comment cannot be empty' })
    @IsString()
    comment: string;

    @ApiProperty({
        description: 'ID of the product being commented on',
        example: 'a3e1f6e0-4c12-11ec-81d3-0242ac130003',
    })
    @IsNotEmpty({ message: 'Product ID is required' })
    idProduct: string;
}