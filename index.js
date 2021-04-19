const express = require('express');
const sauces = require('./routes/sauces');
const auth = require('./routes/auth');



const app = express();


app.use('/api/sauces', sauces);
app.use('/api/auth', auth);





app.listen(3000,() =>{
    console.log('Ecoute sur le post 3000');
});