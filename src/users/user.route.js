const express = require('express');
const userCtrl = require('./user.controller');

const router = express.Router();

router
    .route('/')
    .post(userCtrl.createUser)
    .get(userCtrl.getUsers);

module.exports = router;