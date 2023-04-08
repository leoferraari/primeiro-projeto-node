"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));
var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));
var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));
var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeUsersRepository;
let fakeUserTokensRepository;
let fakeMailProvider;
let sendForgotPasswordEmail;
describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
  });
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'leonardo.ferrari@unidavi.edu.br',
      password: '123456'
    });
    await sendForgotPasswordEmail.execute({
      email: 'leonardo.ferrari@unidavi.edu.br'
    });
    await expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover a non-existing user password', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'leonardo.ferrari@unidavi.edu.br'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'leonardo.ferrari@unidavi.edu.br',
      password: '123456'
    });
    await sendForgotPasswordEmail.execute({
      email: 'leonardo.ferrari@unidavi.edu.br'
    });
    await expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});

// RED - Primeiro faz o teste falhar
// GREEN - Fazer o teste dar certo.
// REFATORAR