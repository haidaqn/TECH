import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponSchema } from './models/coupon.model';
import { CouponRepository } from './repositories/categories.repository';
import { CouponService } from './services/coupon.service';
import { CouponController } from './controllers/coupon.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Coupon', schema: CouponSchema }])],
    controllers: [CouponController],
    providers: [CouponService, CouponRepository],
    exports: []
})
export class CouponModule {}
