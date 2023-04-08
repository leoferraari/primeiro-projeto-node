"use strict";

require("reflect-metadata");
require("dotenv/config");
var _express = _interopRequireDefault(require("express"));
require("express-async-errors");
var _celebrate = require("celebrate");
var _routes = _interopRequireDefault(require("./routes"));
var _upload = _interopRequireDefault(require("../../../config/upload"));
var _AppError = _interopRequireDefault(require("../../errors/AppError"));
var _rateLimiter = _interopRequireDefault(require("./middlewares/rateLimiter"));
require("../../container");
var _DatabaseConfiguration = _interopRequireDefault(require("../database/DatabaseConfiguration"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import '@shared/infra/typeorm';

_DatabaseConfiguration.default.startConnection();
const app = (0, _express.default)();
app.use(_rateLimiter.default);
app.use(_express.default.json());
app.use('/files', _express.default.static(_upload.default.uploadsFolder));
app.use(_routes.default);
app.use((0, _celebrate.errors)());

//depois das rotas
app.use((err, request, response, _) => {
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }
  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});
app.listen(3333, () => {
  console.log('Server started on port 3333!');
});