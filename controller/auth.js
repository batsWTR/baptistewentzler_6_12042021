
const userSchem = require('../models/user_schem');
const mongoose = require('mongoose');


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

    res.status(200).json({message: 'login'});
}

// ajout l utilisateur a la db  {email: 'chaine', password: 'chaine'} renvoie {message: 'chaine'}
exports.signup = (req, res, next)=>{
    console.log('signup');

    // enregistre un nouvel utilisateur dans la db
    const user = new userSchem({
        email: req.body.email,
        password: req.body.password,
        userId: ""
    });

    console.log(user.email + ' - ' + user.password);
    
    user.userId = user._id;
    user.save().then(()=>{res.status(201).json({msg: 'creation user'})}).catch((err)=>{res.status(400).json({msg: err})});


}

