import mongoose, { Document, Schema } from 'mongoose';

export interface Catalog {
    name: string;
    user: string;
    products: string[];
}

export interface CatalogModel extends Catalog, Document {}

const CatalogSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<CatalogModel>('Catalog', CatalogSchema);
