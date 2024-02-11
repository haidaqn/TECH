import { HttpStatus, Injectable } from '@nestjs/common';
import { CouponDto } from '../dto/coupon.dto';
import { CouponRepository } from '../repositories/categories.repository';

@Injectable()
export class CouponService {
    constructor(private readonly couponRepository: CouponRepository) {}

    async GetAllCoupon(page: number, limit: number) {
        const count = await this.couponRepository.countDocuments({});
        const count_page = (count / limit).toFixed();
        const data = await this.couponRepository.getByCondition({}, null, {
            sort: { _id: -1 },
            skip: (page - 1) * limit,
            limit: Number(limit)
        });
        return {
            data,
            current_page: page,
            count_page
        };
    }

    async GetCouponById(id: string) {
        const coupont = await this.couponRepository.findById(id);
        return {
            data: coupont ? coupont : null,
            success: coupont ? true : false,
            status: coupont ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
            message: coupont ? 'Coupon found' : 'Coupon not found'
        };
    }

    async CreateCoupon(data: CouponDto) {
        const existingCoupon = await this.couponRepository.findByCoupon(data.name);
        if (existingCoupon)
            return {
                data: null,
                success: false,
                status: HttpStatus.BAD_REQUEST,
                message: 'Creating a new coupon failed'
            };
        const response = await this.couponRepository.create(data);
        return {
            data: response ? response : null,
            success: response ? true : false,
            status: response ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
            messgae: response ? 'Successfully created new coupon' : 'Creating a new coupon failed'
        };
    }

    async UpdateCoupon(id: string, data: CouponDto) {
        const existingCoupon = await this.couponRepository.findById(id);
        if (!existingCoupon) return { data: null, success: false };
        const response = await this.couponRepository.findByIdAndUpdate(id, data);
        return {
            data: response ? response : null,
            success: response ? true : false,
            status: response ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
            messgae: response ? 'Successfully update coupon' : 'update a coupon failed'
        };
    }

    async DeleteCoupon(id: string) {
        const response = await this.couponRepository.deleteOne(id);
        return {
            data: response ? response : null,
            success: response ? true : false,
            status: response ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
            messgae: response ? 'Successfully delete coupon' : 'Delete a coupon failed'
        };
    }
}
