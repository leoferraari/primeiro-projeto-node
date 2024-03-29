"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _DatabaseConfiguration = _interopRequireDefault(require("../../../../../shared/infra/database/DatabaseConfiguration"));
var _Appointment = _interopRequireDefault(require("../entities/Appointment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class AppointmentsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = _DatabaseConfiguration.default.getDataSourceInstance().getRepository(_Appointment.default);
  }
  async findByDate(date) {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date
      }
    });
    return findAppointment || null;
  }
  async findAllInMonthFromProvider({
    provider_id,
    month,
    year
  }) {
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm.Raw)(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`)
      }
    });
    return appointments;
  }
  async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year
  }) {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm.Raw)(dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`)
      }
    });
    return appointments;
  }
  async create({
    provider_id,
    user_id,
    date
  }) {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }
}
var _default = AppointmentsRepository;
exports.default = _default;