const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');

router.post('/', typeController.createType);
router.get('/', typeController.getTypes);
router.delete('/', typeController.deleteType);

module.exports = router;