const helper = require('./user.helper');
const httpStatus = require('http-status');

exports.createUser = async (req, res, next) => {
    const {
        body = {}
    } = req;
    try {
        const newUser = await helper.createUser(body);

        return res.status(httpStatus.OK).send({
            message: 'Successfully created new user.',
            newUser
        });

    } catch (err) {
        err.status = httpStatus.BAD_REQUEST;
        next(err);
    }
};

exports.getUsers = async (req, res, next) => {
    const {query = {} } = req;

    try {
        const users = await helper.getUsers(query);

        return res.status(httpStatus.OK).send({
            message: 'Successfully got users',
            users
        });
    } catch (err) {
        err.status = httpStatus.BAD_REQUEST,
        next(err);
    }
};