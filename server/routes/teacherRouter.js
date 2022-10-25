const Router = require('express');
const router = new Router;
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middleware/authMiddleware');

const ROUTE_NAME = '/teachers';

router.post(`${ROUTE_NAME}`, authMiddleware, teacherController.create);
router.get(`${ROUTE_NAME}`, authMiddleware, teacherController.getAll);
router.get(`${ROUTE_NAME}/:id`, authMiddleware, teacherController.getOne);
router.put(`${ROUTE_NAME}/:id`, authMiddleware, teacherController.update);
router.delete(`${ROUTE_NAME}/:id`, authMiddleware, teacherController.delete);

module.exports = router;
