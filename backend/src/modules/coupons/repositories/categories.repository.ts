import { BaseRepository } from 'src/shared/base/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon } from '../models/coupon.model';

@Injectable()
export class CouponRepository extends BaseRepository<Coupon> {
    constructor(
        @InjectModel('Coupon')
        private readonly couponRepository: Model<Coupon>
    ) {
        super(couponRepository);
    }

    async countDocuments(filter?: any) {
        return await this.couponRepository.countDocuments(filter);
    }

    async findByCoupon(name: string) {
        return await this.couponRepository.findOne({
            name
        });
    }
}
