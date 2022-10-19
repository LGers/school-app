const Router = require('express');
const router = new Router;
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', usersController.signUp);
router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getOneUser);
router.put('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);

router.post('/signin', usersController.signIn);
router.get('/auth', authMiddleware, usersController.check);

module.exports = router;
