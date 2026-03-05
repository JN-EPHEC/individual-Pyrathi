import type { Request, Response } from "express";
import User from "../models/User";
export const getAllUsers = async (req: Request, res: Response) => {
try {
const users = await User.findAll();
res.status(200).json(users);
} catch (error) {
res.status(500).json({ error: (error as any).message });
}
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { nom, prenom } = req.body;
        const newUser = await User.create({ nom, prenom });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: (error as any).message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id: id } });
        
        if (deleted) {
            res.status(204).send(); 
        } else {
            res.status(404).json({ error: (error as any).message });
        }
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};