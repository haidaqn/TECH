import { BaseRepository } from 'src/shared/base/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../models/order.model';

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
    constructor(
        @InjectModel('Order')
        private readonly orderModel: Model<Order>
    ) {
        super(orderModel);
    }

    async countDocuments(filter?: any) {
        return await this.orderModel.countDocuments(filter);
    }

    async findByBrand(title: string) {
        return await this.orderModel.find({
            title: title
        });
    }
}
