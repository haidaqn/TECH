import { Schema, Document } from 'mongoose';

const BrandSchema = new Schema(
    {
        title: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true,
        collection: 'Brand'
    }
);

export { BrandSchema };

export interface Brand extends Document {
    title: String;
}
