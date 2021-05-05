const express = require('express');
const parser = require('body-parser');
const sanitize = require('express-mongo-sanitize');

const sauces = require('./routes/sauces');
const auth = require('./routes/auth');
const helmet = require('helmet');



const app = express();

app.use(helmet());
app.use(express.json());
app.use(sanitize({replaceWith: '_'}));
app.use('/images', express.static('images'));
app.use('/api/sauces', sauces);
app.use('/api/auth', auth);





app.listen(3000,() =>{
    console.log('Ecoute sur le post 3000');
});