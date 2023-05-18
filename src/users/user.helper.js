const User = require('../model/user');

exports.createUser = async user => new User(user).save();
exports.getUsers = async query => User.find(query);
exports.getUser = async userID => User.findById(userID);
exports.deleteUser = async userID => User.deleteOne({_id : userID});