"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));
var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));
var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeUsersRepository;
let fakeHashProvider;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfile = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Leonardo 1',
      email: 'leonardo.ferrari1@unidavi.edu.br',
      password: '123456'
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
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@example.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Leonardo 1',
      email: 'leonardo.ferrari1@unidavi.edu.br'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Leonardo 1',
      email: 'leonardo.ferrari1@unidavi.edu.br',
      password: '123456'
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
      password: '123456'
    });
    expect(updateProfile.execute({
      user_id: user.id,
      name: 'Leonardo 2',
      email: 'leonardo.ferrari2@unidavi.edu.br',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Leonardo 1',
      email: 'leonardo.ferrari1@unidavi.edu.br',
      password: '123456'
    });
    expect(updateProfile.execute({
      user_id: user.id,
      name: 'Leonardo 2',
      email: 'leonardo.ferrari2@unidavi.edu.br',
      old_password: 'wrong-old-password',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able update the profile from non-existind user', async () => {
    expect(updateProfile.execute({
      user_id: 'non-existing-user-id',
      name: 'Teste',
      email: 'test@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});