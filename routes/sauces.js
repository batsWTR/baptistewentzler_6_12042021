const express = require('express');
const saucesCtrl = require('../controller/sauces');
const auth = require('../middleware/auth');
const upload_file = require('../middleware/upload');

const router = express.Router();



router.use(saucesCtrl.header);
router.get('/',auth, saucesCtrl.getSauces);
router.get('/:id',auth, saucesCtrl.getSauce);
router.post('/',auth,  upload_file, saucesCtrl.postSauce);
router.put('/:id',auth, upload_file, saucesCtrl.putSauce);
router.delete('/:id',auth, saucesCtrl.deleteSauce);
router.post('/:id/like',auth, saucesCtrl.postLike);
router.use(saucesCtrl.error);

module.exports = router;