const messages = require("./messages");

const customReponse = (app) => {
  app.use(function (req, res, next) {
    res.successResponse = function (data, options) {
      let response = {},
        status = 200;
      status = options.statusCode || status;
      response = {
        message: options.message || messages.default.success,
        data: data,
      };
      return res.status(status).json(response);
    };

    res.errorResponse = function (error, options = {}) {
      const response = {
        message: options.message
          ? options.message
          : error.message
          ? error.message
          : messages.default.internalServerError,
        statusCode: options.statusCode
          ? options.statusCode
          : error.statusCode
          ? error.statusCode
          : 500,
      };

      if (process.env.NODE_ENV !== "production") {
        response.error = error.stack;
      }
      return res.status(response.statusCode).json(response);
    };

    next();
  });
};

module.exports = customReponse;
