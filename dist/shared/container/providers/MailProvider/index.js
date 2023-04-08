"use strict";

var _tsyringe = require("tsyringe");
var _EtheralMailProvider = _interopRequireDefault(require("./implementations/EtheralMailProvider"));
var _SESMailProvider = _interopRequireDefault(require("./implementations/SESMailProvider"));
var _SMTPNodemailerMailProvider = _interopRequireDefault(require("./implementations/SMTPNodemailerMailProvider"));
var _mail = _interopRequireDefault(require("../../../../config/mail"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const providers = {
  ethereal: _tsyringe.container.resolve(_EtheralMailProvider.default),
  ses: _tsyringe.container.resolve(_SESMailProvider.default),
  smtp_nodemailer: _tsyringe.container.resolve(_SMTPNodemailerMailProvider.default)
};
_tsyringe.container.registerInstance('MailProvider', providers[_mail.default.driver]);