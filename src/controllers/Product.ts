import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product';

const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { catalog, title } = req.body;

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        catalog,
        title
    });

    try {
        const savedProduct = await product.save();
        res.status(201).json({ product: savedProduct });
    } catch (error) {
        next(error); 
    }
};

const readProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const productId = req.params.productId;

    try {
        const product = await Product.findById(productId).populate('catalog');
        if (product) {
            res.status(200).json({ product });
        } else {
            res.status(404).json({ message: 'Produto não encontrado' });
        }
    } catch (error) {
        next(error);
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const productId = req.params.productId;

    try {
        const product = await Product.findById(productId);
        if (product) {
            product.set(req.body);
            const updatedProduct = await product.save();
            res.status(200).json({ product: updatedProduct });
        } else {
            res.status(404).json({ message: 'Produto não encontrado' });
        }
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const productId = req.params.productId;

    try {
        const product = await Product.findByIdAndDelete(productId);
        if (product) {
            res.status(200).json({ product, message: 'Produto deletado' });
        } else {
            res.status(404).json({ message: 'Produto não encontrado' });
        }
    } catch (error) {
        next(error);
    }
};

export default { createProduct, readProduct, readAll, updateProduct, deleteProduct };
