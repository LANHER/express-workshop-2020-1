const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/",(req, res, next)=>{
    return res.status(200).send(req.body);
});

pokemon.get('/', async(req, res, next)=>{
    const pkmn = await db.query("SELECT* FROM pokemon");
    return res.status(200).json({code: 1, message:pkmn});
});

pokemon.get('/:id([0-9]{1,3})', async(req, res, next)=>{
    const id = req.params.id;
    if (id >= 1 && id <= 722){ 
        const pkmn= await db.query("SELECT * FROM pokemon WHERE pok_id="+id+";");
        return res.status(200).json({code:1, message:pkmn});
    }
    return res.status(404).send({code:404, message:"Pokémon No encontrado"});   
});

    pokemon.get('/:name([A-Za-z]+)',(req, res, next)=>{
    const name = req.params.name;

    const pkmn = pk.filter((p) =>{
        return (p.name.toUpperCase()== name.toUpperCase()) && p;
    });

    (pkmn.length >0) ?
     res.status(200).send({code:1, message:pkmn}): 
     res.status(404).send({code:404, message:"Pokémon No encontrado"});

});

module.exports = pokemon;