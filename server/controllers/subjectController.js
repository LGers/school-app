const apiError = require('../error/ApiError');
const { Subject } = require('../models/models');

class SubjectController {
    async getAll(req, res) {
        try {
            const items = await Subject.findAll();
            return res.json(items);
        } catch (error) {
            console.log('getAllSubject error:', error);
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
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const item = await Subject.findOne({ where: { id } });
            if (!item) {
                return next(apiError.badRequest(`No such Subject with id: ${id}`));
            }
            return res.json(item);
        } catch (error) {
            console.log('getOneSubject:', error);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { subject } = req.body;
            if (!id) {
                return next(apiError.badRequest(`No such Subject with id: ${id}`));
            }
            const item = await Subject.findOne({ where: { id } });
            if (!item) {
                return next(apiError.badRequest(`No such Subject with id: ${id}`));
            }
            const oneSubject = await Subject.findOne({ where: { subject } });
            if (oneSubject) {
                return next(apiError.forbidden(`Error. Subject already exist`));
            }
            const updatedItem = await item.update({ subject, where: { id } });
            return res.json(updatedItem);
         } catch (error) {
            console.log('updateSubject error:', error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const item = await Subject.findOne({ where: { id } });
            if (!item) {
                return next(apiError.badRequest(`No such Subject with id: ${id}`));
            }
            await Subject.destroy({ where: { id } });
            return res.json({ message: 'Subject deleted', id });
        } catch (error) {
            console.log('deleteSubject error:', error);
        }
    }
}

module.exports = new SubjectController();