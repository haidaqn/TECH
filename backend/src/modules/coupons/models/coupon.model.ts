import { Schema, Document } from 'mongoose';

const CouponSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            uppercase: true
        },
        discount: {
            type: Number,
            required: true
        },
        expire: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true,
        collection: 'Coupon'
    }
);

export { CouponSchema };

export interface Coupon extends Document {
    name: string;
    discount: number;
    expire: Date;
}
