import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswrodEmailService from './SendForgotPasswordEmailService';


describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswrodEmailService(fakeUsersRepository, fakeMailProvider);

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    await sendForgotPasswordEmail.execute({
      email: 'leonardo.ferrari@unidavi.edu.br',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});

// RED - Primeiro faz o teste falhar
// GREEN - Fazer o teste dar certo.
// REFATORAR
