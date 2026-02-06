import express from 'express'
import userRoutes from './routes/userRoutes';

const app=express();
const port=3000;
app.get('/',(req,res)=> {
    res.send("Bienvenue sur mon serveur API");
});

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

app.use('/api', userRoutes);

app.listen(port, () =>{
    console.log(`Serveur lancé sur http://localhost:${port}`);
});


