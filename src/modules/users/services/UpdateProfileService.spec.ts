import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able update the profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Leonardo 1',
      email: 'leonardo.ferrari1@unidavi.edu.br',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Leonardo 2',
      email: 'leonardo.ferrari2@unidavi.edu.br'
    });

    expect(updateUser.name).toBe('Leonardo 2');
    expect(updateUser.email).toBe('leonardo.ferrari2@unidavi.edu.br');
  });

  it('should not be able to change to another user email', async () => {

    await fakeUsersRepository.create({
      name: 'Leonardo 1',
      email: 'leonardo.ferrari1@unidavi.edu.br',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Leonardo 1',
        email: 'leonardo.ferrari1@unidavi.edu.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Leonardo 1',
      email: 'leonardo.ferrari1@unidavi.edu.br',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Leonardo 2',
      email: 'leonardo.ferrari2@unidavi.edu.br',
      old_password: '123456',
      password: '123123'
    });

    expect(updateUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Leonardo 1',
      email: 'leonardo.ferrari1@unidavi.edu.br',
      password: '123456',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Leonardo 2',
        email: 'leonardo.ferrari2@unidavi.edu.br',
        password: '123123'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Leonardo 1',
      email: 'leonardo.ferrari1@unidavi.edu.br',
      password: '123456',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Leonardo 2',
        email: 'leonardo.ferrari2@unidavi.edu.br',
        old_password: 'wrong-old-password',
        password: '123123'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });


  it('should not be able update the profile from non-existind user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Teste',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

