import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProvidersAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    //4 may 2023 8am
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2023, 4, 20, 14, 0, 0),
      user_id: 'user',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2023, 4, 20, 15, 0, 0),
      user_id: 'user',
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2023,
      month: 5,
      day: 20
    });

    expect(appointments).toEqual(
      expect.arrayContaining([
        appointment1,
        appointment2
      ]),
    );
  });
});

