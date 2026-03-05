import express from 'express';
import User from '../models/User';
import * as userController from "../controllers/userController";

const router = express.Router();

/**
* @swagger
* /api/users:
*  get:
*       summary: Récupère la liste des utilisateurs
*       tags: [Users]
*       responses:
*        200:
*               description: Succès
*/
router.get("/", userController.getAllUsers);
///POST
router.post('/', async (req, res) => {
        const { nom, prenom } = req.body;
        const newUser = await User.create({ nom, prenom }); 
        res.status(201).json(newUser);
});
// DELETE /:id : Supprimer un utilisateur par son ID
router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id: id } });
});


export default router; 