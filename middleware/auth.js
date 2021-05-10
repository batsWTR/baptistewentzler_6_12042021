const jwt = require('jsonwebtoken');

// controle du token
DEBUG = true;

module.exports = (req,res,next)=>{
    DEBUG ? console.log('Authentification') : true;

    try{
            // recuperation du token
        const token = req.headers.authorization.split(" ");

        DEBUG ? console.log('Token recu: ' + token[1]) :true;
            
            //verification token
        const decoded = jwt.verify(token[1], 'secret_key');
        DEBUG ? console.log('UserId token: ' + decoded.userId) : true;
        DEBUG ? console.log('UserId: ' + req.body.userId) : true;
        DEBUG ? console.log('Egalité: ' + decoded.userId == req.body.userId) : true;

        next();
    }catch(err){
        DEBUG ? console.log('ERREUR authentification') : true;
        res.status(401).json({message: err});
    }
}