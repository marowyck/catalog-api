import mongoose, { Document, Schema } from 'mongoose'

export interface Catalog {
    name: string;
}

export interface CatalogModel extends Catalog, Document {}

const CatalogSchema: Schema = new Schema(
    {
        name: { type: String, required: true}
    },
    {
        versionKey: false
    }
);

export default mongoose.model<CatalogModel>('Catalog', CatalogSchema)