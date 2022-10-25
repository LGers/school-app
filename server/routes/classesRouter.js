const Router = require('express');
const router = new Router;
const classesController = require('../controllers/classesController');
const authMiddleware = require('../middleware/authMiddleware');

const ROUTE_NAME = '/classes';

router.post(`${ROUTE_NAME}`, authMiddleware, classesController.createClass);
router.get(`${ROUTE_NAME}`, authMiddleware, classesController.getAllClasses);
router.get(`${ROUTE_NAME}/:id`, authMiddleware, classesController.getOneClass);
router.put(`${ROUTE_NAME}/:id`, authMiddleware, classesController.updateClass);
router.delete(`${ROUTE_NAME}/:id`, authMiddleware, classesController.deleteClass);

module.exports = router;
