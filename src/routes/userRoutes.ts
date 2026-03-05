import express from 'express';
import User from '../models/User';
import * as userController from "../controllers/userController";
import { checkIdParam } from "../middlewares/checkIdParam";

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
router.get("/:id",checkIdParam, userController.getAllUsers);
/**
 * @swagger
 * /api/users:
 * post:
 * summary: Crée un nouvel utilisateur
 * tags: [Users]
 */
router.post('/:id',checkIdParam, userController.createUser);
/**
 * @swagger
 * /api/users/{id}:
 * delete:
 * summary: Supprime un utilisateur par son ID
 * tags: [Users]
 */
router.delete('/:id', checkIdParam,userController.deleteUser);


export default router; 