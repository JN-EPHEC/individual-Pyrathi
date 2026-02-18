import express from 'express';
import { Op } from 'sequelize';
import User from '../models/User';

const router = express.Router();

///GET
router.get('/',async (req,res)=> {
    const users = await User.findAll(); 
    res.json(users);

});
///POST
router.post('/', async (req, res) => {
        const { nom, prenom } = req.body;
        if (!nom || nom.length < 2) {
        return res.status(400).json({ error: "Le nom doit faire au moins 2 caractères" });
    }
        try {
        const newUser = await User.create({ nom, prenom }); 
        res.status(201).json(newUser); // 201 = Created
    } catch (e) {
        res.status(500).json({ error: "Erreur serveur" });
    }
        
});
// DELETE /:id : Supprimer un utilisateur par son ID
router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id: id } });
});

// PUT /:id : Mettre à jour un utilisateur par son ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nom, prenom } = req.body;
    if (!nom || nom.length < 2 || !prenom || prenom.length < 2) {
        return res.status(400).json({ error: "Le nom et le prénom doivent faire au moins 2 caractères" });
    }

    try {
        const [updatedRows] = await User.update({ nom, prenom }, { where: { id: id } });
        
        if (updatedRows > 0) {
            res.json({ message: "Utilisateur mis à jour avec succès" });
        } else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    } catch (e) {
        res.status(500).json({ error: "Erreur lors de la mise à jour" });
    }
});

//Filtre GET /search?nom=Dupont : Rechercher des utilisateurs par nom
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q; 
        const users = await User.findAll({
            where: {
                nom: {
                    [Op.like]: `%${query}%` 
                }
            }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la recherche" });
    }
});

export default router; 