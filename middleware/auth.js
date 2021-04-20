



module.exports = (req,res,next)=>{
    console.log('Authentification');
    console.log(req.headers.authorization);
    next();
}