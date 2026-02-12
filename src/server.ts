import express from 'express'
import userRoutes from './routes/userRoutes';
import sequelize from './config/database';
import User from './models/User';
import path from 'path';
import { fileURLToPath } from 'url';



const app=express();
const port=3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use('/api/users', userRoutes);


sequelize.sync({ force: false }) // force: false évite de supprimer les données à chaque redémarrage
    .then(() => {
        console.log('Connexion à la base de données réussie et modèles synchronisés');
        
        // On ne lance l'écoute du serveur que si la DB est prête
        app.listen(port, () => {
            console.log(`Serveur lancé sur http://localhost:${port}`);
        });
    })
app.get('/api/data',(req,res)=>{
    const etudiants = [
{ id: 1, nom: "Dupont", prenom: "Jean" },
{ id: 2, nom: "Martin", prenom: "Sophie" },
{ id: 3, nom: "Doe", prenom: "John" },
];
    res.json(etudiants);
});

app.get('/api/hello/:name',(req,res)=>{
    const nom = req.params.name;
    const timestamp = new Date().toISOString();
    res.json({ "message": `Bonjour ${nom}`, "timestamp": timestamp });
});









