const mongoose = require('mongoose');
const sauces_schem = require('../models/sauces_schem');



//   middleware pour le header
exports.header = (req,res,next)=>{
    console.log('requete recue');

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();
}


// retourne la liste de ttes les sauces
exports.getSauces = (req,res)=>{
    console.log('GET');
    sauces_schem.find().then((sauce)=>{
        console.log(sauce);
        res.status(200).json(sauce);
    })
    .catch((err)=> {res.status(400).json({message: err})});
    //res.status(200).json({msg: 'GET'});
}

// renvoie la sauce avec l'id
exports.getSauce = (req,res)=>{
    console.log('GET ' + req.params.id);

    res.status(200).json({msg: 'GET ' + req.params.id});
}

// ajoute une sauce {sauce: 'nom', image: 'url'} renvoie {message: 'chaine'}
exports.postSauce = (req,res)=>{
    console.log('POST ');
    const objet = JSON.parse(req.body.sauce);


    const sauce = new sauces_schem({
        ...objet,
        likes: '0',
        dislikes: '0',
        userLiked: [],
        userDisliked: [],
        imageUrl: req.file.path

    });
    console.log(sauce);
    console.log(req.file);

    sauce.save()
    .then(()=> {res.status(200).json({message: 'sauce ajouté'})})
    .catch((err)=> {res.status(400).json({message: 'impossible d ajouter la sauce'})});

    
}

// modifie la sauce avec l'id fournit body {sauce: 'nom', image: 'url'} renvoie {message: 'chaine'}
exports.putSauce = (req,res)=>{
    console.log('PUT ' + req.params.id);

    res.status(200).json({msg: 'PUT'});
}


// supprime la sauce                  renvoie {message: 'chaine'}
exports.deleteSauce = (req,res)=>{
    console.log('DELETE ' + req.params.id);

    res.status(200).json({msg: 'DELETE'});
}


//   j'aime j'aime pas la sauce avec id  {userId: 'chaine', j'aime: 'nombre'} renvoie {message: 'chaine'}
exports.postLike = (req,res)=>{
    console.log('POST LIKE ' + req.params.id);

    res.status(200).json({msg: 'POST LIKE'});
}

// gestion erreur
exports.error = (err,req,res,next)=>{
    res.status(400).json({message: err});
}