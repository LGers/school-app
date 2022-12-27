const apiError = require('../error/ApiError');
const { Class, Users } = require('../models/models');

const INTERNAL_ERROR = 'Internal error.';

const getOneUserData = (user) => {
  const { id, firstName, lastName, email, role } = user;

  return { id, firstName, lastName, email, role };
};

class ClassesController {
  async getAllClasses(req, res, next) {
    try {
      const classesData = await Class.findAll();
      const users = await Users.findAll();
      const classes = classesData.map((cl) => {
        const students = users.filter((u) => u.classId === cl.id);
        const oneClass = cl.dataValues;
        oneClass.students = students.map((st) => getOneUserData(st));

        return oneClass;
      });

      return res.json({ count: classesData.length, classes });
    } catch (error) {
      console.log('getAllClasses error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async createClass(req, res, next) {
    try {
      let { classNumber, classLetter } = req.body;
      classLetter = classLetter.toUpperCase();

      if (await Class.findOne({ where: { classNumber, classLetter } })) {
        return next(apiError.forbidden(`Error. Class ${classNumber}${classLetter} already exist`));
      }

      const oneClass = await Class.create({ classNumber, classLetter });

      return res.json(oneClass);
    } catch (error) {
      console.log('createClass error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async getOneClass(req, res, next) {
    try {
      const { id } = req.params;
      const students = await Users.findAll({ where: { classId: id } });
      const oneClass = await Class.findOne({ where: { id } });

      if (!oneClass) {
        return next(apiError.badRequest(`No such class with id: ${id}`));
      }

      return res.json({
        classId: id,
        classNumber: oneClass.classNumber,
        classLetter: oneClass.classLetter,
        students: students.map((st) => getOneUserData(st))
      });
    } catch (error) {
      console.log('getOneClass:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async updateClass(req, res, next) {
    try {
      const { id } = req.params;
      let oneClass = await Class.findOne({ where: { id } });

      if (!oneClass) {
        return next(apiError.badRequest(`No such class with id: ${id}`));
      }

      let { classNumber, classLetter } = req.body;
      classLetter = classLetter.toUpperCase();

      if (!classNumber && !classLetter) {
        next(apiError.badRequest(`Class number and class letter must be not empty`));
      }

      if (await Class.findOne({ where: { classNumber, classLetter } })) {
        return next(apiError.forbidden('Error. This class already exist'));
      }

      oneClass = await oneClass.update({ classNumber, classLetter, where: { id } });

      return res.json(oneClass);
    } catch (error) {
      console.log('updateClass error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async deleteClass(req, res, next) {
    try {
      const { id } = req.params;
      let cl = await Class.findOne({ where: { id } });
      if (!cl) {

        return next(apiError.badRequest(`No such class with id: ${id}`));
      }
      await Class.destroy({ where: { id } });

      return res.json({ message: 'Class deleted', id });
    } catch (error) {
      console.log('deleteClass error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }
}

module.exports = new ClassesController();
