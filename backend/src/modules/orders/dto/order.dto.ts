import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsString } from "class-validator";

export class PagingOrder {
    page: number;
    limit: number;
    status: string;
}

export interface ProductItemCart {
    _id: string;
    title: string;
    price: number;
    thumb: string;
}

export interface ItemCart {
    product: ProductItemCart;
    quantity: number;
    color: string;
    _id: string;
}


export class updateStatusDto {
    @ApiProperty({ type: String, default: 'example' })
    @IsString()
    newStatus: string
}

export class DeleteMultipleProductDto {
    @ApiProperty({
        description: 'Array of product IDs to be deleted',
        type: [String],
    })
    @IsArray()
    @ArrayNotEmpty({ message: 'The array of IDs should not be empty' })
    ids: string[];
}


export class orderID {
    @ApiProperty({
        description: 'order id',
        type: String,
    })
    @IsString()
    orderID: string
}