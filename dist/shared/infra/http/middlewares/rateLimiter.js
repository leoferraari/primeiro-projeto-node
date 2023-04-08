"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rateLimiter;
var _AppError = _interopRequireDefault(require("../../../errors/AppError"));
var _rateLimiterFlexible = require("rate-limiter-flexible");
var _ioredis = _interopRequireDefault(require("ioredis"));
var _cache = _interopRequireDefault(require("../../../../config/cache"));
var _logger = _interopRequireDefault(require("../../logger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const redisClient = new _ioredis.default(_cache.default.config.redis);
const limiter = new _rateLimiterFlexible.RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  // 10 requests
  duration: 1 // per 1 second by IP
});

async function rateLimiter(request, response, next) {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (error) {
    _logger.default.warn(`Too many Requests. ${error} : 429`);
    throw new _AppError.default('Too many Requests', 429);
  }
}