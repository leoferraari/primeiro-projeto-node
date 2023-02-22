import AppError from '@shared/errors/AppError';
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswrodEmailService from './SendForgotPasswordEmailService';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

  let fakeUsersRepository: FakeUsersRepository;
  let fakeUserTokensRepository: FakeUserTokensRepository;
  let fakeMailProvider: FakeMailProvider;
  let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswrodEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );


  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'leonardo.ferrari@unidavi.edu.br',
      password: '123456'
    });

    await sendForgotPasswordEmail.execute({
      email: 'leonardo.ferrari@unidavi.edu.br',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'leonardo.ferrari@unidavi.edu.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'leonardo.ferrari@unidavi.edu.br',
      password: '123456'
    });

    await sendForgotPasswordEmail.execute({
      email: 'leonardo.ferrari@unidavi.edu.br',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });


});

// RED - Primeiro faz o teste falhar
// GREEN - Fazer o teste dar certo.
// REFATORAR
