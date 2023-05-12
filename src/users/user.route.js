const express = require('express');
const userCtrl = require('./user.controller');

const router = express.Router();

router
    .route('/')
    .post(userCtrl.createUser)
    .get(userCtrl.getUsers);

router
    .route('/user/:userID')
    .get(
        userCtrl.getUser
    )
    .put(
        userCtrl.updateUser
    )
    .delete(

    );

module.exports = router;