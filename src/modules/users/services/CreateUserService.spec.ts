import AppError from '@shared/errors/AppError';

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

//categoria
describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashPrivder = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository, fakeHashPrivder
    );

    const user = await createUser.execute({
      name: 'Leonardo',
      email: 'leonardo.ferrari@unidavi.edu.br',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create anew user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashPrivder = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository, fakeHashPrivder
    );

    await createUser.execute({
      name: 'Leonardo',
      email: 'leonardo.ferrari@unidavi.edu.br',
      password: '123456',
    });

    expect(createUser.execute({
        name: 'Leonardo',
        email: 'leonardo.ferrari@unidavi.edu.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

