import { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';  

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
    Logging.error(error); 

    if (error.isJoi) {
        res.status(422).json({
            error: 'Validation Error',
            message: error.details[0].message 
        });
    } else if (error instanceof Error) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message  
        });
    } else {
        res.status(500).json({
            error: 'Unknown Error',
            message: 'An unknown error occurred'  
        });
    }
};
