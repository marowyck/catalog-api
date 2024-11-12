import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Catalog from '../models/Catalog';

export const createCatalog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, user, products } = req.body;

        const catalog = new Catalog({
            _id: new mongoose.Types.ObjectId(),
            name,
            user,
            products: products || []
        });

        const savedCatalog = await catalog.save();
        res.status(201).json({ catalog: savedCatalog });
    } catch (error) {
        next(error); 
    }
};

export const readCatalog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const catalogId = req.params.catalogId;

        const catalog = await Catalog.findById(catalogId)
            .populate('user')
            .populate('products');

        if (catalog) {
            res.status(200).json({ catalog });
        } else {
            res.status(404).json({ message: 'Catalog not found' });
        }
    } catch (error) {
        next(error); 
    }
};

export const readAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const catalogs = await Catalog.find()
            .populate('user')
            .populate('products');
        res.status(200).json({ catalogs });
    } catch (error) {
        next(error); 
    }
};

export const updateCatalog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const catalogId = req.params.catalogId;
        const { name, products } = req.body;

        const catalog = await Catalog.findById(catalogId);

        if (catalog) {
            catalog.name = name || catalog.name;
            if (products) {
                catalog.products = products;
            }

            const updatedCatalog = await catalog.save();
            res.status(200).json({ catalog: updatedCatalog });
        } else {
            res.status(404).json({ message: 'Catalog not found' });
        }
    } catch (error) {
        next(error); 
    }
};

export const deleteCatalog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const catalogId = req.params.catalogId;

        const catalog = await Catalog.findByIdAndDelete(catalogId);

        if (catalog) {
            res.status(200).json({ message: 'Catalog deleted successfully' });
        } else {
            res.status(404).json({ message: 'Catalog not found' });
        }
    } catch (error) {
        next(error); 
    }
};

export default { createCatalog, readCatalog, readAll, updateCatalog, deleteCatalog };
