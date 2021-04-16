const express = require('express');
const parser = require('body-parser');
const router = express.Router();


// parsage json

router.use(express.json());

//   middleware pour le header
router.use((req, res, next)=> {
    console.log('requete recue');

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();
});


// retourne la liste de ttes les sauces
router.get('/', (req, res)=>{
    console.log('GET');
    res.status(200).json({msg: 'GET'});
});

// renvoie la sauce avec l'id
router.get('/:id', (req, res)=>{
    console.log('GET ' + req.params.id);

    res.status(200).json({msg: 'GET ' + req.params.id});
});


// ajoute une sauce {sauce: 'nom', image: 'url'} renvoie {message: 'chaine'}
router.post('/',(req, res)=>{
    console.log('POST ' + req.body.sauce);

    res.status(200).json(req.body);
});


// modifie la sauce avec l'id fournit body {sauce: 'nom', image: 'url'} renvoie {message: 'chaine'}
router.put('/:id', (req, res)=>{
    console.log('PUT ' + req.params.id);

    res.status(200).json({msg: 'PUT'});
});

// supprime la sauce                  renvoie {message: 'chaine'}
router.delete('/:id', (req, res)=>{
    console.log('DELETE ' + req.params.id);

    res.status(200).json({msg: 'DELETE'});
});

//   j'aime j'aime pas la sauce avec id  {userId: 'chaine', j'aime: 'nombre'} renvoie {message: 'chaine'}

router.post('/:id/like', (req, res)=>{
    console.log('POST LIKE ' + req.params.id);

    res.status(200).json({msg: 'POST LIKE'});
});


// gestion erreur
router.use((err, req, res, next)=>{
    res.status(500).send('une erreur');
});

module.exports = router;