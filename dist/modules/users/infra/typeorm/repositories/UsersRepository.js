"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _DatabaseConfiguration = _interopRequireDefault(require("../../../../../shared/infra/database/DatabaseConfiguration"));
var _User = _interopRequireDefault(require("../entities/User"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = _DatabaseConfiguration.default.getDataSourceInstance().getRepository(_User.default);
  }
  async findById(id) {
    const user = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return user;
  }
  async findByEmail(email) {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    });
    return user;
  }
  async findAllProviders({
    except_user_id
  }) {
    let users;
    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: (0, _typeorm.Not)(except_user_id)
        }
      });
    } else {
      users = await this.ormRepository.find();
    }
    return users;
  }
  async save(user) {
    return this.ormRepository.save(user);
  }
  async create(userData) {
    const appointment = this.ormRepository.create(userData);
    await this.ormRepository.save(appointment);
    return appointment;
  }
}
var _default = UsersRepository;
exports.default = _default;