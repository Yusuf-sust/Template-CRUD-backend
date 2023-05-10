const express = require('express');
const userRoute = require('./src/users/user.route');

const router = express.Router();

router.use('/users', userRoute);

module.exports = router;