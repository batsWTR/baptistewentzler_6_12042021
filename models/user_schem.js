const mongoose = require('mongoose');




const obj = mongoose.Schema({
    userId: String,
    email: {type: String, unique: true},
    password: String
});


module.exports = mongoose.model('user_schem',obj);