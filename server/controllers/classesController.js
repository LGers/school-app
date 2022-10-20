const apiError = require('../error/ApiError');
const { Class, Users } = require('../models/models');

const getOneUserData = (user) => {
    const { id, firstName, lastName, email, role } = user;
    return { id, firstName, lastName, email, role };
};

class ClassesController {
    async getAllClasses(req, res) {
        try {
            const classesData = await Class.findAll();
            const users = await Users.findAll();
            const classes = classesData.map((cl) => {
                const students = users.filter((u) => u.classId === cl.id);
                cl = cl.dataValues;
                cl.students = students;
                return cl;
            });
            return res.json({ count: classesData.length, classes });
        } catch (error) {
            console.log('getAllClasses error:', error);
        }
    }

    async createClass(req, res, next) {
        try {
            const { classNumber, classLetter } = req.body;
            if (await Class.findOne({ where: { classNumber } }) && await Class.findOne({ where: { classLetter } })) {
                return next(apiError.forbidden(`Error. Class ${classNumber}${classLetter} already exist`));
            }

            const cl = await Class.create({ classNumber, classLetter });
            return res.json(cl);
        } catch (error) {
            console.log('createClass error:', error);
        }
    }

    async getOneClass(req, res, next) {
        try {
            const { id } = req.params;
            const students = await Users.findAll({ where: { classId: id } });
            const cl = await Class.findOne({ where: { id } });
            if (!cl) {
                return next(apiError.badRequest(`No such class with id: ${id}`));
            }
            return res.json({
                classId: id,
                classNumber: cl.classNumber,
                classLetter: cl.classLetter,
                students: students.map((st) => getOneUserData(st))
            });
        } catch (error) {
            console.log('getOneClass:', error);
        }
    }

    async updateClass(req, res, next) {
        try {
            const { id } = req.params;
            let cl = await Class.findOne({ where: { id } });
            if (!cl) {
                return next(apiError.badRequest(`No such class with id: ${id}`));
            }

            const { classNumber, classLetter } = req.body;
            if (!classNumber && !classLetter) {
                next(apiError.badRequest(`Class number and class letter don't be empty`));
            }

            if (await Class.findOne({ where: { classNumber } }) && await Class.findOne({ where: { classLetter } })) {
                return next(apiError.forbidden('Error. This class already exist'));
            }

            cl = await cl.update({ classNumber, classLetter, where: { id } });
            return res.json(cl);
        } catch (error) {
            console.log('updateClass error:', error);
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
        }
    }
}

module.exports = new ClassesController();
