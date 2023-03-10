const apiError = require('../error/ApiError');
const { Teacher, Users, Subject } = require('../models/models');

const INTERNAL_ERROR = 'Internal error.';

class TeacherController {
  async getAll(req, res, next) {
    try {
      const items = await Teacher.findAll();

      return res.json(items);
    } catch (error) {
      console.log('getAllTeacher error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async create(req, res, next) {
    try {
      const { userId, subjectId } = req.body;

      if (!userId || !subjectId) {
        return next(apiError.badRequest(`Error. Bad request`));
      }

      const oneUser = await Users.findOne({ where: { id: userId } });

      if (!oneUser) {
        return next(apiError.badRequest(`Teacher with id: ${userId} not found`));
      }

      const oneSubject = await Subject.findOne({ where: { id: subjectId } });

      if (!oneSubject) {
        return next(apiError.badRequest(`Teacher with id: ${userId} not found`));
      }

      const oneTeacher = await Teacher.findOne({ where: { userId, subjectId } });

      if (oneTeacher) {
        return next(apiError.forbidden(`Error. This teacher already exist`));
      }

      await oneUser.update({ role: 'TEACHER' });
      const createdTeacher = await Teacher.create({ userId, subjectId });

      return res.json(createdTeacher);
    } catch (error) {
      console.log('createTeacher error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const item = await Teacher.findOne({ where: { id } });

      if (!item) {
        return next(apiError.badRequest(`Teacher with id: ${id} not found`));
      }

      return res.json(item);
    } catch (error) {
      console.log('getOneTeacher:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return next(apiError.badRequest(`Teacher with id: ${id} not found`));
      }

      const { subjectId } = req.body;

      if (!subjectId) {
        return next(apiError.badRequest(`Error. Bad request`));
      }

      const oneSubject = await Subject.findOne({ where: { id: subjectId } });

      if (!oneSubject) {
        return next(apiError.badRequest(`Subject with id: ${id} not found`));
      }

      const item = await Teacher.findOne({ where: { id } });

      if (!item) {
        return next(apiError.badRequest(`Teacher with id: ${id} not found`));
      }

      const oneTeacher = await Teacher.findOne({ where: { userId: item.userId, subjectId } });

      if (oneTeacher) {
        return next(apiError.forbidden(`Error. This teacher already exist`));
      }

      const updatedItem = await item.update({ subjectId });

      return res.json(updatedItem);
    } catch (error) {
      console.log('updateTeacher error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const item = await Teacher.findOne({ where: { id } });

      if (!item) {
        return next(apiError.badRequest(`Teacher with id: ${id} not found`));
      }

      await Teacher.destroy({ where: { id } });
      const oneUser = await Users.findOne({ where: { id: item.userId } });
      await oneUser.update({ role: 'USER' });

      return res.json({ message: 'Teacher deleted successfully', id });
    } catch (error) {
      console.log('deleteTeacher error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }
}

module.exports = new TeacherController();
