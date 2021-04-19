const express = require('express');
const parser = require('body-parser');
const authCtrl = require('../controller/auth');
const user_schem = require('../models/user_schem');


const router = express.Router();



router.use(express.json());

router.use(authCtrl.headers);
router.post('/signup', authCtrl.signup);
router.post('/login',authCtrl.login);
router.use((err, req, res, next)=>{
    console.log('ERREUR');

    res.status(400).json({message: 'ERREUR ' + err});
})




module.exports = router;