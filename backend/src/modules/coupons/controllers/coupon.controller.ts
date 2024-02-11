import { Body, Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common';
import { CouponDto, PaginationCouponDto } from '../dto/coupon.dto';
import { CouponService } from '../services/coupon.service';

@Controller('coupon')
export class CouponController {
    constructor(private readonly couponService: CouponService) {}

    @Get('getAll')
    async getAllCoupon(@Query() { page, limit }: PaginationCouponDto) {
        return await this.couponService.GetAllCoupon(page, limit);
    }

    @Get(':id')
    async getCouponById(@Param('id') id: string) {
        return await this.couponService.GetCouponById(id);
    }

    @Get('createCoupon')
    async createCoupon(data: CouponDto) {
        return await this.couponService.CreateCoupon(data);
    }

    @Delete('delete/:id')
    async deleteCoupon(@Param('id') id: string) {}

    @Patch('update/:id')
    async updateCoupon(@Param('id') id: string, @Body() data: CouponDto) {
        return await this.couponService.UpdateCoupon(id, data);
    }
}
