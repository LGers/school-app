const apiError = require('../error/ApiError');
const { Subject } = require('../models/models');

const INTERNAL_ERROR = 'Internal error.';

class SubjectController {
  async getAll(req, res, next) {
    try {
      const items = await Subject.findAll();

      return res.json(items);
    } catch (error) {
      console.log('getAllSubject error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async create(req, res, next) {
    try {
      const { subject } = req.body;

      if (!subject) {
        return next(apiError.badRequest(`Error. Bad request`));
      }

      const oneSubject = await Subject.findOne({ where: { subject } });

      if (oneSubject) {
        return next(apiError.forbidden(`Error. Subject already exist`));
      }

      const createdSubject = await Subject.create({ subject });

      return res.json(createdSubject);
    } catch (error) {
      console.log('createSubject error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const item = await Subject.findOne({ where: { id } });

      if (!item) {
        return next(apiError.badRequest(`Subject with id: ${id} not found`));
      }

      return res.json(item);
    } catch (error) {
      console.log('getOneSubject:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { subject } = req.body;

      if (!id) {
        return next(apiError.badRequest(`Subject with id: ${id} not found`));
      }

      const item = await Subject.findOne({ where: { id } });

      if (!item) {
        return next(apiError.badRequest(`Subject with id: ${id} not found`));
      }

      const oneSubject = await Subject.findOne({ where: { subject } });

      if (oneSubject) {
        return next(apiError.forbidden(`Error. Subject already exist`));
      }

      const updatedItem = await item.update({ subject, where: { id } });

      return res.json(updatedItem);
    } catch (error) {
      console.log('updateSubject error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const item = await Subject.findOne({ where: { id } });

      if (!item) {
        return next(apiError.badRequest(`Subject with id: ${id} not found`));
      }

      await Subject.destroy({ where: { id } });

      return res.json({ message: 'Subject deleted successfully', id });
    } catch (error) {
      console.log('deleteSubject error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }
}

module.exports = new SubjectController();
