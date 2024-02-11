import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './models/order.model';
import { OrderRepository } from './repositories/coupon.repository';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { UserModule } from '../User/user.module';
import { ProductModule } from '../Product/product.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
        forwardRef(() => UserModule),
        forwardRef(() => ProductModule)
    ],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository],
    exports: []
})
export class OrderModule {}
