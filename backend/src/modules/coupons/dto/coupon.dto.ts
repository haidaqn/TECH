import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CouponDto {
    @ApiProperty({ type: String, default: 'name example' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ type: Number, default: 10 })
    @IsNumber()
    @IsNotEmpty()
    discount: number;

    @ApiProperty({ type: Date, default: 'date' })
    @IsDate()
    @IsNotEmpty()
    expire: Date;
}
export class PaginationCouponDto {
    @IsNotEmpty()
    page: number;
    @IsNotEmpty()
    limit: number;
}
