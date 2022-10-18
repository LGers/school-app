const apiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models/models');

class UsersController {
    async signUp(req, res, next) {
        try {
            const { firstName, lastName, email, password } = req.body;
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
                password: hashPassword
            });

            const token = jwt.sign(
                {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                },
                process.env.SECRET_KEY,
                { expiresIn: '24h' },
            );

            return res.json({ token });


        } catch (error) {
            console.log('UsersController error', error);
        }

    }
}

module.exports = new UsersController();
