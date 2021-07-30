const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id',userCtrl.getOneUser)
router.get('/',userCtrl.getAllUsers)
router.get('/:id/posts/comments',userCtrl.findPostCom);
router.put('/:id',userCtrl.updateUser)
router.delete('/:id',userCtrl.deleteUser)

module.exports = router;
