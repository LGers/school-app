const Router = require('express');
const router = new Router();
const usersRouter = require('./usersRouter');
const classesRouter = require('./classesRouter');
const markRouter = require('./markRouter');
const subjectRouter = require('./subjectRouter');

router.use('/', usersRouter);
router.use('/', classesRouter);
router.use('/', markRouter);
router.use('/', subjectRouter);

module.exports = router;
