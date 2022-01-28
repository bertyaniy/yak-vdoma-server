const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/auth', userController.authCheck);

module.exports = router;
