import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
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
        create: Joi.object({
            name: Joi.string().required()  
        }),
        update: Joi.object({
            name: Joi.string().required()  
        })
    },
    product: {
        create: Joi.object({
            catalog: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/) 
                .required(),
            title: Joi.string().required(), 
            description: Joi.string().optional(), 
            price: Joi.number().required(), 
            stockQuantity: Joi.number().required() 
        }),
        update: Joi.object({
            catalog: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .optional(),  
            title: Joi.string().optional(),
            description: Joi.string().optional(),
            price: Joi.number().optional(),
            stockQuantity: Joi.number().optional()
        })
    }
};
