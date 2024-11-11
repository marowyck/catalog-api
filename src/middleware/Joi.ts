import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { Catalog } from '../models/Catalog';
import { Product } from '../models/Product';
import Logging from '../library/Logging';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            Logging.error(error);
            next(error);  
        }
    };
};

export const Schemas = {
    catalog: {
        create: Joi.object<Catalog>({
            name: Joi.string().required()
        }),
        update: Joi.object<Catalog>({
            name: Joi.string().required()
        })
    },
    product: {
        create: Joi.object<Product>({
            catalog: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        }),
        update: Joi.object<Product>({
            catalog: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        })
    }
};