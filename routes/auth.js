const express = require('express');
const parser = require('body-parser');
const user_schem = require('../models/user_schem');


const router = express.Router();



router.use(express.json());

router.use((req, res, next)=>{
    console.log('requete Auth');

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();
});


// ajout l utilisateur a la db  {email: 'chaine', password: 'chaine'} renvoie {message: 'chaine'}
router.post('/signup', (req, res)=>{
    console.log('signup');

    res.status(200).json({message: 'signup'});
});


// verifie les donnees et renvoie un token {email: 'chaine', password: 'chaine'} renvoie {userId: 'chaine', token: 'chaine'}
router.post('/login',(req, res)=>{
    console.log('login');

    res.status(200).json({message: 'login'});
});




module.exports = router;