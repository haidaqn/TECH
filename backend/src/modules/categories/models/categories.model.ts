import { Schema, Document } from 'mongoose';

const CategoriesSchema = new Schema(
    {
        title: {
            type: String,
            require: true
        },
        brand: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Brand'
            }
        ]
    },
    {
        timestamps: true,
        collection: 'Categories'
    }
);

export { CategoriesSchema };

export interface Categories extends Document {
    title: string;
    brand?: string[];
}
