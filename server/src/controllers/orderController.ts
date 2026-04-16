import { Request, Response } from 'express';
import { OrderManager } from '../services/orderManager.ts';

const orderManager = new OrderManager();

export const handleOrder = async (req: Request, res: Response) => {
    try {
        // Le contrôleur ne fait aucun calcul, il passe juste les données au service
        const total = orderManager.processOrder(req.body.customer, req.body.product, req.body.quantity, req.body.discount);
        res.status(200).json({ message: "Commande réussie", total });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};