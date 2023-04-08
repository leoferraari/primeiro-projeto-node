"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _DatabaseConfiguration = _interopRequireDefault(require("./DatabaseConfiguration"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const dataSource = _DatabaseConfiguration.default.getDataSourceInstance();
var _default = dataSource;
exports.default = _default;