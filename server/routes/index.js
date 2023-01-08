const Router = require('express');
const router = new Router();
const usersRouter = require('./usersRouter');
const classesRouter = require('./classesRouter');
const markRouter = require('./markRouter');
const subjectRouter = require('./subjectRouter');
const teacherRouter = require('./teacherRouter');
const scheduleRouter = require('./scheduleRouter');

router.use('/', usersRouter);
router.use('/', classesRouter);
router.use('/', markRouter);
router.use('/', subjectRouter);
router.use('/', teacherRouter);
router.use('/', scheduleRouter);

module.exports = router;
