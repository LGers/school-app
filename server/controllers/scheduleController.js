const { Op } = require('sequelize');
const moment = require('moment');
const apiError = require('../error/ApiError');
const { Mark, Class, Teacher, Subject, Schedule } = require('../models/models');

const INTERNAL_ERROR = 'Internal error.';

class ScheduleController {
  async getAll(req, res, next) {
    try {
      const items = await Schedule.findAll();

      return res.json(items);
    } catch (error) {
      console.log('getAllSchedules error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async create(req, res, next) {
    try {
      const { classId, date, teacherId, subjectId, homework } = req.body;

      if (!classId || !date || !teacherId || !subjectId) {
        return next(apiError.badRequest(`Bad request`));
      }

      if (!moment(date).isValid()) {
        return next(apiError.badRequest(`Bad request. Invalid date format`));
      }

      let item = await Teacher.findOne({ where: { id: teacherId } });

      if (!item) {
        return next(apiError.badRequest(`Bad request. The teacher with id ${teacherId} not found`));
      }

      item = await Subject.findOne({ where: { id: subjectId } });

      if (!item) {
        return next(apiError.badRequest(`Bad request. The subject with id ${subjectId} not found`));
      }

      item = await Class.findOne({ where: { id: classId } });

      if (!item) {
        return next(apiError.badRequest(`Bad request. The class with id ${classId} not found`));
      }

      const formattedDate = moment(date).local().format('MMMM DD YYYY, h:mm:ss a');

      const oneSchedule = await Schedule.findOne({
        where: {
          date: moment(date).startOf('hour'),
          classId
        }
      });

      if (oneSchedule) {
        return next(apiError.forbidden(
          `Error. Schedule at time: ${formattedDate} already exist`
        ));
      }

      const createdSchedule = await Schedule.create({
        classId,
        teacherId,
        date: moment(date).startOf('hour'),
        subjectId,
        homework,
      });

      return res.json(createdSchedule);
    } catch (error) {
      console.log('createSchedule error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async getOneClassSchedule(req, res, next) {
    try {
      const { classId } = req.params;
      const item = await Class.findOne({ where: { id: classId } });

      if (!item) {
        return next(apiError.badRequest(`No such Class with id: ${classId}`));
      }

      const classSchedule = await Schedule.findAndCountAll({ where: { classId } });

      return res.json(classSchedule);
    } catch (error) {
      console.log('getOneClassSchedule error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async getOneClassWeekScheduleByWeekDay(req, res, next) {
    try {
      const { classId, weekDay } = req.params;

      if (!moment(weekDay).isValid()) {
        return next(apiError.badRequest(`Bad request. Invalid date format`));
      }

      const currentDay = moment(weekDay);
      const startOfWeek = moment(weekDay).startOf('isoWeek');
      const endOfWeek = moment(weekDay).endOf('isoWeek');
      const data = {
        currentDay, startOfWeek, endOfWeek, classId,
      };

      const item = await Class.findOne({ where: { id: classId } });

      if (!item) {
        return next(apiError.badRequest(`Class with id: ${classId} not found`));
      }

      const schedule = await Schedule.findAndCountAll({
        where:
          {
            date: {
              [Op.between]: [startOfWeek, endOfWeek],
            },
            classId,
          }
      });

      const allSubjects = (await Subject.findAll()).map((s) => s.dataValues);
      const weekSchedule = [];

      for (let i = 0; i < 7; i++) {
        const weekDay = moment(startOfWeek).add(i, 'day').format('YYYY-MM-DD');
        const subjects = schedule.rows
          .filter((subj) => moment(subj.date).format('YYYY-MM-DD') === weekDay)
          .sort((a, b) => moment(a.date).format('YYYY-MM-DD-HH').localeCompare(moment(b.date).format('YYYY-MM-DD-HH')))
          .map((item) => ({
            ...item.dataValues,
            subject: allSubjects.find((s) => s.id === item.subjectId).subject
          }))
        weekSchedule.push({
          weekDay: moment(startOfWeek).add(i, 'day').format('dddd'),
          date: moment(startOfWeek).add(i, 'day').format('YYYY-MM-DD'),
          subjects,
        });
      }

      return res.json({
        data,
        weekSchedule
      });
    } catch (error) {
      console.log('getOneClassWeekScheduleByWeekDay error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async updateSchedule(req, res, next) {
    try {
      const { id } = req.params;
      const { subjectId, homework } = req.body;

      let item = await Subject.findOne({ where: { id: subjectId } });

      if (!item) {
        return next(apiError.badRequest(`Subject with id: ${id} not found`));
      }

      item = await Schedule.findOne({ where: { id } });

      if (!item) {
        return next(apiError.badRequest(`Schedule with id: ${id} not found`));
      }

      const updatedSchedule = await item.update({ subjectId, homework, where: { id } });

      return res.json(updatedSchedule);
    } catch (error) {
      console.log('updateSchedule error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const item = await Schedule.findOne({ where: { id } });

      if (!item) {
        return next(apiError.badRequest(`Schedule with id: ${id} not found`));
      }

      await Mark.destroy({ where: { id } });

      return res.json({ message: 'Schedule deleted successfully.', id });
    } catch (error) {
      console.log('deleteSchedule error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }
}

module.exports = new ScheduleController();
