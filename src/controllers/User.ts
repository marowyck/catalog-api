import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { config } from '../config/config';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    console.log('Password:', password);

    if (!password || password.trim() === '') {
        return res.status(400).json({ message: 'Password is required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password: hashedPassword
        });

        return user
            .save()
            .then((user) => res.status(201).json({ user }))
            .catch((error) => res.status(500).json({ error }));
    } catch (error) {
        return res.status(500).json({ error: 'Error hashing password' });
    }
};

export const readUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Usuário não encontrado' })))
        .catch((error) => res.status(500).json({ error }));
};

export const readAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }));
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findByIdAndDelete(userId)
        .then((user) => (user ? res.status(200).json({ message: 'Usuário deletado com sucesso' }) : res.status(404).json({ message: 'Usuário não encontrado' })))
        .catch((error) => res.status(500).json({ error }));
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            config.jwt.secret, 
            { expiresIn: '1h' } 
        );

        res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default { createUser, readUser, readAllUsers, deleteUser, loginUser };
