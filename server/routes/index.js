const Router = require('express');
const router = new Router();
const usersRouter = require('./usersRouter');
const classesRouter = require('./classesRouter');
const markRouter = require('./markRouter');

router.use('/', usersRouter);
router.use('/', classesRouter);
router.use('/', markRouter);

module.exports = router;
