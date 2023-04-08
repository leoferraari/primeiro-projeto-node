"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));
var _ListProviderAppointmentsService = _interopRequireDefault(require("./ListProviderAppointmentsService"));
var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeAppointmentsRepository;
let listProviderAppointments;
let fakeCacheProvider;
describe('ListProvidersAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviderAppointments = new _ListProviderAppointmentsService.default(fakeAppointmentsRepository, fakeCacheProvider);
  });
  it('should be able to list the appointments on a specific day', async () => {
    //4 may 2023 8am
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2023, 4, 20, 14, 0, 0),
      user_id: 'user'
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2023, 4, 20, 15, 0, 0),
      user_id: 'user'
    });
    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2023,
      month: 5,
      day: 20
    });
    expect(appointments).toEqual(expect.arrayContaining([appointment1, appointment2]));
  });
});