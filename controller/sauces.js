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
    sauces_schem.find().then(sauces =>{
        console.log(sauces);
        res.status(200).json(sauces);
    })
    .catch((err)=> {res.status(418).json({message: err})});

}

// renvoie la sauce avec l'id
exports.getSauce = (req,res)=>{
    console.log('GET ' + req.params.id);

    sauces_schem.findById(req.params.id).then(sauce =>{
        console.log(sauce);
        res.status(200).json(sauce);
    }).catch(err => res.status(418).json({message: err}));


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
        imageUrl: req.protocol + '://' + req.get("host") + '/' +  req.file.path

    });
    console.log(sauce);
    console.log(req.file);

    sauce.save()
    .then(()=> {res.status(201).json({message: 'sauce ajoutée'})})
    .catch((err)=> {res.status(418).json({message: 'impossible d ajouter la sauce'})});

    
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
    console.log('POST LIKE ' + req.params.id + '- ' + req.body.userId +  ' - ' + req.body.like);

    sauces_schem.findById(req.params.id).then(sauce =>{

        let Liked = sauce.usersLiked;
        let Disliked = sauce.usersDisliked;

        switch (req.body.like) {
            case 1:
                if (Liked.indexOf(req.body.userId) == -1){
                    Liked.push(req.body.userId);
                    if (Disliked.indexOf(req.body.userId) != -1){
                        Disliked.splice(Disliked.indexOf(req.body.userId),1);
                    }
                    
                }
                break;
            case -1:
                if (Disliked.indexOf(req.body.userId) == -1){
                    Disliked.push(req.body.userId);
                    if (Liked.indexOf(req.body.userId) != -1){
                        Liked.splice(Liked.indexOf(req.body.userId),1);
                    }
                }
                break;
            case 0:
                Liked.indexOf(req.body.userId) != -1 ? Liked.splice(Liked.indexOf(req.body.userId),1) : console.log('')   ;
                Disliked.indexOf(req.body.userId) != -1 ? Disliked.splice(Disliked.indexOf(req.body.userId),1) : console.log('')   ;
                break;
        }

        const likes = Liked.length;
        const dislikes = Disliked.length;

        console.log(sauce);

        sauces_schem.updateOne({_id: req.params.id},{
            likes: likes,
            dislikes: dislikes,
            usersLiked: Liked,
            usersDisliked: Disliked

        }, (err,nb) => { console.log(nb)});

        res.status(200).json({message: 'like modifié'});
    }).catch(err => res.status(418).json({message: err}));

}

// gestion erreur
exports.error = (err,req,res,next)=>{
    res.status(400).json({message: err});
}