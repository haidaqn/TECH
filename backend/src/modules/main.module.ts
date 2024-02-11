import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BrandModule } from './brand/brand.module';
import { EmailModule } from './email/email.module';
import { UserModule } from './user/user.module';
import { CategoriesModule } from './categories/categories.module';
import { CouponModule } from './coupons/coupon.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './orders/orders.module';
import { IsAdminMiddleware, VerifyAccessTokenMiddleware } from 'src/shared/middlewares/verifyAccessToken.middleware';

@Module({
    imports: [
        BrandModule,
        EmailModule,
        UserModule,
        CategoriesModule,
        CouponModule,
        ProductModule,
        OrderModule,
        JwtModule.register({ secret: 'khoalahaidang2003x@@@@@abc' })
    ],
    providers: [],
    controllers: []
})
export class MainModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(VerifyAccessTokenMiddleware, IsAdminMiddleware)
            .forRoutes(
                'brand/createBrand',
                'brand/delete/:id',
                'brand/update/:id',
                'categories/createCategories',
                'categories/delete/:id',
                'categories/update/:id',
                'coupon/createCoupon',
                'coupon/delete/:id',
                'coupon/update/:id',
                'product/createProduct',
                'product/delete/:id',
                'product/update/:id',
                'user/getAll',
                'user/block/:id',
                'user/delete',
                'order/admim/getAll',
                'order/updateStatus/:oid'
            );
        consumer.apply(VerifyAccessTokenMiddleware).forRoutes('order/user/getAll', 'order/createOrder');
    }
}
