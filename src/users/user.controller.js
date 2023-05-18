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

exports.getUser = async (req, res, next) => {
    const {
        params: {userID = ''}
    } = req;

    try {
        const user = await helper.getUser(userID);

        return res.status(httpStatus.OK).send({
            message: 'Successfully got specific user',
            user
        });

    } catch (err) {
        err.status = httpStatus.BAD_REQUEST;
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    const {
        params: {userID = ''},
        body = {}
    } = req;
    const allowedUpdates = ['firstName', 'lastName', 'username', 'password', 'email'];
    const updates = Object.keys(body);
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    if(!isValidUpdate) {
        err.status = httpStatus.BAD_REQUEST;
        next(err);
    }
    try {
        const user = await helper.getUser(userID);
        updates.forEach(update => user[update] = body[update]);
        const updatedUser = await user.save();
        return res.status(httpStatus.OK).send({
            message: 'Successfully updated user.',
            updatedUser
        });

    } catch (err) {
        err.status = httpStatus.BAD_REQUEST;
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    const {
        params: {userID = ''}
    } = req;

    try {
        const user = await helper.getUser(userID);
        if(!user) {
            return res.status(httpStatus.BAD_REQUEST).send({
                message: 'Do not found specific user',
            });
        }

        await helper.deleteUser(userID);

        return res.status(httpStatus.OK).send({
            message: 'Successfully deleted specific user',
            user
        });

    } catch (err) {
        err.status = httpStatus.BAD_REQUEST;
        next(err);
    }
};
