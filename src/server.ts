import express from 'express'

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
    req.params
    res.json({ "message": "Bonjour Yves", "timestamp":"2026-01-29T12:00:19.821Z" });
});

app.listen(port, () =>{
    console.log(`Serveur lancé sur http://localhost:${port}`);
});


