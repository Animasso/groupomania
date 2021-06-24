const express = require('express');
const router = express.Router();

const commentCtrl=require('../controllers/comment');
//const pour le token
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

//requete pour poster un nouvel objet avec multer pour les images
router.post('/:postId/comment', auth,commentCtrl.createComment);

//requete pour ciblé et afficher un element grace a son id
router.get('/:postId/comment/:id', auth,commentCtrl.FindOneComment);

//requete pour modifier un objet existant
router.put('/:postId/comment/:id', auth,commentCtrl.modifyComment );

//requete pour supprimer un objet existant
router.delete('/:postId/comment/:id', auth,commentCtrl.deleteComment );

module.exports = router;