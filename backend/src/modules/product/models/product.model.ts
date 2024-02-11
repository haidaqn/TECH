import { Schema, Document } from 'mongoose';

const ProductSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            // required: true,
            lowercase: true
        },
        description: {
            type: [String],
            required: true
        },
        brand: String,
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 0
        },
        sold: {
            type: Number,
            default: 0
        },
        images: [String],
        thumb: {
            type: String,
            required: true
        },
        color: {
            type: [String],
            default: ['black', 'white']
        },
        ratings: [
            {
                star: Number,
                postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
                comment: String,
                updateAt: Date
            }
        ],
        totalRatings: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
        collection: 'Product'
    }
);

export { ProductSchema };
interface ProductRating {
    star: number;
    postedBy: string;
    comment: string;
    updatedAt: Date;
}
export interface Product extends Document {
    title: string;
    slug: string;
    description: string[];
    brand: string;
    price: number;
    category: string;
    quantity: number;
    sold: number;
    images: string[];
    thumb: string;
    color: string[];
    ratings: ProductRating[];
    totalRatings: string;
}
