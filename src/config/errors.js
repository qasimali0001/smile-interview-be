const makeError = (message, status) => {
  let err = message instanceof Error ? message : new Error(message);
  err.status = status;
  return err;
};

/** handler for 404 routes. */

const error404 = (req, res, next) => {
  let err = makeError("Not Found", 404);
  // pass the error to the next piece of middleware
  return next(err);
};

/** general error handler */

const handleRouteErrors = (error, req, res, next) => {
  // for actual JS exceptions, log the exception stack
  if (error.stack) console.error(error.stack);

  const statusCode = error.status || 500;
  res.status(statusCode).json({
    statusCode: statusCode,
    error: error,
    message: error.message,
  });
};

module.exports = {
  makeError,
  error404,
  handleRouteErrors,
};
