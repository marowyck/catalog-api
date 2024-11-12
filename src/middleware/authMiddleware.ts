import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não encontrado.' });
    }

    jwt.verify(token, config.jwt.secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado.' });
        }
        
        req.user = decoded;
        next();
    });
};
