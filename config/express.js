const express = require('express');
const config = require('./config');
const routes = require('../index.route');
const APIError = require('../src/helpers/APIErrors');

const app = express();
app.use(express.json());
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new APIError('API not found', httpStatus.NOT_FOUND);
    return next(err);
});

// error handler, send stacktrace only during development
app.use((
    err,
    req,
    res,
    next // eslint-disable-line no-unused-vars
  ) =>
    res.status(err.status).send({
      status: 'error',
      message: err.message,
      statusCode: 500,
      payload: err.payload || {},
      stack: config.env === 'development' ? err.stack : {}
    })
  );

module.exports = app;