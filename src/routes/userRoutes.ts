import express from 'express';

const router = express.Router();

router.get('/users',(req,res)=> {
    const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    ];
    res.json(users);

});

export default router; 