import mongoose, { Document, Schema } from 'mongoose';

export interface Product {
    title: string;
    catalog: string;
}

export interface ProductModel extends Product, Document {}

const ProductSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        catalog: { type: Schema.Types.ObjectId, required: true, ref: 'Catalog' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<ProductModel>('Product', ProductSchema);