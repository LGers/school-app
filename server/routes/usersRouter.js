const Router = require('express');
const router = new Router;
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', usersController.signUp);
router.get('/users', authMiddleware, usersController.getAllUsers);
router.get('/users/:id', authMiddleware, usersController.getOneUser);
router.put('/users/:id', authMiddleware, usersController.updateUser);
router.delete('/users/:id', authMiddleware, usersController.deleteUser);

router.post('/signin', usersController.signIn);
router.get('/auth', authMiddleware, usersController.check);

module.exports = router;
