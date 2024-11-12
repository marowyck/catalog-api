import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Catalog from '../models/Catalog';

export const createCatalog = async (req: Request, res: Response, next: NextFunction) => {
    const { name, user, products } = req.body;

    const catalog = new Catalog({
        _id: new mongoose.Types.ObjectId(),
        name,
        user,
        products: products || []
    });

    return catalog
        .save()
        .then((catalog) => res.status(201).json({ catalog }))
        .catch((error) => res.status(500).json({ error }));
};

export const readCatalog = async (req: Request, res: Response, next: NextFunction) => {
    const catalogId = req.params.catalogId;

    return Catalog.findById(catalogId)
        .populate('user')
        .populate('products')
        .then((catalog) =>
            catalog ? res.status(200).json({ catalog }) : res.status(404).json({ message: 'Não encontrado' })
        )
        .catch((error) => res.status(500).json({ error }));
};

export const readAll = async (req: Request, res: Response, next: NextFunction) => {
    return Catalog.find()
        .populate('user')
        .populate('products')
        .then((catalogs) => res.status(200).json({ catalogs }))
        .catch((error) => res.status(500).json({ error }));
};

export const updateCatalog = async (req: Request, res: Response, next: NextFunction) => {
    const catalogId = req.params.catalogId;
    const { name, products } = req.body;

    return Catalog.findById(catalogId)
        .then((catalog) => {
            if (catalog) {
                catalog.name = name || catalog.name;
                if (products) {
                    catalog.products = products;
                }

                return catalog
                    .save()
                    .then((catalog) => res.status(200).json({ catalog }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Não encontrado' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

export const deleteCatalog = async (req: Request, res: Response, next: NextFunction) => {
    const catalogId = req.params.catalogId;

    return Catalog.findByIdAndDelete(catalogId)
        .then((catalog) =>
            catalog ? res.status(200).json({ message: 'Deletado com sucesso' }) : res.status(404).json({ message: 'Não encontrado' })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default { createCatalog, readCatalog, readAll, updateCatalog, deleteCatalog };
