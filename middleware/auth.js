const jwt = require('jsonwebtoken');

// controle du token
DEBUG = true;

module.exports = (req,res,next)=>{

    try{
        // recuperation du token
        const token = req.headers.authorization.split(" ");

        DEBUG ? console.log('Token recu: ' + token[1]) :true;
        
        //verification token
        jwt.verify(token[1], 'secret_key',(err,decoded)=>{
            if(err){
                DEBUG ? console.log('Erreur: ' + err) : true;
                return res.status(400).json({msg: err});
            }

            DEBUG ? console.log('UserId: ' + decoded.userId) : true;
            DEBUG ? console.log('Control Authentification ') : true ;
            next();
        });
    }catch{
        DEBUG ? console.log('ERREUR requete authentification') : true;
        res.status(404).json({msg: 'mauvaise requete'});
    }

    
    
}