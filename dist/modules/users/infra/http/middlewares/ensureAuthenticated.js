"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAuthenticated;
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("../../../../../config/auth"));
var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//Middleware é uma função que recebe o request, o response e o next (caso seja validado o usuário)

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new _AppError.default('JWT token is missing', 401);
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    const {
      sub
    } = decoded; //forçando tipo da variável

    request.user = {
      //necessário sobreecrever tipo (modificar o funcionamento da biblioteca, sobreecrever tipos)
      id: sub
    };
    return next();
  } catch {
    throw new _AppError.default('Invalid JWT token', 401);
  }
}