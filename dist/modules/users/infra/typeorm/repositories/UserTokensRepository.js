"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _DatabaseConfiguration = _interopRequireDefault(require("../../../../../shared/infra/database/DatabaseConfiguration"));
var _UserToken = _interopRequireDefault(require("../entities/UserToken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UserTokensRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = _DatabaseConfiguration.default.getDataSourceInstance().getRepository(_UserToken.default);
  }
  async findByToken(token) {
    const userToken = await this.ormRepository.findOne({
      where: {
        token
      }
    });
    return userToken;
  }
  async generate(user_id) {
    const userToken = await this.ormRepository.create({
      user_id
    });
    await this.ormRepository.save(userToken);
    return userToken;
  }
}
var _default = UserTokensRepository;
exports.default = _default;