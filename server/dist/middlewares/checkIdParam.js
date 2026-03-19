export const checkIdParam = (req, res, next) => {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({
            message: "Mauvaise requête : l'ID doit être un nombre entier valide."
        });
    }
    next();
};
