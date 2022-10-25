const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Users = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Class = sequelize.define('class', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  classNumber: { type: DataTypes.INTEGER, defaultValue: 1 },
  classLetter: { type: DataTypes.STRING, defaultValue: 'A' },
});

const Class_student = sequelize.define('class_student', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Class.hasMany(Users);
Class.belongsToMany(Users, { through: Class_student });


const Mark = sequelize.define('mark', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  mark: { type: DataTypes.INTEGER },
  date: { type: DataTypes.DATEONLY },
  userId: { type: DataTypes.INTEGER },
});

Users.hasMany(Mark);
Mark.belongsTo(Users);

const Subject = sequelize.define('subject', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  subject: { type: DataTypes.STRING, unique: true },
});

Subject.hasMany(Mark);
Mark.belongsTo(Subject);

const Teacher = sequelize.define('teacher', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Teacher.hasMany(Mark);
Mark.belongsTo(Teacher);

Users.hasOne(Teacher);
Teacher.belongsTo(Users);

Subject.hasMany(Teacher);
Teacher.belongsTo(Subject);

const Schedule = sequelize.define('schedule', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATE },
    homework: {type: DataTypes.STRING },
});

Class.hasMany(Schedule);
Schedule.belongsTo(Class);

Subject.hasMany(Schedule);
Schedule.belongsTo(Subject);

module.exports = {
    Users,
    Class,
    Mark,
    Subject,
    Teacher,
    Schedule,
};
