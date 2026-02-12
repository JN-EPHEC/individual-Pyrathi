import express from 'express';
import User from '../models/User';

const router = express.Router();

///GET
router.get('/users',async (req,res)=> {
    const users = await User.findAll(); 
    res.json(users);

});
///POST
router.post('/users', async (req, res) => {
        const { nom, prenom } = req.body;
        const newUser = await User.create({ nom, prenom }); 
        res.status(201).json(newUser);
});
// DELETE /:id : Supprimer un utilisateur par son ID
router.delete('/users:id', async (req, res) => {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id: id } });
});


export default router; 