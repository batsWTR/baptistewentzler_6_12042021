const express = require('express');
const parser = require('body-parser');
const saucesCtrl = require('../controller/sauces');
const auth = require('../middleware/auth');
const upload_file = require('../middleware/upload');

const router = express.Router();


// parsage json
router.use(express.json());
router.use(saucesCtrl.header);
router.get('/',auth, saucesCtrl.getSauces);
router.get('/:id', saucesCtrl.getSauce);
router.post('/',auth,  upload_file, saucesCtrl.postSauce);
router.put('/:id', saucesCtrl.putSauce);
router.delete('/:id', saucesCtrl.deleteSauce);
router.post('/:id/like', saucesCtrl.postLike);
router.use(saucesCtrl.error);

module.exports = router;