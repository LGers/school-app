const Router = require('express');
const router = new Router;
const markController = require('../controllers/markController');
const authMiddleware = require('../middleware/authMiddleware');

const ROUTE_NAME = '/marks';

router.post(`${ROUTE_NAME}`, authMiddleware, markController.createMark);
router.get(`${ROUTE_NAME}`, authMiddleware, markController.getAllMarks);
router.get(`${ROUTE_NAME}/:id`, authMiddleware, markController.getOneMark);
router.put(`${ROUTE_NAME}/:id`, authMiddleware, markController.updateMark);
router.delete(`${ROUTE_NAME}/:id`, authMiddleware, markController.deleteMark);

module.exports = router;
