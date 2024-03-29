"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));
var _AppointmentsController = _interopRequireDefault(require("../controllers/AppointmentsController"));
var _ProviderAppointmentsController = _interopRequireDefault(require("../controllers/ProviderAppointmentsController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import coreJoi from "joi";
// import joiDate from "@joi/date";
// const joi = coreJoi.extend(joiDate) as typeof coreJoi;
/**
 * startOfHour: Coloca o zero em minutos, segundos e milisegundos
 * parseISO: Converte uma string para um objeto DATE
 * isEqual: Verifica se duas datas são iguais
 *
 * Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta.
 *
 * SoC: Separtion of Concerns (Separação de preocupações)
 */
const appointmentsRouter = (0, _express.Router)();
const appointmentsController = new _AppointmentsController.default();
const providerAppointmentsController = new _ProviderAppointmentsController.default();
appointmentsRouter.use(_ensureAuthenticated.default);
appointmentsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    provider_id: _celebrate.Joi.string().uuid().required(),
    date: _celebrate.Joi.date()
  }
}), appointmentsController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);
var _default = appointmentsRouter;
exports.default = _default;