const Router = require('express');
const router = new Router();
const dishController = require('../controllers/dishController');

router.post('/', dishController.createDish);
router.get('/', dishController.getAllDish);
router.delete('/', dishController.deleteDish);
router.get('/:id', dishController.getOneDish);

module.exports = router;
