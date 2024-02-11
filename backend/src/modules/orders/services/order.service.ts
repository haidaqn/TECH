import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ProductService } from 'src/modules/Product/services/product.service';
// import { UserService } from 'src/modules/User/Services/user.service';
import { UserService } from 'src/modules/User/services/user.service';
import { ItemCart } from '../dto/order.dto';
import { OrderRepository } from '../repositories/coupon.repository';
@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly userService: UserService,
        private readonly productService: ProductService
    ) {}
    async getAllOrderByAdmin(page: number, limit: number, status: string) {
        const count = await this.orderRepository.countDocuments({});
        const count_page = (count / limit).toFixed();
        const data = await this.orderRepository.getByCondition(
            null,
            null,
            {
                sort: { _id: -1 },
                skip: (page - 1) * limit,
                limit: Number(limit)
            },
            [
                {
                    path: 'products.product',
                    select: 'title price image thumb'
                },
                {
                    path: 'orderBy',
                    select: 'name'
                }
            ]
        );
        return {
            data,
            current_page: page,
            count_page
        };
    }

    async getAllOrderByUserId(page: number, limit: number, status: string, userID: string) {
        try {
            const count = await this.orderRepository.countDocuments({ orderBy: userID });
            const count_page = Math.ceil(count / limit);
            const data = await this.orderRepository.getByCondition(
                { orderBy: userID, status },
                {},
                {
                    sort: { createdAt: -1 },
                    skip: (page - 1) * limit,
                    limit: Number(limit)
                },
                {
                    path: 'products.product',
                    select: 'title price image thumb'
                }
            );
            return {
                data,
                current_page: page,
                count_page
            };
        } catch (err) {
            console.log(err);
        }
    }

    async deleteMutipleOrder(orderIDs: string[]) {
        try {
            const validOrderIDs = orderIDs.filter((orderID) => Types.ObjectId.isValid(orderID));
            if (!validOrderIDs) throw new Error('Isvalid order Ids');
            await this.orderRepository.deleteMany(validOrderIDs);
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createOrder(userID: string, coupon?: number) {
        try {
            const userCart = (await this.userService.getCart(userID)) as unknown as ItemCart[];
            if (!userCart) throw new Error('Missing user cart');
            let total = userCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
            if (coupon) total = Math.round((total * (1 - +coupon / 100)) / 100) * 100; // 3 số cuối là 0
            const product = userCart.map((item) => ({
                product: item.product._id.toString(),
                quantity: item.quantity,
                color: item.color
            }));
            await this.orderRepository
                .create({ products: product, total, coupon, orderBy: userID })
                .then(async () => {
                    const res = await this.userService.resetCart(userID);
                    return res ? true : false;
                })
                .catch((err: any) => {
                    throw new Error(err.message);
                });
            return true;
        } catch (error) {
            console.log(error);
        }
    }
    async updateOrder(orderID: string, orderStatus: string) {
        try {
            const order = await this.orderRepository.findById(orderID);
            if (!order) throw new Error('Order is not valid');
            if (
                (order.status !== 'Processing' && orderStatus === 'Processing') ||
                order.status === 'Success' ||
                order.status === 'Cancelled'
            ) {
                throw new Error('Order error');
            }
            order.status = orderStatus;
            await order.save();
            if (orderStatus === 'Success') {
                for (const orderProduct of order.products) {
                    const { product, quantity } = orderProduct;
                    await this.productService.updateProductSold(product, quantity);
                }
            }
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
