"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uuid = require("uuid");
var _Notification = _interopRequireDefault(require("../../infra/typeorm/entities/Notification"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class NotificationsRepository {
  constructor() {
    this.notifications = [];
  }
  async create({
    content,
    recipient_id
  }) {
    const notification = new _Notification.default();
    Object.assign(notification, {
      id: (0, _uuid.v4)(),
      content,
      recipient_id
    });
    this.notifications.push(notification);
    return notification;
  }
}
var _default = NotificationsRepository;
exports.default = _default;