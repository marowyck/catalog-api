import { Request, Response, NextFunction } from 'express';

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
    if (error.isJoi) {
        res.status(422).json({ error: error.details[0].message });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};