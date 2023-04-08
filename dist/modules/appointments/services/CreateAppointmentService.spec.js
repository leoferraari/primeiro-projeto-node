"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));
var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));
var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));
var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeAppointmentsRepository;
let fakeNotificationsRepository;
let createAppointment;
let fakeCacheProvider;

//categoria
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCacheProvider);
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '124324',
      provider_id: '123123'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });
  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 8);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return appointmentDate.getTime();
    });
    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123123',
      provider_id: '123122'
    });
    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: '124324',
      provider_id: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: '123434',
      provider_id: '123421'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointments with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123',
      provider_id: '123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment before 8am and after 5pm.', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 7),
      user_id: '123',
      provider_id: '1233'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 18),
      user_id: '123',
      provider_id: '1233'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});