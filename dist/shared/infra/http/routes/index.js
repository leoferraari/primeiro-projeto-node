"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _appointements = _interopRequireDefault(require("../../../../modules/appointments/infra/http/routes/appointements.routes"));
var _providers = _interopRequireDefault(require("../../../../modules/appointments/infra/http/routes/providers.routes"));
var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));
var _sessions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));
var _password = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/password.routes"));
var _profile = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/profile.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const routes = (0, _express.Router)();
routes.use('/appointments', _appointements.default);
routes.use('/providers', _providers.default);
routes.use('/users', _users.default);
routes.use('/sessions', _sessions.default);
routes.use('/password', _password.default); // localhost:3333/password/forgot | reset
routes.use('/profile', _profile.default);
var _default = routes;
exports.default = _default;