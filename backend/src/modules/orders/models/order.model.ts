import { Schema, Document } from 'mongoose';

const OrderSchema = new Schema(
    {
        products: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'Product' },
                quantity: Number,
                color: String
            }
        ],
        status: {
            type: String,
            default: 'Processing',
            enum: ['Cancelled', 'Processing', 'Delivering', 'Success']
        },
        total: Number,
        coupon: {
            type: Schema.Types.ObjectId,
            ref: 'Coupon'
        },
        orderBy: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: true,
        collection: 'Order'
    }
);

export { OrderSchema };
export interface Product {
    product: string;
    quantity: number;
    color: string;
}

export interface Order extends Document {
    products: Product[];
    status: string;
    total: number;
    coupon: string;
    orderBy: string;
}
