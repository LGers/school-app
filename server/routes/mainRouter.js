const Router = require('express');
const router = new Router;
const mainController = require('../controllers/mainController');

router.get('/', mainController.get);

module.exports = router;
