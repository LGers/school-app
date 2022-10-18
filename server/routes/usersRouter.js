const Router = require('express');
const router = new Router;
const usersController = require('../controllers/usersController');

router.post('/users', usersController.signUp);

module.exports = router;
