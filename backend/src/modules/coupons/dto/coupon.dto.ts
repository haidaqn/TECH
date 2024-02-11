import { IsNotEmpty } from 'class-validator';

export class CouponDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    discount: number;
    @IsNotEmpty()
    expire: Date;
}
export class PaginationCouponDto {
    @IsNotEmpty()
    page: number;
    @IsNotEmpty()
    limit: number;
}
