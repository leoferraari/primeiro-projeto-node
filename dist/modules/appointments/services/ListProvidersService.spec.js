"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));
var _LIstProvidersService = _interopRequireDefault(require("./LIstProvidersService"));
var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeUsersRepository;
let listProviders;
let fakeCacheProvider;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviders = new _LIstProvidersService.default(fakeUsersRepository, fakeCacheProvider);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Usuário 1',
      email: 'usuario.1@hotmail.com',
      password: '123456'
    });
    const user2 = await fakeUsersRepository.create({
      name: 'Usuário 2',
      email: 'usuario.2@hotmail.com',
      password: '123456'
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'Leonardo',
      email: 'leonardo.ferrari@unidavi.edu.br',
      password: '123456'
    });
    const providers = await listProviders.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
});