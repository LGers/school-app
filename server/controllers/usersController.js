const apiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users, Class } = require('../models/models');

const INTERNAL_ERROR = 'Internal error.';

const generateJwt = (user) => {
  const { id, firstName, lastName, role } = user;
  return jwt.sign(
    {
      id,
      firstName,
      lastName,
      role
    },
    process.env.SECRET_KEY,
    { expiresIn: '24h' },
  );
};

const getOneUserData = (user) => {
  const { id, firstName, lastName, email, role, classId } = user;

  return { id, firstName, lastName, email, role, classId };
};

class UsersController {
  async signUp(req, res, next) {
    try {
      const { firstName, lastName, email, password, role } = req.body;
      if (!firstName) {
        return next(apiError.badRequest('First name is too short...'));
      }

      if (!lastName) {
        return next(apiError.badRequest('Last name is too short...'));
      }

      if (!email || !password) {
        return next(apiError.badRequest('Email or password is incorrect'));
      }

      const candidate = await Users.findOne({ where: { email } });
      if (candidate) {
        return next(apiError
          .badRequest('This user already exist. Enter another email or Sign In.')
        );
      }

      const hashPassword = await bcrypt.hash(password, 12);
      const user = await Users.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
        role: role || 'USER',
      });
      const token = generateJwt(user);

      return res.json({ token });

    } catch (error) {
      console.log('UsersController Sign Up error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }

  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(apiError.badRequest('Email or password is incorrect'));
      }

      const user = await Users.findOne({ where: { email } });
      if (!user) {
        return next(apiError
          .badRequest('Email or password is incorrect')
        );
      }

      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(apiError
          .badRequest('Email or password is incorrect')
        );
      }
      const token = generateJwt(user);

      return res.json({ token });
    } catch (error) {
      console.log('UsersController Sign In error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async check(req, res, next) {
    try {
      const user = {
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        role: req.user.role,
      };

      const token = generateJwt(user);

      return res.json({ token });
    } catch (error) {
      console.log(error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await Users.findOne({ where: { id } });

      if (!user) {
        return next(apiError.badRequest(`User with id: ${id} not found`));
      }

      const { firstName, lastName, email, role, password, classId } = req.body;
      const newUser = { id, firstName, lastName, email, role, classId };

      if (password) {
        newUser.password = await bcrypt.hash(password, 12);
      }

      if (email) {
        const candidate = await Users.findOne({ where: { email } });
        if (candidate && candidate.id !== +id) {
          return next(apiError
            .badRequest('User with such email already exists. Enter another email.')
          );
        }
      }

      const updatedUser = await user.update({ ...newUser, where: { id } });
      let className = '';
      let oneUserData = { ...getOneUserData(updatedUser), className: '' };
      if (classId) {

        const oneClass = await Class.findOne({ where: { id: classId } });

        if (oneClass) {
          className = oneClass.classNumber + oneClass.classLetter;
        }

        oneUserData = { ...getOneUserData(updatedUser), className };
      }


      return res.json(oneUserData);
    } catch (error) {
      console.log('updateUser error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await Users.findOne({ where: { id } });

      if (!user) {
        return next(apiError.badRequest(`User with id: ${id} not found`));
      }

      await Users.destroy({ where: { id } });

      return res.json({ message: 'User deleted successfully', id: user.id });
    } catch (error) {
      console.log('getOneUser error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async getOneUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await Users.findOne({ where: { id } });

      if (!user) {
        return next(apiError.badRequest(`User with id: ${id} not found`));
      }

      const { classId } = user;
      let className = '';
      const oneClass = await Class.findOne({ where: { id: classId } });

      if (oneClass) {
        className = oneClass.classNumber + oneClass.classLetter;
      }

      const oneUserData = oneClass
        ? { ...getOneUserData(user), className }
        : { ...getOneUserData(user), className: '' }
      ;
      return res.json(oneUserData);
    } catch (error) {
      console.log('getOneUser error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await Users.findAll();
      const filteredUsers = users.map((user) => {
        return getOneUserData(user);
      });

      return res.json({ count: filteredUsers.length, users: filteredUsers });
    } catch (error) {
      console.log('getAllUsers error:', error);

      return next(apiError.internal(INTERNAL_ERROR));
    }
  }
}

module.exports = new UsersController();
