const User = require('../model/user');

exports.createUser = async user => new User(user).save();
exports.getUsers = async query => User.find(query);