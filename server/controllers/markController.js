const apiError = require('../error/ApiError');
const { Mark, Users, Teacher, Subject } = require('../models/models');

const INTERNAL_ERROR = 'Internal error.';

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-')
  );
}

class MarkController {
  async getAllMarks(req, res, next) {
    try {
      const marks = await Mark.findAll();

      return res.json(marks);
    } catch (error) {
      console.log('getAllMarks error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async createMark(req, res, next) {
    try {
      const { mark, date, userId, teacherId, subjectId } = req.body;

      if (!mark || !date || !userId || !teacherId || !subjectId) {
        return next(apiError.badRequest(`Error. Bad request`));
      }

      if (!mark || mark < 1) {
        return next(apiError.forbidden(`Mark ${mark} is not correct`));
      }

      let item = await Users.findOne({ where: { id: userId } });

      if (!item) {
        return next(apiError.badRequest(`Error. Bad request`));
      }

      item = await Teacher.findOne({ where: { id: teacherId } });

      if (!item) {
        return next(apiError.badRequest(`Error. Bad request`));
      }

      item = await Subject.findOne({ where: { id: subjectId } });

      if (!item) {
        return next(apiError.badRequest(`Error. Bad request`));
      }

      const formattedDate = formatDate(new Date(date));
      const oneMark = await Mark.findOne({ where: { date: formattedDate, userId, subjectId } });

      if (oneMark) {
        return next(apiError.forbidden(`Error. Mark already exist`));
      }

      const createdMark = await Mark.create({
        mark,
        teacherId,
        date: formattedDate,
        userId,
        subjectId
      });

      return res.json(createdMark);
    } catch (error) {
      console.log('createMark error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async getOneMark(req, res, next) {
    try {
      const { id } = req.params;
      const mark = await Mark.findOne({ where: { id } });

      if (!mark) {
        return next(apiError.badRequest(`Mark with id: ${id} not found`));
      }

      return res.json(mark);
    } catch (error) {
      console.log('getOneMark:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async updateMark(req, res, next) {
    try {
      const { id } = req.params;
      const { mark } = req.body;
      const item = await Mark.findOne({ where: { id } });

      if (!mark || mark < 1) {
        return next(apiError.forbidden(`Mark ${mark} is not correct`));
      }

      if (!item) {
        return next(apiError.badRequest(`Mark with id: ${id} not found`));
      }

      const updatedMark = await item.update({ mark, where: { id } });

      return res.json(updatedMark);
    } catch (error) {
      console.log('updateMark error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async deleteMark(req, res, next) {
    try {
      const { id } = req.params;
      const item = await Mark.findOne({ where: { id } });

      if (!item) {
        return next(apiError.badRequest(`Mark with id: ${id} not found`));
      }

      await Mark.destroy({ where: { id } });

      return res.json({ message: 'Mark deleted successfully', id });
    } catch (error) {
      console.log('deleteMark error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }
}

module.exports = new MarkController();
