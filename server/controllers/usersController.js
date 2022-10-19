const apiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models/models');

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
    const { id, firstName, lastName, email, role, } = user;
    return { id, firstName, lastName, email, role };
};

class UsersController {
    async signUp(req, res, next) {
        try {
            const { firstName, lastName, email, password, role } = req.body;
            if (!firstName) {
                return next(apiError.badRequest('First name is to short...'));
            }

            if (!lastName) {
                return next(apiError.badRequest('Last name is to short...'));
            }

            if (!email || !password) {
                return next(apiError.badRequest('Email or password incorrect'));
            }

            const candidate = await Users.findOne({ where: { email } });
            if (candidate) {
                return next(apiError
                    .badRequest('This user already exist. Enter another email of Sign In.')
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
        }

    }

    async signIn(req, res, next) {
        try {
            // console.log('signIn', req.body);
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
                    .badRequest('Email or password is incorrect -no password')
                );
            }
            const token = generateJwt(user);

            return res.json({ token });
        } catch (error) {
            console.log('UsersController Sign In error:', error);
        }
    }

    async check(req, res, next) {
        try {
            console.log('Check', req, res, next);
            const user = {
                id: req.user.id,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                role: req.user.role,
            };

            const token = generateJwt(user);
            return res.json({ token });
            // return res.json({ message: 'check' });
        } catch (error) {
            console.log(error);
        }
    }

    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await Users.findOne({ where: { id } });
            if (!user) {
                return next(apiError.badRequest(`No such user with id: ${id}`));
            }
            const { firstName, lastName, email, role, password } = req.body;
            const newUser = { firstName, lastName, email, role };
            if (password) {
                newUser.password = await bcrypt.hash(password, 12);
            }
            const updatedUser = await user.update({ ...newUser, where: { id } });
            return res.json(getOneUserData(updatedUser));
        } catch (error) {
            console.log('updateUser error:', error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await Users.findOne({ where: { id } });
            if (!user) {
                return next(apiError.badRequest(`No such user with id: ${id}`));
            }
            await Users.destroy({ where: { id } });
            return res.json({ message: 'User deleted', id: user.id });
        } catch (error) {
            console.log('getOneUser error:', error);
        }
    }

    async getOneUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await Users.findOne({ where: { id } });
            if (!user) {
                return next(apiError.badRequest(`No such user with id: ${id}`));
            }
            return res.json(getOneUserData(user));
        } catch (error) {
            console.log('getOneUser error:', error);
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await Users.findAll();
            const filteredUsers = users.map((user) => {
                return getOneUserData(user);
            });

            return res.json({ count: filteredUsers.length, users: filteredUsers });
        } catch (error) {
            console.log('getAllUsers error:', error);
        }
    }
}

module.exports = new UsersController();
