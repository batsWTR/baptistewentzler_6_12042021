const express = require('express');
const parser = require('body-parser');
const sauces_schem = require('../models/sauces_schem');
const saucesCtrl = require('../controller/sauces');

const router = express.Router();


// parsage json

router.use(express.json());
router.use(saucesCtrl.header);
router.get('/', saucesCtrl.getSauces);
router.get('/:id', saucesCtrl.getSauce);
router.post('/', saucesCtrl.postSauce);
router.put('/:id', saucesCtrl.putSauce);
router.delete('/:id', saucesCtrl.deleteSauce);
router.post('/:id/like', saucesCtrl.postLike);
router.use(saucesCtrl.error);

module.exports = router;