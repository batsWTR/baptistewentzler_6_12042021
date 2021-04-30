
const userSchem = require('../models/user_schem');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



mongoose.connect('mongodb+srv://bawee:openclassroom@cluster0.ufsw1.mongodb.net/projet6?retryWrites=true&w=majority',  {useNewUrlParser: true, useUnifiedTopology: true});



exports.headers = (req, res, next)=>{
    console.log('requete Auth');

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();
}

// verifie les donnees et renvoie un token {email: 'chaine', password: 'chaine'} renvoie {userId: 'chaine', token: 'chaine'}
exports.login = (req, res, next)=>{
    console.log('login');

    // regarde si email existe dans la base
    userSchem.findOne({email: req.body.email}, (err,obj)=>{
        if(!obj){
            return res.status(418).json({message: 'Email inconnu'});
        }

        bcrypt.compare(req.body.password, obj.password, (err,result)=>{
            if(!result){
                return res.status(418).json({message: 'mot de passe non valide'});
            }
            res.status(200).json({userId: obj.userId, token: jwt.sign({userId: obj.userId}, 'secret_key', {expiresIn: '2h'})});
        });
        
    });

        
    
}

// ajout  utilisateur a la db  {email: 'chaine', password: 'chaine'} renvoie {message: 'chaine'}
exports.signup = (req, res, next)=>{
    console.log('signup');

    if(req.body.password.length < 4){
        return res.status(418).json({message: "Le mot de passe est trop court"});
    }

    // cryptage mot de passe
    bcrypt.hash(req.body.password, 10, (err,hash)=>{
        if(err){
            return res.status(418).json({message: err});
        }

        // crée un nouvel utilisateur
        const user = new userSchem({
        email: req.body.email,
        password: hash,
        userId: ""
        });

        console.log(user.password);
        user.userId = user._id;
        user.save().then(()=>{res.status(201).json({message: 'creation utilisateur'})}).catch((err)=>{res.status(418).json({message: err})});
    });

}

exports.error = (err,req,res,next)=>{
    console.log('ERREUR');

    res.status(418).json({message: 'ERREUR ' + err});
}

