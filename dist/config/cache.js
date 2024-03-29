"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("dotenv/config");
var _default = {
  driver: 'redis',
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS
    }
  }
};
exports.default = _default;