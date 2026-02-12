import express from 'express';
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
        const newUser = await User.create({ nom, prenom }); 
        res.status(201).json(newUser);
});
// DELETE /:id : Supprimer un utilisateur par son ID
router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id: id } });
});


export default router; 