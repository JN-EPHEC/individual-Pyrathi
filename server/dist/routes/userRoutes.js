import express from 'express';
import * as userController from "../controllers/userController.js";
import { checkIdParam } from "../middlewares/checkIdParam.js";
const router = express.Router();
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupère la liste de tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", userController.getAllUsers);
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get("/:id", checkIdParam, userController.getUserById);
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *     required: true
 *     content:
 *     application/json:
 *     schema:
 *     $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Données manquantes ou invalides
 */
router.post('/', userController.createUser);
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Met à jour un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     schema:
 *       type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *       400:
 *         description: ID ou données invalides
 *       404:
 *         description: Utilisateur non trouvé
 */
router.put('/:id', checkIdParam, userController.updateUser);
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur par son ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Utilisateur supprimé avec succès
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete('/:id', checkIdParam, userController.deleteUser);
export default router;
