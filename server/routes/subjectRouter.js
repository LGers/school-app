const Router = require('express');
const router = new Router;
const subjectController = require('../controllers/subjectController');
const authMiddleware = require('../middleware/authMiddleware');

const ROUTE_NAME = '/subjects';

router.post(`${ROUTE_NAME}`, authMiddleware, subjectController.create);
router.get(`${ROUTE_NAME}`, authMiddleware, subjectController.getAll);
router.get(`${ROUTE_NAME}/:id`, authMiddleware, subjectController.getOne);
router.put(`${ROUTE_NAME}/:id`, authMiddleware, subjectController.update);
router.delete(`${ROUTE_NAME}/:id`, authMiddleware, subjectController.delete);

module.exports = router;
