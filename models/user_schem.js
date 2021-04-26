const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');



const obj = mongoose.Schema({
    userId: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password:{type: String, required:true }
});

obj.plugin(validator);

module.exports = mongoose.model('user',obj);