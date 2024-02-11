import { Schema, Document } from 'mongoose';

const UserSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        mobile: {
            type: String,
            require: true,
            unique: true
        },
        avatar: String,
        address: String,
        role: {
            type: Number,
            default: 1111,
            enum: [1111, 2003]
        },
        cart: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'Product' },
                quantity: Number,
                color: String
            }
        ],
        isBlocked: {
            type: Boolean,
            default: false
        },
        refreshToken: String
    },
    { timestamps: true, collection: 'User' }
);

export { UserSchema };

export interface User extends Document {
    name: string;
    password: string;
    email: string;
    mobile: string;
    avatar: string;
    address: string;
    role: number;
    cart: [
        {
            product: string;
            quantity: number;
            color: string;
        }
    ];
    isBlocked: boolean;
    refreshToken: string;
}
