const Router = require('express');
const router = new Router;
const scheduleController = require('../controllers/scheduleController');
const authMiddleware = require('../middleware/authMiddleware');

const ROUTE_NAME = '/schedules';

router.post(`${ROUTE_NAME}`, authMiddleware, scheduleController.create);
router.get(`${ROUTE_NAME}`, authMiddleware, scheduleController.getAll);
router.get(`${ROUTE_NAME}/:classId`, authMiddleware, scheduleController.getOneClassSchedule);
router.get(`${ROUTE_NAME}/:classId/:weekDay`, authMiddleware, scheduleController.getOneClassWeekScheduleByWeekDay);
router.put(`${ROUTE_NAME}/:id`, authMiddleware, scheduleController.updateSchedule);
router.delete(`${ROUTE_NAME}/:id`, authMiddleware, scheduleController.delete);

module.exports = router;
