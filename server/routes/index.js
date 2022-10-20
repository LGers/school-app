const Router = require('express');
const router = new Router();
const usersRouter = require('./usersRouter');
const classesRouter = require('./classesRouter');

router.use('/', usersRouter);
router.use('/', classesRouter);

module.exports = router;
