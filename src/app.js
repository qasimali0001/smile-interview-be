const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger-output.json");

const { errors } = require("celebrate");

const Errors = require("./config/errors");
const customResponse = require("./config/customResponse");

const routes = require("./routes");

const app = express();

customResponse(app);

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errors());

// catch 404 and forward to error handler
app.use(Errors.error404);

/* general error-handler: returns JSON with error info */
app.use(Errors.handleRouteErrors);

module.exports = app;
