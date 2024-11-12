import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

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

export default { createUser, readUser, readAllUsers, deleteUser };
