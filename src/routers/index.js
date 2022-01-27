const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');
const dishRouter = require('./dishRouter');


router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/dish', dishRouter);

module.exports = router;