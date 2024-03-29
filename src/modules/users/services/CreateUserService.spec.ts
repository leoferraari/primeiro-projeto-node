import AppError from '@shared/errors/AppError';

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

//categoria
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository, fakeHashProvider, fakeCacheProvider
    );

  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Leonardo',
      email: 'leonardo.ferrari@unidavi.edu.br',
      password: '123456',
    });

    await expect(user).toHaveProperty('id');
  });

  it('should not be able to create anew user with same email from another', async () => {
    await createUser.execute({
      name: 'Leonardo',
      email: 'leonardo.ferrari@unidavi.edu.br',
      password: '123456',
    });

    await expect(createUser.execute({
      name: 'Leonardo',
      email: 'leonardo.ferrari@unidavi.edu.br',
      password: '123456',
    }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

