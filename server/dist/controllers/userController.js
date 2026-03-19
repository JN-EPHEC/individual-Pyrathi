import User from "../models/User.js";
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const createUser = async (req, res) => {
    try {
        const { nom, prenom } = req.body;
        const newUser = await User.create({ nom, prenom });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id: id } });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom } = req.body;
        await User.update({ nom, prenom }, { where: { id: id } });
        const updatedUser = await User.findByPk(id);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
